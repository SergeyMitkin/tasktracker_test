// Выводим данные задачи в модальном окне
function getTaskValues(e) {
    // Если не отключен JS, отправим ajax-запрос
    if (!e.preventDefault()){
        var url = "index.php";
        var action = "taskItem"; // Метод редактирования данных задачи
    };

    // Элементы для переменных задачи
    var elTitle = document.getElementById('task_modal_title'); // Имя задачи
    var elDescription = document.getElementById("task_modal_description"); // Описание задачи
    var elUser = document.getElementById("modal-task-user"); // Ответственный
    var elTaskUserHiddenId = document.getElementById("hidden-user-id") // Input hidden содержащий id ответсвенного
    var elTaskCreatedDate = document.getElementById('modal-task-created-date'); // Дата создания задачи
    var elTaskDeadLine = document.getElementById('modal-task-dead-line'); // Дата исполненеия
    var elTaskStatus = document.getElementById('modal-task-status'); // Статус задачи

    // Кнопки "Изменить" и "Удалить" могут видеть только админ или ответственный
    var elEditButtons = document.getElementsByClassName("edit-button");
    var editButtonAmount = elEditButtons.length;
    for (var i=0; i<editButtonAmount; i++) {
        elEditButtons[i].setAttribute("hidden", "");
    }

    // Скрываем формы редактирования если были открыты
    var elEditForms = document.getElementsByClassName("edit-form");
    var editFormAmount = elEditForms.length;
    for (var i=0; i<editFormAmount; i++) {
        elEditForms[i].setAttribute("hidden", "");
    }

    // Получаем id задачи из атрибута id
    var target_id = e.target.id;
    var obj_id = target_id.split('_');
    var task_id = obj_id[2];

    // Помещаем id задачи в поля форм input hidden для редактирования данных задачи
    var elHiddenInputId = document.getElementsByClassName("hidden-title-id"); // Поля input hidden в которые поместим id задачи
    var hiddenInputAmount = elHiddenInputId.length; // Количество элементов с полем input hidden
    for (var i=0; i<hiddenInputAmount; i++) {
        elHiddenInputId[i].setAttribute('value', task_id);
    }

    $.ajax({
        url: url,
        type: "GET",
        data: {
            ajax: action,
            id_task: task_id
        },
        error: function () {
            alert('Что-то пошло не так!');
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data)[0]; // Объект с данными задачи
            //console.log(obj);
            var userLogin = obj['login']; // Логин зашедшего пользователя

            // Показываем кнопки "Удалить" и "Изменить" для админа или ответсвенного
            if(typeof(sessionUserLogin) != "undefined" && sessionUserLogin != null) {
                if (userLogin == sessionUserLogin || userLogin == 'admin') {
                    for (var i=0; i<editButtonAmount; i++) {
                        elEditButtons[i].removeAttribute("hidden");
                    }
                }
            }

            // Отображаем данные задачи в модальном окне
            elTitle.textContent = obj['task_name']; // Имя задачи
            elDescription.textContent = obj['description']; // Описание задачи
            elUser.textContent = obj['user_name']; // Ответственный
            elTaskCreatedDate.textContent = obj['created_at']; // Дата создания задачи
            elTaskDeadLine.textContent = obj['dead_line']; // Срок выполнения задачи
            elTaskStatus.textContent = obj['status_name']; // Статаус задачи

            // Помещаем id исходного ответственного в поле input hidden для отображения его в <select> при смене пользователя, ответсвенного за выполнение задачи
            elTaskUserHiddenId.setAttribute('value', obj['user_id']);
        },
    });
}

// Превью карточек задач
var taskRow = document.getElementById("row-tasks");

// При клике на превью, вызываем фукцию подставляющую переменные в модальное окно с карточкой задачи
taskRow.addEventListener('click', function (e) {
    getTaskValues(e);
}, true);

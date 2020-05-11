// Выводим данные задачи в модальном окне
function getTaskValues(e) {
    if (!e.preventDefault()){
        var url = "index.php";
        var action = "taskItem";
    };

    var elTitle = document.getElementById('taskModalLabel'); // Имя задачи
    var elDescription = document.getElementById("modal-task-description"); // Описание задачи
    var elUser = document.getElementById("modal-task-user"); // Ответсвенный

    // Переменные для форм редактирования:
    // Форма редактирования имени задачи
    var elEditTitle = document.getElementById('edit_modal_title'); // Форма редактирования имени задачи
    var elTaskTitleHidden  = document.getElementById('hidden-title'); // Input hidden содержащий id задачи
    var elEditTitleButton = document.getElementById("edit-title-button"); // Кнопка "Изменить" для имени задачи

    // Форма редактирования описания задачи
    var elEditDescription = document.getElementById("edit_modal_description"); // Форма редактирования описания задачи
    var elTaskDescriptionHidden = document.getElementById("hidden-description"); // Input hidden содержащий id задачи
    var elEditDescriptionButton = document.getElementById("edit-description-button"); // Кнопка "Изменить" для описания задачи

    // Форма смены ответсвенного пользователя
    var elEditUser = document.getElementById("edit_modal_user"); // Форма редактирования смены пользователя
    var elTaskUserHidden = document.getElementById("hidden-user"); // Input hidden содержащий id задачи
    var elTaskUserHiddenId = document.getElementById("hidden-user-id") // Input hidden содержащий id ответсвенного
    var elEditUserButton = document.getElementById("edit-user-button"); // Кнопка "Изменить" для ответсвенного

    // Скрываем формы редактирования не для админа или ответственного
    hideEditTitleForm(elTitle, elEditTitle); // Форма редактирования имени задачи
    hideEditDescriptionForm(elDescription, elEditDescription); // Форма редактирования описания
    hideEditUserForm(elUser, elEditUser); // Форма смены пользователя

    // Кнопки "Изменить" могут видеть только админа или ответственный
    elEditTitleButton.setAttribute("hidden", ""); // Для редактирования имени задачи
    elEditDescriptionButton.setAttribute("hidden", ""); // Для редактирования описания задачи
    elEditUserButton.setAttribute("hidden", ""); // Для выбора ответственного

    // Получаем id задачи из атрибута id
    var target_id = e.target.id;
    var obj_id = target_id.split('_');
    var task_id = obj_id[2];

    // Переменные для данных задачи
    var elTaskName = document.getElementById('taskModalLabel');  //Иимя
    var elTaskDescription = document.getElementById('modal-task-description'); // Описание
    var elUserName = document.getElementById('modal-task-user'); // Ответственый
    var elTaskCreatedDate = document.getElementById('modal-task-created-date'); // Дата создания задачи
    var elTaskDeadLine = document.getElementById('modal-task-dead-line'); // Дата исполненеия
    var elTaskStatus = document.getElementById('modal-task-status'); // Статус задачи

    // Кнопка удаления задачи
    var elDelete = document.getElementById('delete_button');
    // Скрываем кнопку удаления не для админа или ответственного
    elDelete.setAttribute("hidden", "");

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
            var obj = jQuery.parseJSON(data)[0]; // объект с данными задачи
            //console.log(obj);
    /*какой-то косяк!!!*/ var userLogin = obj['login']; // логин зашедшего пользователя
            // Наверное не успевает получить obj
            // textcontent поместить в функцию после выполнения этой
            // где-то сделать $( document ).ready(function() {
            //     console.log( "ready!" );
            // });
            // или поместить после ajax ({}) функция должна что-то вернуть

            // Показываем кнопки "Удалить" и "Изменить" для админа или ответсвенного
            if(typeof(sessionUserLogin) != "undefined" && sessionUserLogin != null) {
                if (userLogin == sessionUserLogin || userLogin == 'admin') {
                    elDelete.removeAttribute("hidden");
                    elEditTitleButton.removeAttribute("hidden");
                    elEditDescriptionButton.removeAttribute("hidden");
                    elEditUserButton.removeAttribute("hidden");
                }
            }

            // Отображаем данные задачи в модальном окне
            elTaskName.textContent = obj['task_name']; // Имя задачи
            elTaskDescription.textContent = obj['description']; // Описание задачи
            elUserName.textContent = obj['user_name']; // Ответсвенный
            elTaskCreatedDate.textContent = obj['created_at']; // Дата создания задачи
            elTaskDeadLine.textContent = obj['dead_line']; // Срок выполнения задачи
            elTaskStatus.textContent = obj['status_name']; // Статаус задачи

            // Помещаем id задачи в поля форм input hidden для редактирования данных задачи
            elTaskTitleHidden.setAttribute('value', obj['task_id']);
            elTaskDescriptionHidden.setAttribute('value', obj['task_id']);
            elTaskUserHidden.setAttribute('value', obj['task_id']);
            elTaskUserHiddenId.setAttribute('value', obj['user_id']);
        },
    });
}

var taskRow = document.getElementById("row-tasks");

taskRow.addEventListener('click', function (e) {
    getTaskValues(e);
}, true);


    /*var id_good = $(this).attr("id").substr(5);

    $.ajax({
        url: "/basket/add/",
        type: "POST",
        data:{
            id_good: id_good,
            quantity: 1
        },
        error: function() {alert("Что-то пошло не так...");},
        success: function(response){
            if(response.result == 1)
                alert("Товар добавлен в корзину!");
            else
                alert("Что-то пошло не так...");
        },
        dataType : "json"
    })

});
*/
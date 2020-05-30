// При нажатии кнопки "Изменить" у даннхы задачи, где ркдактируется текст (название и описание задачи), показываем форму редактирования
$(".edit-text-button").on('click', function () {

    var changeButtonId = $(this).attr("id"); // Получаем id кнопки "Изменить". Она содержит обозначение поля задачи (имя, ответственный, срок выполнения и т.д.), которое мы изменяем
    var elChangedData = changeButtonId.split('-')[1]; // Получаем значение поля задачи для редактирования
    var formId = 'edit-' + elChangedData + '-form'; // Получаем id формы редактирования
    var inputForChangeId = elChangedData + '-input'; // Получаем id поля редактирования текста

    var elChangedValue = document.getElementById(elChangedData); // Элемент с иходным значением изменяемого поля
    var elEditForm = document.getElementById(formId); // Форма редактирования
    var elChangeButton = document.getElementById(changeButtonId); // Кнопка изменить в соответсвующем поле

    var elInputForChange = document.getElementById(inputForChangeId); // Input для изменения данных
    var initialValue = elChangedValue.textContent; // Исходное значение
    elInputForChange.setAttribute("value", initialValue); // Помещаем исходное значение в поле формы редактирования

    // При нажатии кнопки изменить:
    elChangedValue.setAttribute("hidden", ""); // Скрываем элемент со значением поля
    elEditForm.removeAttribute("hidden"); // Показываем форму редактирования
    elChangeButton.setAttribute("hidden", ""); // Скрываем кнопку "Изменить"
})

// При нажатии кнопки "Изменть" при изменении срока выполнения задачи
$("#edit-task_modal_deadline-button").on('click', function () {

    var elDeadline = document.getElementById("task_modal_deadline"); // Элемент, выводящий срок выполнения задачи
    var elDeadlineForm = document.getElementById("edit-task_modal_deadline-form"); // Форма изменения срока выполнения
    var elChangeButton = document.getElementById("edit-task_modal_deadline-button"); // Кнопка "Изменить"

    var elInputForChangeDate = document.getElementById("task_modal_date-input"); // Input для ввода даты (дня) выполнения
    var elInputForChangeTime = document.getElementById("task_modal_time-input"); // Input для ввода времни выполнения

    var initialDeadline = elDeadline.textContent; // Исходный срок выполнения
    var initialDate = initialDeadline.split(" ")[0]; // Исходная дата (день)
    var initialTime = initialDeadline.split(" ")[1].substr(0,5); // Исходное время без секунд

    elInputForChangeDate.setAttribute("value", initialDate); // Помещаем исходную дату (день) в input для изменения
    elInputForChangeTime.setAttribute("value", initialTime); // Помещаем исходное время в input для изменения

    elDeadline.setAttribute("hidden", ""); // Скрываем элемент со значением поля
    elDeadlineForm.removeAttribute("hidden"); // Показываем форму редактирования
    elChangeButton.setAttribute("hidden", ""); // Скрываем кнопку "Изменить"

})

// При нажатии кнопки "Изменить" при смене ответсвенного за выполнение задачи
$('#edit-task_modal_user-button').on('click', function(){

    var elUser = document.getElementById('task_modal_user'); // Элемент, выводящий имя ответсвенного
    var elUserId = document.getElementById('hidden-user-id') // Input hidden, содержащий id ответственного
    var userId = elUserId.getAttribute('value'); // Получаем Id ответсвенного

    var elEditUser = document.getElementById('edit-task_modal_user-form'); // Форма для редактирования
    var elEditUserButton = document.getElementById("edit-task_modal_user-button"); // Кнопка "Изменить"

    // ajax-запрос для получения списка пользователей
    var url = "index.php";
    var action = "getUsers";
    $.ajax({
        url: url,
        type: "GET",
        data: {
            ajax: action,
        },
        error: function () {
            alert('Что-то пошло не так!');
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data); // Получаем данные таблицы users
            var users_number = obj.length; // Количество пользователей

            var elUsersSelect = document.getElementById('task_modal_user-select') // Select для выбора пользователя
            var options = '<option value = "' + userId + ' " >' + elUser.textContent + '</option>'; // Помещаем исходного ответственного в первый <option>

            // Помещаем в <option> остальных пользователей
            for (var i=0; i<users_number; i++) {
                options += '<option value="' + obj[i]['user_id'] + '">' + obj[i]['user_name'] + '</option>';
            }
            elUsersSelect.innerHTML = options;
        },
    });

    elUser.setAttribute("hidden", ""); // Скрываем элемент с именем ответсвенного
    elEditUser.removeAttribute("hidden"); // Показываем форму редактирования
    elEditUserButton.setAttribute("hidden", ""); // Скрываем кнопку "Изменить"
});

// При нажатии кнопки "Выполнена" или "Не выполнена" меняем статус задачи
$("#edit-task_modal_status-button").on('click', function () {

    var elStatus = document.getElementById("task_modal_status"); // Элемент, выводящий статус задачи
    var elCompleteButton = document.getElementById("edit-task_modal_status-button"); // Кнопка "Выполнена/Невыполнена"
    var task_id = document.getElementById("task_modal_id").textContent; // Id задачи

    // Меняем статус задачи с "выполнена" на "не выполнена" и наоборот
    if (elStatus.textContent == "выполнена"){
        var updated_status_id = 2; // Новый id статуса задачи
    } else {
        var updated_status_id = 1;
    }

    var action = "taskUpdate";

    $.ajax({
        url: 'index.php',
        type: "POST",
        data: {
            ajax: action,
            id_task: task_id,
            update: 'status',
            initial_value: updated_status_id
        },
        error: function () {
            alert('Что-то пошло не так!');
        },
        success: function(response){
            // Получаем id задачи и id статуса
            var obj = jQuery.parseJSON(response);
            var task_id = obj['id_task'];
            var status_id = obj['updated_value'];

            // Получаем элемент превью
            var idStatusCardPreview = "status_task_" + task_id;
            var elStatusCardPreview = document.getElementById(idStatusCardPreview);

            // Устанавливаем иконку completed.png иил uncompleted.png
            if (status_id == 1){
                elStatus.textContent = "выполнена";
                elCompleteButton.textContent = "Не выполнена";
                elCompleteButton.classList.replace('btn-success', 'btn-warning');
                elStatusCardPreview.setAttribute('src', 'img/completed.png');
            } else {
                elStatus.textContent = "не выполнена";
                elCompleteButton.textContent = "Выполнена";
                elCompleteButton.classList.replace('btn-warning', 'btn-success');
                elStatusCardPreview.setAttribute('src', 'img/uncompleted.png');
            }
        },
        //dataType : "json"
    });
})


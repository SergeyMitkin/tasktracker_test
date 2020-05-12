$('#edit-title-button').on('click', function(){

    var elTitle = document.getElementById('taskModalLabel'); // Имя задачи
    var elEditTitle = document.getElementById('edit_modal_title'); // Форма редактирования
    var elEditTitleButton = document.getElementById("edit-title-button"); // Кнопка "Изменить"

    visibleTitleEditForm(elTitle, elEditTitle,elEditTitleButton); // Показываем форму для редактирования имани для админа или ответсвенного

    var elTaskTitleInput = document.getElementById('task-title-input'); // Поле ввода
    var taskTitleText = elTitle.textContent; // Исходное значение
    elTaskTitleInput.setAttribute("value", taskTitleText); // Помещаем исходное значение в поле формы редактирования
});

$('#edit-description-button').on('click', function(){
    var elDescription = document.getElementById('modal-task-description'); // Описание задачи
    var elEditDescription = document.getElementById('edit_modal_description'); // Форма для редактирования
    var elEditDescriptionButton = document.getElementById("edit-description-button"); // Кнопка "Изменить"

    visibleDescriptionEditForm(elDescription, elEditDescription,elEditDescriptionButton); // Показываем форму для редактирования описания

    var elTaskDescriptionInput = document.getElementById('task-description-input'); // Показываем форму для редактирования имани для админа или ответсвенного
    var taskDescriptionText = elDescription.textContent; // Исходное значение
    elTaskDescriptionInput.setAttribute("value", taskDescriptionText); // Помещаем исходное значение в поле формы редактирования
});

$('#edit-user-button').on('click', function(){
    var elUser = document.getElementById('modal-task-user'); // Ответсвенный
    var elUserId = document.getElementById('hidden-user-id') // Id ответственного
    var userId = elUserId.getAttribute('value');

    var elEditUser = document.getElementById('edit_modal_user'); // Форма для редактирования
    var elEditUserButton = document.getElementById("edit-user-button"); // Кнопка "Изменить"

    // ajax-запрос
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

            var elUsersSelect = document.getElementById('task-user-select') // Select для выбора пользователя
            var options = '<option value = "' + userId + ' " >' + elUser.textContent + '</option>'; // Помещаем исходного ответственного в первый <option>

            // Помещаем в <option> остальных пользователей
            for (var i=0; i<users_number; i++) {
                options += '<option value="' + obj[i]['user_id'] + '">' + obj[i]['user_name'] + '</option>';
            }
            elUsersSelect.innerHTML = options;
        },
    });

    visibleUserEditForm(elUser, elEditUser, elEditUserButton); // Показываем форму для редактирования описания

});
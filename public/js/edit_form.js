$(".edit-text-button").on('click', function () {
    var changeButtonId = $(this).attr("id"); // Получаем id кнопки "Изменить". Она содержит обозначение поля задачи (имя, ответственный, срок выполнения и т.д.), которое мы изменяем
    var elChangedData = changeButtonId.split('-', 2)[1]; // Получаем значение поля задачи для редактирования
    var formId = 'edit-' + elChangedData + '-form'; // Получаем id формы редактирования
    var inputForChangeId = elChangedData + '-input'; // Получаем id поля редактирования текста

    var elChangedValue = document.getElementById(elChangedData); // Имя задачи
    var elEditForm = document.getElementById(formId); // Форма редактирования
    var elChangeButton = document.getElementById(changeButtonId); // Кнопка изменить в соответсвующем поле

    // При редактировании поля
    elChangedValue.setAttribute("hidden", ""); // Скрываем элемент со значением поля
    elEditForm.removeAttribute("hidden"); // Показываем форму редактирования
    elChangeButton.setAttribute("hidden", ""); // Скрываем кнопку "Изменить"

    var elInputForChange = document.getElementById(inputForChangeId); // Input для изменения данных
    var initialValue = elChangedValue.textContent; // Исходное значение
    elInputForChange.setAttribute("value", initialValue); // Помещаем исходное значение в поле формы редактирования

    //console.log(initialValue);
})

/*
$('#edit-title-button').on('click', function(){
    // var id_good = $(this).attr("id").substr(5);

    var elTitle = document.getElementById('taskModalLabel'); // Имя задачи
    var elEditTitle = document.getElementById('edit_modal_title'); // Форма редактирования
    var elEditTitleButton = document.getElementById("edit-title-button"); // Кнопка "Изменить"

    visibleTitleEditForm(elTitle, elEditTitle,elEditTitleButton); // Показываем форму для редактирования названия задачи

    var elTaskTitleInput = document.getElementById('task-title-input'); // Поле ввода
    var taskTitleText = elTitle.textContent; // Исходное значение
    elTaskTitleInput.setAttribute("value", taskTitleText); // Помещаем исходное значение в поле формы редактирования
});
*/
/*
$('#edit-description-button').on('click', function(){
    var elDescription = document.getElementById('modal-task-description'); // Описание задачи
    var elEditDescription = document.getElementById('edit_modal_description'); // Форма для редактирования
    var elEditDescriptionButton = document.getElementById("edit-description-button"); // Кнопка "Изменить"

    visibleDescriptionEditForm(elDescription, elEditDescription,elEditDescriptionButton); // Показываем форму для редактирования описания

    var elTaskDescriptionInput = document.getElementById('task-description-input'); // Показываем форму для редактирования имани для админа или ответсвенного
    var taskDescriptionText = elDescription.textContent; // Исходное значение
    elTaskDescriptionInput.setAttribute("value", taskDescriptionText); // Помещаем исходное значение в поле формы редактирования
});
*/

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
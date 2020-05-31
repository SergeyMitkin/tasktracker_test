// Отправка формы редактирования названия задачи на сервер
var elEditTitleForm = document.getElementById('edit-task_modal_title-form'); // Форма редактирования имени задачи

addEvent(elEditTitleForm, 'submit', function (e) {
    e.preventDefault();
    var elements = this.elements;
    var initial_value = elements.task_name.value;
    var task_id = elements.hidden_title.value;
    var action = "taskUpdate";

    $.ajax({
        url: 'index.php',
        type: "POST",
        data: {
            ajax: action,
            id_task: task_id,
            update: 'title',
            initial_value : initial_value,
        },
        error: function () {
            alert('Что-то пошло не так!');
        },
        success: function(response){

            // Получаем имя и id отредактированной задачи
            var obj = jQuery.parseJSON(response);
            var task_id = obj['id_task'];
            var updated_task_name = obj['updated_value'];
            var elTitle = document.getElementById('task_modal_title');
            var idTitleCardPreview = "title_task_" + task_id;
            var elTitleCardPreview = document.getElementById(idTitleCardPreview);

            elTitle.textContent = updated_task_name;
            elTitleCardPreview.textContent = updated_task_name;

            elEditTitleForm.setAttribute("hidden", ""); // Скрываем форму изменения названия
            elTitle.removeAttribute("hidden"); // Показываем элемент с названием задачи
        },
        //dataType : "json"
    });
})

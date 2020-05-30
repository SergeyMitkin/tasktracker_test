// Отправка формы редактирования описания задачи на сервер
var elEditDescriptionForm = document.getElementById('edit-task_modal_description-form'); // Форма редактирования описания задачи

addEvent(elEditDescriptionForm, 'submit', function (e) {
    e.preventDefault();
    var elements = this.elements;
    var initial_value = elements.task_description.value;
    var task_id = elements.hidden_description.value;

    var action = "taskUpdate";

    $.ajax({
        url: 'index.php',
        type: "POST",
        data: {
            ajax: action,
            id_task: task_id,
            update: 'description',
            initial_value: initial_value
        },
        error: function () {
            alert('Что-то пошло не так!');
        },
        success: function(response){

            // Получаем имя и id отредактированной задачи
            var obj = jQuery.parseJSON(response);
            var task_id = obj['id_task'];
            var updated_task_description = obj['updated_value'];

            var elDescription = document.getElementById('task_modal_description');
            var idDescriptionCardPreview = "description_task_" + task_id;
            var elDescriptionCardPreview = document.getElementById(idDescriptionCardPreview);

            elDescription.textContent = updated_task_description;
            elDescriptionCardPreview.textContent = updated_task_description;

            elEditDescriptionForm.setAttribute("hidden", ""); // Скрываем форму редактирования описания
            elDescription.removeAttribute("hidden"); // Показываем элемент с описанием задачи

        },
        //dataType : "json"
    });
})
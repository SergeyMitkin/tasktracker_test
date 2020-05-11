var formDescription = document.getElementById('edit_modal_description'); // Форма редактирования описания задачи

addEvent(formDescription, 'submit', function (e) {
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

            var elDescription = document.getElementById('modal-task-description');
            var idDescriptionCardPreview = "description_task_" + task_id;
            var elDescriptionCardPreview = document.getElementById(idDescriptionCardPreview);
            var elEditDescription = document.getElementById('edit_modal_description');

            elDescription.textContent = updated_task_description;
            elDescriptionCardPreview.textContent = updated_task_description;

            hideEditDescriptionForm(elDescription, elEditDescription);

        },
        //dataType : "json"
    });
})
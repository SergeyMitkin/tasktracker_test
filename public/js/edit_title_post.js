var formTitle = document.getElementById('edit_modal_title'); // Форма редактирования имени задачи

addEvent(formTitle, 'submit', function (e) {
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

            var elTitle = document.getElementById('taskModalLabel');
            var idTitleCardPreview = "title_task_" + task_id;
            var elTitleCardPreview = document.getElementById(idTitleCardPreview);
            var elEditTitle = document.getElementById('edit_modal_title');

            elTitle.textContent = updated_task_name;
            elTitleCardPreview.textContent = updated_task_name;

            hideEditTitleForm(elTitle, elEditTitle);

        },
        //dataType : "json"
    });
})

var formTitle = document.getElementById('edit_model_title');

addEvent(formTitle, 'submit', function (e) {
    e.preventDefault();
    var elements = this.elements;
    var title = elements.task_name.value;
    var task_id = elements.hidden_title.value;
    var action = "taskUpdate";

    $.ajax({
        url: 'index.php',
        type: "POST",
        data: {
            ajax: action,
            id_task: task_id,
            task_name: title,
            update: 'title'
        },
        error: function () {
            alert('Что-то пошло не так!');
        },
        success: function(response){
            var obj = jQuery.parseJSON(response);
            //console.log(obj['id_task']);
            // Получаем имя и id отредактированной задачи
            var task_id = obj['id_task'];
            var updated_task_name = obj['updated_task_name'];


            var elTitle = document.getElementById('taskModalLabel');
            var idTitleCardPreview = "title_task_" + task_id;
            var elTitleCardPreview = document.getElementById(idTitleCardPreview);
            //console.log(elTitleCardPreview);
            var elEditTitle = document.getElementById('edit_model_title');

            elTitle.textContent = updated_task_name;
            elTitleCardPreview.textContent = updated_task_name;

            hideEditForm(elTitle, elEditTitle);


           /*
           if(response == 'response')
                alert("Имя задачи изменено!");
            else
                alert("Что-то пошло не так...");
                */
        },
        //dataType : "json"
    });
})

/*
$('#edit-title-post').on('click', function () {
    console.log('click on edit-title-post');
})
*/
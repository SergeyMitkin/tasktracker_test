// Выводим данные задачи в модальном окне

function getTaskValues(e) {
    if (!e.preventDefault()){
        var url = "index.php";
        var action = "taskItem";
    };

    var elTitle = document.getElementById('taskModalLabel');
    var elEditTitle = document.getElementById('edit_model_title');
    var elEditTitleButton = document.getElementById("edit-title-button");
    elEditTitleButton.setAttribute("hidden", "");

    hideEditForm(elTitle, elEditTitle);

    // получаем id задачи
    var target_id = e.target.id;
    var obj_id = target_id.split('_');
    var task_id = obj_id[2];

    var elTaskName = document.getElementById('taskModalLabel');
    var elTaskDescription = document.getElementById('modal-task-description');
    var elUserName = document.getElementById('modal-task-user');
    var elTaskCreatedDate = document.getElementById('modal-task-created-date');
    var elTaskDeadLine = document.getElementById('modal-task-dead-line');
    var elTaskStatus = document.getElementById('modal-task-status');
    var elTaskTitleHidden  = document.getElementById('hidden-title');

    var elDelete = document.getElementById('delete_button');
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
            var obj = jQuery.parseJSON(data)[0];

            var userLogin = obj['login'];

            if(typeof(sessionUserLogin) != "undefined" && sessionUserLogin !== null) {
                if (userLogin == sessionUserLogin || userLogin == 'admin') {
                    elDelete.removeAttribute("hidden", "");
                    elEditTitleButton.removeAttribute("hidden", "");
                }
            }

            elTaskName.textContent = obj['task_name'];
            elTaskDescription.textContent = obj['description'];
            elUserName.textContent = obj['user_name'];
            elTaskCreatedDate.textContent = obj['created_at'];
            elTaskDeadLine.textContent = obj['dead_line'];
            elTaskStatus.textContent = obj['status_name'];
            elTaskTitleHidden.setAttribute('value', obj['task_id']);
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
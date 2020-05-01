// Выводим данные задачи в модальном окне

function getTaskId(e) {
    if (!e.preventDefault()){
        //console.log('entered to prevent');
        var url = "index.php";
        var action = "taskItem";
    };
    var target = e.target.id;
    var task_id = target.substr(5);

    var elTaskName = document.getElementById('taskModalLabel');
    var elTaskDescription = document.getElementById('modal-task-description');
    var elUserName = document.getElementById('modal-task-user');
    var elTaskCreatedDate = document.getElementById('modal-task-created-date');
    var elTaskDeadLine = document.getElementById('modal-task-dead-line');
    var elTaskStatus = document.getElementById('modal-task-status');

    var elDelete = document.getElementById('delete');
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
            //console.log(obj);
            var userLogin = obj['login'];

            if (userLogin == sessionUserLogin || userLogin == 'admin') {
                elDelete.removeAttribute("hidden", "");
            }

            elTaskName.textContent = obj['task_name'];
            elTaskDescription.textContent = obj['description'];
            elUserName.textContent = obj['user_name'];
            elTaskCreatedDate.textContent = obj['created_at'];
            elTaskDeadLine.textContent = obj['dead_line'];
            elTaskStatus.textContent = obj['status_name'];
        },
    });
}

var taskRow = document.getElementById("row-tasks");

taskRow.addEventListener('click', function (e) {
    getTaskId(e);
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
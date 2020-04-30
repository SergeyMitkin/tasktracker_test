$('.card-title').on('click', function(){
    var id_task = $(this).attr("id");
    var elTaskName = document.getElementById('taskModalLabel');
    var elTaskDescription = document.getElementById('modal-task-description');
    var elUserName = document.getElementById('modal-task-user');
    var elTaskCreatedDate = document.getElementById('modal-task-created-date');
    var elTaskDeadLine = document.getElementById('modal-task-dead-line');

    $.ajax({
        url: "index.php",
        type: "GET",
        data: {
            ajax: "taskItem",
            id_task: id_task
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data)[0];
            console.log(obj);
            //alert(obj[0] + ", " + obj[1]);
            elTaskName.textContent = obj['task_name'];
            elTaskDescription.textContent = obj['description'];
            elUserName.textContent = obj['user_name'];
            elTaskCreatedDate.textContent = obj['created_at'];
            elTaskDeadLine.textContent = obj['dead_line'];
        },

    });

    /*
    console.log('You clicked .card-title');

    var task_id = $(this).attr("id");

    console.log(task_id);
    */

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
    */
});
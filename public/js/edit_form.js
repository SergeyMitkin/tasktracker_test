$('#edit-title-button').on('click', function(){
    //console.log('entered to edit_form');
    var elTitle = document.getElementById('taskModalLabel');
    var elEditTitle = document.getElementById('edit_model_title');
    var elEditTitleButton = document.getElementById("edit-title-button");
    visibleTitleEditForm(elTitle, elEditTitle,elEditTitleButton);

    var elTaskTitleInput = document.getElementById('task-title-input');
    var taskTitleText = elTitle.textContent;
    elTaskTitleInput.setAttribute("value", taskTitleText);
});


/*$.ajax({
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
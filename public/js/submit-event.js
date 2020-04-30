function getTaskId(e) {
    //console.log('зашли в функцию getTaskId');
    var target = e.target.id;
    //var elId = document.getElementById('exampleModalLabel');
    //elId.textContent=target;
}

var taskRow = document.getElementById("row-tasks");

taskRow.addEventListener('click', function (e) {
    getTaskId(e);
}, true);




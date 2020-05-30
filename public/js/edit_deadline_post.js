// Отправка формы редактирования срока выполнения задачи на сервер
var elEditDeadlineForm = document.getElementById('edit-task_modal_deadline-form'); // Форма редактирования срока выполнения задачи

addEvent(elEditDeadlineForm, 'submit', function (e) {
    e.preventDefault();
    var elements = this.elements;
    var initial_date = elements.task_date.value;
    var initial_time = elements.task_time.value;
    var initial_value = initial_date + " " + initial_time;
    var task_id = elements.hidden_deadline.value;

    //console.log(initial_value);

    var action = "taskUpdate";

    $.ajax({
        url: 'index.php',
        type: "POST",
        data: {
            ajax: action,
            id_task: task_id,
            update: 'deadline',
            initial_value: initial_value
        },
        error: function () {
            alert('Что-то пошло не так!');
        },
        success: function(response){

            // Получаем имя и id отредактированной задачи
            var obj = jQuery.parseJSON(response);
            var task_id = obj['id_task'];
            var updated_task_deadline = obj['updated_value'].substr(0,16); // Новое значения срока исполнения без секунд

            var elDeadline = document.getElementById('task_modal_deadline');
            var idDeadlineCardPreview = "deadline-span_task_" + task_id;
            var elDeadlineCardPreview = document.getElementById(idDeadlineCardPreview);

            elDeadline.textContent = updated_task_deadline;
            elDeadlineCardPreview.textContent = updated_task_deadline;

            elEditDeadlineForm.setAttribute("hidden", ""); // Скрываем форму редактирования срока выполнения
            elDeadline.removeAttribute("hidden"); // Показываем элемент со сроком выполнения

        },
        //dataType : "json"
    });
})
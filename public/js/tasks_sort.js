// Сортировка по имени пользователя
document.querySelector('#sort_user_name').onclick = sortUserName;

function sortUserName(){
    var hrefSortUserName = document.getElementById("sort_user_name"); // Ссылка для сортировки
    hrefSortUserName.setAttribute('href', '#'); // Отключаем ссылку для сортировки для php, если включен JS

    let row_tasks = document.querySelector("#row-tasks"); // Div - родитель для карточек задач

    // ASC и DESC сортировка
    if (hrefSortUserName.textContent == 'Задачи по имени пользователя (z-a↓)') {
        // Сортировка "пузырьком" карточек задач по атрибуту data-sortUser, содержащему имя пользователя
        $("#row-tasks .list-group").show();
        for (let i = 0; i < row_tasks.children.length; i++){
            for (let j = i; j < row_tasks.children.length; j++){
                if (row_tasks.children[i].getAttribute('data-sortUser').toLowerCase() <
                    row_tasks.children[j].getAttribute('data-sortUser').toLowerCase()){
                    replacedNode = row_tasks.replaceChild(row_tasks.children[j], row_tasks.children[i]);
                    insertAfter(replacedNode, row_tasks.children[i]);
                }
            }
        }
        hrefSortUserName.textContent = 'Задачи по имени пользователя (a-z↓)';
        $("#row-tasks .list-group:gt(2)").hide();

        var activePageNumber = $(".pagination li.active")[0].children[0].textContent;
        var firstPage =  $(".pagination li.first-page");

        if (activePageNumber != '1') {
            $(".pagination li").removeClass("active");
            firstPage.addClass("active");
        }

    }else if (hrefSortUserName.textContent == 'Задачи по имени пользователя (a-z↓)') {
        // Сортировка "пузырьком" карточек задач по атрибуту data-sortUser, содержащему имя пользователя
        $("#row-tasks .list-group").show();
        for (let i = 0; i < row_tasks.children.length; i++) {
            for (let j = i; j < row_tasks.children.length; j++) {
                if (row_tasks.children[i].getAttribute('data-sortUser').toLowerCase() >
                    row_tasks.children[j].getAttribute('data-sortUser').toLowerCase()) {
                    replacedNode = row_tasks.replaceChild(row_tasks.children[j], row_tasks.children[i]);
                    insertAfter(replacedNode, row_tasks.children[i]);
                }
            }
        }
        hrefSortUserName.textContent = 'Задачи по имени пользователя (z-a↓)';
        $("#row-tasks .list-group:gt(2)").hide();

        var firstPage =  $(".pagination li.first-page");
        var activePageNumber = $(".pagination li.active")[0].children[0].textContent;

        if (activePageNumber != '1') {
            console.log('bingo');
            $(".pagination li").removeClass("active");
            firstPage.addClass("active");
        }
    }
}

// Сортировка по сроку выполнения
$("#sort_deadline").on('click', function () {

    var hrefSortDeadline = document.getElementById("sort_deadline"); // Ссылка для сортировки
    hrefSortDeadline.setAttribute('href', '#'); // Отключаем ссылку для сортировки для php, если включен JS

    let row_tasks = document.querySelector("#row-tasks"); // Div - родитель для карточек задач

    // ASC и DESC сортировка
    if (hrefSortDeadline.textContent == 'Задачи по сроку выполнения (←)') {
        // Сортировка "пузырьком" карточек задач по атрибуту data-sort-deadline, содержащему Unix срока выполнения
        for (let i = 0; i < row_tasks.children.length; i++){
            for (let j = i; j < row_tasks.children.length; j++){
                if (row_tasks.children[i].getAttribute('data-sort-deadline') <
                    row_tasks.children[j].getAttribute('data-sort-deadline')){
                    replacedNode = row_tasks.replaceChild(row_tasks.children[j], row_tasks.children[i]);
                    insertAfter(replacedNode, row_tasks.children[i]);
                }
            }
        }
        hrefSortDeadline.textContent = 'Задачи по сроку выполнения (→)';
    }else{
        // Сортировка "пузырьком" карточек задач по атрибуту data-sort-deadline, содержащему Unix срока выполнения
        for (let i = 0; i < row_tasks.children.length; i++) {
            for (let j = i; j < row_tasks.children.length; j++) {
                if (row_tasks.children[i].getAttribute('data-sort-deadline') >
                    row_tasks.children[j].getAttribute('data-sort-deadline')) {
                    replacedNode = row_tasks.replaceChild(row_tasks.children[j], row_tasks.children[i]);
                    insertAfter(replacedNode, row_tasks.children[i]);
                }
            }
        }
        hrefSortDeadline.textContent = 'Задачи по сроку выполнения (←)';
    }
})

// Сортировка по статусу
$("#sort_status").on('click', function () {

    var hrefSortStatus = document.getElementById("sort_status"); // Ссылка для сортировки
    hrefSortStatus.setAttribute('href', '#'); // Отключаем ссылку для сортировки для php, если включен JS

    let row_tasks = document.querySelector("#row-tasks"); // Div - родитель для карточек задач

    // ASC и DESC сортировка
    if (hrefSortStatus.textContent == 'Задачи по статусу (z-a↓)') {
        // Сортировка "пузырьком" карточек задач по атрибуту data-sortStatus, содержащему статус задачи
        for (let i = 0; i < row_tasks.children.length; i++){
            for (let j = i; j < row_tasks.children.length; j++){
                if (row_tasks.children[i].getAttribute('data-sortStatus').toLowerCase() <
                    row_tasks.children[j].getAttribute('data-sortStatus').toLowerCase()){
                    replacedNode = row_tasks.replaceChild(row_tasks.children[j], row_tasks.children[i]);
                    insertAfter(replacedNode, row_tasks.children[i]);
                }
            }
        }
        hrefSortStatus.textContent = 'Задачи по статусу (a-z↓)';
    }else{
        // Сортировка "пузырьком" карточек задач по атрибуту data-sortStatus, содержащему статус задачи
        for (let i = 0; i < row_tasks.children.length; i++) {
            for (let j = i; j < row_tasks.children.length; j++) {
                if (row_tasks.children[i].getAttribute('data-sortStatus').toLowerCase() >
                    row_tasks.children[j].getAttribute('data-sortStatus').toLowerCase()) {
                    replacedNode = row_tasks.replaceChild(row_tasks.children[j], row_tasks.children[i]);
                    insertAfter(replacedNode, row_tasks.children[i]);
                }
            }
        }
        hrefSortStatus.textContent = 'Задачи по статусу (z-a↓)';
    }
})

// Вспомогательная функция для сортировки "пузырьком"
function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

// Сортировка по имени пользователя
$("#sort_user_name").on('click', function () {

    var hrefSortUserName = document.getElementById("sort_user_name"); // Ссылка для сортировки
    hrefSortUserName.setAttribute('href', '#'); // Отключаем ссылку для сортировки для php, если включен JS

    let row_tasks = document.querySelector("#row-tasks"); // Div - родитель для карточек задач

    // ASC и DESC сортировка
    if (hrefSortUserName.textContent == 'Задачи по имени пользователя (z-a↓)') {
        // Сортировка "пузырьком" карточек задач по атрибуту data-sortUser, содержащему имя пользователя
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
    }else{
        // Сортировка "пузырьком" карточек задач по атрибуту data-sortUser, содержащему имя пользователя
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
    }
})

// Вспомогательная функция для сортировки "пузырьком"
function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

// Сортировка по имени пользователя
/* let row_tasks = document.querySelector("#row-tasks");
//replacedNode = parentNode.replaceChild(newChild, oldChild);
replacedNode = row_tasks.replaceChild(row_tasks.children[1], row_tasks.children[0]);
*/

document.getElementById("sort_user_name").onclick = mySort();

function mySort() {
    let row_tasks = document.querySelector("#row-tasks");
    console.log('row');
    //row_tasks.sort();
}


/*$('#edit-task_modal_user-button').on('click', function(){

    var elUser = document.getElementById('task_modal_user'); // Элемент, выводящий имя ответсвенного
    var elUserId = document.getElementById('hidden-user-id') // Input hidden, содержащий id ответственного
    var userId = elUserId.getAttribute('value'); // Получаем Id ответсвенного

    var elEditUser = document.getElementById('edit-task_modal_user-form'); // Форма для редактирования
    var elEditUserButton = document.getElementById("edit-task_modal_user-button"); // Кнопка "Изменить"

    // ajax-запрос для получения списка пользователей
    var url = "index.php";
    var action = "getUsers";
    $.ajax({
        url: url,
        type: "GET",
        data: {
            ajax: action,
        },
        error: function () {
            alert('Что-то пошло не так!');
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data); // Получаем данные таблицы users
            var users_number = obj.length; // Количество пользователей

            var elUsersSelect = document.getElementById('task_modal_user-select') // Select для выбора пользователя
            var options = '<option value = "' + userId + ' " >' + elUser.textContent + '</option>'; // Помещаем исходного ответственного в первый <option>

            // Помещаем в <option> остальных пользователей
            for (var i=0; i<users_number; i++) {
                options += '<option value="' + obj[i]['user_id'] + '">' + obj[i]['user_name'] + '</option>';
            }
            elUsersSelect.innerHTML = options;
        },
    });

    elUser.setAttribute("hidden", ""); // Скрываем элемент с именем ответсвенного
    elEditUser.removeAttribute("hidden"); // Показываем форму редактирования
    elEditUserButton.setAttribute("hidden", ""); // Скрываем кнопку "Изменить"
})
*/
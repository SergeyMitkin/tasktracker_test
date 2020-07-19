// Функция для проверки количества символов в полях формы

$(document).ready(function () {
    function checkLength(e, minLength) {               // Объявляем фукцию проверки количества символов
        var el, elMsg;
        el = e.target;
        elMsg = el.nextSibling;

        if (el.value.length < minLength) {
            elMsg.innerHTML = 'Поле должно содержать не менее ' + minLength + ' символов';
        } else {
            elMsg.innerHTML = '';
        }
    }

// Проверка количества символов поля 'логин'
    var elUserLogin = document.getElementById('login');
    elUserLogin.addEventListener('blur', function (e) {
        checkLength(e, 5);
    }, false)

    var elUsername = document.getElementById('username');
    elUsername.addEventListener('blur', function (e) {
        checkLength(e, 5);
    }, false)
})


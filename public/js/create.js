// подсчёт символов в поле описания задачи

var el;

function charCount(e) {
    var textEntered, charDisplay, counter;          // Объявляем переменные
    textEntered = document.getElementById('description').value;  // Пользовательский текст
    charDisplay = document.getElementById('charactersLeft'); // Элемент счетчика
    counter = (180 - (textEntered.length));                  // Количество оставшихся символов
    charDisplay.textContent = counter;                       // Отображение оставшихся символов
}

el = document.getElementById('description');                   // Получаем элемент, в котором находится сообщение
el.addEventListener('keypress', charCount, false);// Событие keypress


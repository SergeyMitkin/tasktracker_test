// Вспомогательная функция для добавления обработчика событий
function addEvent (el, event, callback) {
  if ('addEventListener' in el) {                  // Если addEventListener работает
    el.addEventListener(event, callback, false);   // Используем его
  } else {                                         // В противном случае
    el['e' + event + callback] = callback;         // Создаем специальный код для IE
    el[event + callback] = function () {
      el['e' + event + callback](window.event);
    };
    el.attachEvent('on' + event, el[event + callback]); // Используем attachEvent()
  }  // для вызова второй функции, которая потом вызывает первую
}

// Вспомогательная функция для удаления обработчика событий
function removeEvent(el, event, callback) {
  if ('removeEventListener' in el) {                      // If removeEventListener works
    el.removeEventListener(event, callback, false);       // Используем его 
  } else {                                                // В противном случае
    el.detachEvent('on' + event, el[event + callback]);   // Создаем специальный код для IE
    el[event + callback] = null;
    el['e' + event + callback] = null;
  }
}


function hideEditTitleForm(elTitle, elEditTitle){
    elTitle.removeAttribute("hidden");
    elEditTitle.setAttribute("hidden", "");
}

function hideEditDescriptionForm(elDescription, elEditDescription){
    elDescription.removeAttribute("hidden");
    elEditDescription.setAttribute("hidden", "");
}

function hideEditUserForm(elUser, elEditUser){
    elUser.removeAttribute("hidden");
    elEditUser.setAttribute("hidden", "");
}

function visibleTitleEditForm(elTitle, elEditTitle, elEditTitleButton){
    elTitle.setAttribute("hidden", "");
    elEditTitle.removeAttribute("hidden");
    elEditTitleButton.setAttribute("hidden", "");
}

function visibleDescriptionEditForm(elDescription, elEditDescription,elEditDescriptionButton){
    elDescription.setAttribute("hidden", "");
    elEditDescription.removeAttribute("hidden");
    elEditDescriptionButton.setAttribute("hidden", "");
}

function visibleUserEditForm(elUser, elEditUser,elEditUserButton){
    elUser.setAttribute("hidden", "");
    elEditUser.removeAttribute("hidden");
    elEditUserButton.setAttribute("hidden", "");
}


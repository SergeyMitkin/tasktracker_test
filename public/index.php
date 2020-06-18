<?php
// импортируем контроллер главной страницы
include_once('../controllers/C_Page.php');
include_once('../controllers/C_Ajax.php');
session_start();

// Проверяем включен ли JS в браузере у пользователя
$_SESSION['JS_ON'] = (!empty($_SESSION['JS_ON']) || !empty($_GET['js'])); // JS_ON будет == true, если он уже установлен в сессии или только что пришел get-запрос
if (!$_SESSION['JS_ON'] && empty($_SESSION['JS_CHECKED'])) {
    echo '<script type="text/javascript">top.location.href="?js=1";</script>'; // записываем get-параметр в адресную строку через JS
} // если еще не проверяли, добавляем переадресацию

if (!isset($_SESSION['JS_CHECKED'])) { // Если JS_CHECKED установлен, то не перезаписываем
    $_SESSION['JS_CHECKED'] = $_GET['js']; // Записываем get-параметр в сессию JS_CHECKED
}

// получаем action из URL
$action = 'action_';
$action .= (isset($_GET['act'])) ? $_GET['act'] : 'index';

// передача данных через ajax-запросы
$isAjax = getAjax();

function getAjax(){
    $isAjax = '';

    if (isset($_GET['ajax'])){
        $isAjax = $_GET['ajax'];
    }elseif (isset($_POST['ajax'])){
        $isAjax = $_POST['ajax'];
    }else{
        $isAjax = false;
    }

    return $isAjax;
};


    // генерируем страницу
if (!$isAjax) {
    $controller = new C_page();
    $controller->$action();
    $controller->render();
} else {
    $controller = new C_Ajax();
    $controller->$isAjax();
    //$controller->render();
}



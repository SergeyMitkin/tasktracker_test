<?php
// импортируем контроллер главной страницы
include_once('../controllers/C_Page.php');
include_once('../controllers/C_Ajax.php');
session_start();

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



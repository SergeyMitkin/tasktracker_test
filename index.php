<?php

//импортируем контроллер главной страницы
include_once('controllers/C_Page.php');
session_start();

//получаем action из URL
$action = 'action_';
$action .= (isset($_GET['act'])) ? $_GET['act'] : 'index';



//генерируем страницу тест
$controller = new C_page();
$controller->$action();
$controller->render();




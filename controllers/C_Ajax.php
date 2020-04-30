<?php
/**
 * Created by PhpStorm.
 * User: Sergey
 * Date: 28.04.2020
 * Time: 18:27
 */
include_once('../models/m_tasks.php');
include_once('Controller.php');

class C_Ajax extends Controller
{
    public function render()
    {

    }

    public function taskItem()
    {
        $id_task = $_GET['id_task'];
        $task_data = getTask($id_task);

        echo $task_data;

    }
}
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

    public function taskUpdate(){
        $response = [];
        $task_id = $_POST['id_task'];
        $update = $_POST['update'];
        $task_name = $_POST['task_name'];

        switch ($update) {
            case "title": $updated_task_name = updateTaskName($task_id, $task_name);
        }

        $response['id_task'] = $task_id;
        $response['updated_task_name'] = $updated_task_name;
        $response_json = json_encode($response);
        echo $response_json;
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Sergey
 * Date: 28.04.2020
 * Time: 18:27
 */
include_once('../models/m_tasks.php');
include_once('../models/m_users.php');
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

    public function getUsers(){
        $users = getUsersData();

        echo json_encode($users);
    }

    public function taskUpdate(){
        $response = [];
        $task_id = $_POST['id_task'];
        $update = $_POST['update'];
        $initial_value = $_POST['initial_value'];

        switch ($update) {
            case "title":
                $updated_value = updateTaskName($task_id, $initial_value);
                break;

            case "description":
                $updated_value = updateTaskDescription($task_id, $initial_value);
                break;

            case "user":
                if (updateTaskUser($task_id, $initial_value))
                $updated_value = getUserName($initial_value); // получаем имя нового ответсвенного по переданному id
                break;

            case "deadline":
                $updated_value = updateTaskDeadline($task_id, $initial_value);
                break;

            case "status":
                $updated_value = completedTask($task_id, $initial_value);
                break;
        }

        $response['id_task'] = $task_id;
        $response['updated_value'] = $updated_value;
        $response_json = json_encode($response);

        echo $response_json;
    }
}
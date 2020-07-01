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
                $updated_user_id = updateTaskUser($task_id, $initial_value); // Устанавливаем нового ответсвенного, получаем его id
                $updated_value = getUserName($updated_user_id); // Получаем имя нового ответсвенного по его id
                break;

            case "deadline":
                $updated_value = updateTaskDeadline($task_id, $initial_value);
                break;

            case "status":
                $task_status_id = completedTask($task_id, $initial_value); // Обновляем статус
                $updated_value = getTaskStatus($task_status_id); // Получаем обновлённый статус
                break;

            case "delete":
                $updated_value = deleteTask($task_id);
        }

        $response['id_task'] = $task_id;
        $response['updated_value'] = $updated_value;
        $response_json = json_encode($response);

        echo $response_json;
    }
}
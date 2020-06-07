<?phprequire_once('db.php');/** * Модель таблицы tasks */// получаем массив задач с условиями пагинации и сортировкиfunction getTasks($results_per_page, $order, $order_value){    //первая задача на странице    $first_result = 0;    if (isset($_GET['first_result'])){        $first_result = $_GET['first_result'];    }    // задаём параметр сортировки    $sort_sql = 'tasks.created_at';        if ($order_value == 'user_name') {            $sort_sql = 'user_name';        } else if ($order_value == 'dead_line') {            $sort_sql = 'dead_line';        } else if ($order_value == 'status') {            $sort_sql = 'status_name';        }    try {        $q = "SELECT tasks.task_id, tasks.task_name, tasks.created_at, tasks.dead_line,            user_name, email, description, id_status, status_name              FROM tasks            LEFT JOIN users ON tasks.id_user = users.user_id			LEFT JOIN `status` ON tasks.id_status = `status`.status_id              ORDER BY " . $sort_sql . " " . $order . " LIMIT " . $first_result . "," . $results_per_page;        $sql = SQL::getInstance()->Select($q);    } catch (PDOException $e) {        die("Error: " . $e->getMessage());    }    //if ($order_value == 'dead_line') {        return $sql;    //}}// получаем данные задачи по idfunction getTask($id_task){    $id_task = (int)$id_task;    try {        $q = "SELECT * FROM tasks        LEFT JOIN users ON tasks.id_user = users.user_id         LEFT JOIN `status` ON tasks.id_status = `status`.status_id        WHERE task_id = ".$id_task;        $sql = SQL::getInstance()->Select($q);    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    if ($_GET['ajax']) {        return json_encode($sql);    } else {        return $sql;    }}function getLastInsertedTaskId(){    try {        $q = "SELECT task_id FROM tasks ORDER BY task_id DESC limit 1";        $sql = SQL::getInstance()->Select($q);    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $sql[0][0];}// получаем количество задач для пагинацииfunction getTasksCount(){        try {            $q = "SELECT COUNT(*) FROM tasks";            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        return $sql['0']['0'];}// добавляем или редактируем задачуfunction setTask($id_task = 0,$task_name, $task_description, $id_user, $dead_line, $id_status = 2){    $response = '';    $id_task = (int)$id_task;    //$date_now = date("Y-m-d G:i:s", mk);    $date_now = time(); // Текущее время в Unix timestamp    $dead_line_unix = strtotime((string)$dead_line); // Преобразовываем введённый срок выполнения в Unix timestamp   // --- ОТЛАДКА НАЧАЛО  // echo '<pre>';   //var_dump(date('Y-m-d H:i:s', $dead_line_unix));   //echo'</pre>';   //die;   // --- Отладка конец    try {        $description = $task_description;        $t = 'tasks';        $v = array(            'task_name' => $task_name,            'description' => $description,            'id_user' => $id_user,            'id_status' => $id_status,            'created_at' => $date_now,            'dead_line' => $dead_line_unix        );        if($id_task > 0) {            // значит текст задачи редактируется            $v = array(                'task_name' => $task_name,                'description' => $description            );            $w = "task_id =" . $id_task;            $sql = SQL::getInstance()->Update($t, $v, $w);            $response = 'Задача отредактирована';        }        else{            $sql = SQL::getInstance()->Insert($t, $v);            $response = 'Задача добавлена';        }    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $response;}// Редактируем название задачиfunction updateTaskName($id_task,$task_name){    $response = '';    $id_task = (int)$id_task;    try {        $t = 'tasks';        $v = array(            'task_name' => $task_name,        );        $w = "task_id =" . $id_task;        $sql = SQL::getInstance()->Update($t, $v, $w);        $response = $task_name;    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $response;}// редактируем описание задачиfunction updateTaskDescription($id_task, $task_description){    $response = '';    $id_task = (int)$id_task;    try {        $t = 'tasks';        $v = array(            'description' => $task_description,        );        $w = "task_id =" . $id_task;        $sql = SQL::getInstance()->Update($t, $v, $w);        $response = $task_description;    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $response;}// Редактируем срок выполнения задачиfunction updateTaskDeadline($id_task, $task_deadline){    $response = '';    $id_task = (int)$id_task;    try {        $t = 'tasks';        $v = array(            'dead_line' => $task_deadline,        );        $w = "task_id =" . $id_task;        $sql = SQL::getInstance()->Update($t, $v, $w);        $response = $task_deadline;    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $response;}// Изменяем ответсвенного за выполнения задачиfunction updateTaskUser($id_task, $id_user){    $response = '';    $id_task = (int)$id_task;    try {        $t = 'tasks';        $v = array(            'id_user' => $id_user,        );        $w = "task_id =" . $id_task;        $sql = SQL::getInstance()->Update($t, $v, $w);        $response = $id_user;    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $response;}function deleteTask($task_id){    $response = '';    $task_id = (int)$task_id;    try{        $table = 'tasks';        $where = "task_id = " . $task_id;        $sql = SQL::getInstance()->Delete($table, $where);        $response = 'Задача удалена';    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $response;}// если admin или ответсвенный нажал кнопку о выполненииfunction completedTask($task_id, $id_status){    $task_id = (int)$task_id;    $id_status = (int)$id_status;    try {        $t = 'tasks';        $v = array('id_status' => $id_status);        $w = "task_id =" . $task_id;        $sql = SQL::getInstance()->Update($t, $v, $w);        $response = $id_status;    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $response;}
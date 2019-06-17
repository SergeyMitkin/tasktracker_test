<?phprequire_once('db.php');/** * Модель таблицы tasks */// получаем массив задач с условиями пагинации и сортировкиfunction getTasks($results_per_page){    //первая задача на странице    $first_result = 0;    if (isset($_GET['first_result'])){        $first_result = $_GET['first_result'];    }    // сортировка по статусу    if(!empty($_POST['status']) || !empty($_GET['statusId'])) {        if (isset($_POST['status'])){            $statusId = $_POST['status'];        }        if (isset($_GET['statusId'])){            $statusId = $_GET['statusId'];        }        try {            $q = "SELECT tasks.id, `name`, email, description, id_status             FROM tasks            LEFT JOIN users ON tasks.id_user = users.id             WHERE id_status =" . $statusId . " LIMIT " . $first_result . "," . $results_per_page;            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        //cохраняем id статуса в сессию для перехода по страницам        if (!empty($_POST['status'])) {            $_SESSION['statusId'] = $_POST['status'];        }        return $sql;    }    // сортировка по имени    elseif(!empty($_POST['name']) || !empty($_GET['nameId'])){        if (isset($_POST['name'])){            $nameId = $_POST['name'];        }        if (isset($_GET['nameId'])){            $nameId = $_GET['nameId'];        }        try {            $q = "SELECT tasks.id, `name`, email, description, id_status              FROM tasks            LEFT JOIN users ON tasks.id_user = users.id            WHERE id_user =" . $nameId . " LIMIT " . $first_result . "," . $results_per_page;            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        //cохраняем id пользователя в сессию для перехода по страницам        if (!empty($_POST['name'])) {            $_SESSION['nameId'] = $_POST['name'];        }        return $sql;    }    // сортировка по email    elseif(!empty($_POST['email']) || !empty($_GET['emailId'])){        if (isset($_POST['email'])){            $emailId = $_POST['email'];        }        if (isset($_GET['nameId'])){            $emailId = $_GET['emailId'];        }        try {            $q = "SELECT tasks.id, `name`, email, description, id_status              FROM tasks            LEFT JOIN users ON tasks.id_user = users.id            WHERE id_user =" . $emailId . " LIMIT " . $first_result . "," . $results_per_page;            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        //cохраняем id пользователя в сессию для перехода по страницам        if (!empty($_POST['email'])) {            $_SESSION['emailId'] = $_POST['email'];        }        return $sql;    }    // вывод всех задач    else{        try {            $q = "SELECT tasks.id, `name`, email, description, id_status              FROM tasks            LEFT JOIN users ON tasks.id_user = users.id LIMIT " . $first_result . "," . $results_per_page;            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        return $sql;    }}// получаем данные задачи по idfunction getTask($id_task){    $id_task = (int)$id_task;    try {        $q = "SELECT * FROM tasks WHERE id = ".$id_task;        $sql = SQL::getInstance()->Select($q);    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $sql;}// получаем количество задач для пагинацииfunction getTasksCount(){    if(!empty($_POST['status']) || !empty($_GET['statusId'])){        if (isset($_POST['status'])){            $statusId = $_POST['status'];        }        if (isset($_GET['statusId'])){            $statusId = $_GET['statusId'];        }        try {            $q = "SELECT COUNT(*) FROM tasks            WHERE id_status =" . $statusId;            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        return $sql['0']['0'];    }    elseif (!empty($_POST['name']) || !empty($_GET['nameId'])){        if (isset($_POST['name'])){            $nameId = $_POST['name'];        }        if (isset($_GET['nameId'])){            $nameId = $_GET['nameId'];        }        try {            $q = "SELECT COUNT(*) FROM tasks            WHERE id_user =" . $nameId;            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        return $sql['0']['0'];    }    elseif(!empty($_POST['email']) || !empty($_GET['emailId'])){        if (isset($_POST['email'])){            $emailId = $_POST['email'];        }        if (isset($_GET['emailId'])){            $emailId = $_GET['emailId'];        }        try {            $q = "SELECT COUNT(*) FROM tasks            WHERE id_user =" . $emailId;            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        return $sql['0']['0'];    }    else {        try {            $q = "SELECT COUNT(*) FROM tasks";            $sql = SQL::getInstance()->Select($q);        } catch (PDOException $e) {            die("Error: " . $e->getMessage());        }        return $sql['0']['0'];    }}// добавляем задачуfunction setTask($id_task = 0){    $response = '';    $id_task = (int)$id_task;    $id_status = 2;    try {        $id_user = $_POST['name'];        $description = $_POST['description'];        $t = 'tasks';        $v = array('description' => $description,            'id_user' => $id_user,            'id_status' => $id_status);        if($id_task > 0) {            // значит текст задачи редактируется            $v = array('description' => $description);            $w = "id =" . $id_task;            $sql = SQL::getInstance()->Update($t, $v, $w);            $response = 'Задача отредактирована';        }        else{            $sql = SQL::getInstance()->Insert($t, $v);            $response = 'Задача добавлена';        }    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $response;}// если admin поставил галочку о выполненииfunction completedTask($task_id){    $task_id = (int)$task_id;    $id_status = 1;    try {        $t = 'tasks';        $v = array('id_status' => $id_status);        $w = "id =" . $task_id;        $sql = SQL::getInstance()->Update($t, $v, $w);    }    catch(PDOException $e){        die("Error: ".$e->getMessage());    }    return $sql;}
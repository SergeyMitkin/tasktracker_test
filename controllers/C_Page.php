<?php////Конттроллер главной страницы.////Импортируем модели и базовый контроллерinclude_once('../models/m_tasks.php');include_once('../models/m_auth.php');include_once('../models/m_users.php');include_once('../models/m_status.php');include_once('../models/m_validation.php');include_once('C_Base.php');class C_Page extends C_Base{	// Конструктор.	function __construct(){				parent::__construct();	}	// главная страница	public function action_index(){        // определяем переменные для шаблона        $this->title .= 'Главная'; // заголовок        $greetings = 'Здравствуйте!';        $order_value = ''; // переменная для подстановки параметра сортировки        // Выводим на кнопку значение сортировки        $nav_title_sort_user_name = 'Задачи по имени пользователя (a-z↓)';        $nav_title_sort_date = 'Задачи по сроку выполнения (→)';        $nav_title_sort_status = 'Задачи по статусу (a-z↓)';        $statusData = getStatusData();// данные таблицы status        $usersData = getUsersData();  // данные таблицы users        // Возможные параметры сортировки:        $sort_user_name = 'user_name';        $sort_date = 'dead_line';        $sort_status = 'status';        // Если есть $_GET['sort'] выполняем сортировку        if (isset($_GET['sort'])) {            switch ($_GET['sort']){                // Сортировка по имени пользователя:                case 'user_name':                    $sort_user_name = '-user_name'; // Передаём Get-параметр в ссылку                    $order_value = 'user_name'; // Передаём в sql-запрос парарметр для сортировки                    $order = 'ASC';             // Указываем порядок сортировки                    $nav_title_sort_user_name = 'Задачи по имени пользователя (z-a↓)'; // Отображаем порядок сортировки на кнопке                    break;                case '-user_name';                    $sort_user_name = 'user_name'; // Передаём Get-параметр в ссылку                    $order_value = 'user_name'; // Передаём в sql-запрос парарметр для сортировки                    $order = 'DESC'; // Указываем порядок сортировки                    $nav_title_sort_user_name = 'Задачи по имени пользователя (a-z↓)';// Отображаем порядок сортировки на кнопке                    break;                // Сортировка по сроку выполнения:                case 'dead_line':                    $sort_date = '-dead_line'; // Передаём Get-параметр в ссылку                    $order_value = 'dead_line'; // Передаём в sql-запрос парарметр для сортировки                    $order = 'ASC';             // Указываем порядок сортировки                    $nav_title_sort_date = 'Задачи по сроку выполнения (←)'; // Отображаем порядок сортировки на кнопке                    break;                case '-dead_line';                    $sort_date = 'dead_line'; // Передаём Get-параметр в ссылку                    $order_value = 'dead_line'; // Передаём в sql-запрос парарметр для сортировки                    $order = 'DESC'; // Указываем порядок сортировки                    $nav_title_sort_date = 'Задачи по сроку выполнения (→)';// Отображаем порядок сортировки на кнопке                    break;                // Сортировка по статусу:                case 'status':                    $sort_status = '-status'; // Передаём Get-параметр в ссылку                    $order_value = 'status'; // Передаём в sql-запрос парарметр для сортировки                    $order = 'ASC';             // Указываем порядок сортировки                    $nav_title_sort_status = 'Задачи по статусу (z-a↓)'; // Отображаем порядок сортировки на кнопке                    break;                case '-status';                    $sort_status = 'status'; // Передаём Get-параметр в ссылку                    $order_value = 'status'; // Передаём в sql-запрос парарметр для сортировки                    $order = 'DESC'; // Указываем порядок сортировки                    $nav_title_sort_status = 'Задачи по статусу (a-z↓)';// Отображаем порядок сортировки на кнопке                    break;            }        }        // Пагинация:        $tasksCount = getTasksCount(); //получаем количесвто задач        // Если JS не отключён, выводим на страницу все задачи, для работы с ними через JS        if ($_SESSION['JS_CHECKED'] == '1') {            $results_per_page = $tasksCount;        }else{            $results_per_page = 6;  // иначе 6        }        $count_pages = (intdiv($tasksCount, $results_per_page)); //получаем количество страниц с задачами        $count_pages_total = ($tasksCount % $results_per_page ? $count_pages + 1 : $count_pages);        $tasks = getTasks($results_per_page, $order, $order_value); // Массив с задачами        //получаем текущую страницу        if (!isset($_GET['page'])){            $page = 1;        }else{            $page = $_GET['page'];        }        //приветствие        if(isset($_SESSION['user'])) {            $greetings = "Привет, " . $_SESSION['user']['user_name']."!";        }        // Переменные для модального окна задачи        $task_id = 1;        $modal = $this->Template('../views/v_modal.php', array(           'task_id' => $task_id        ));        // помещаем переменные в шаблон		$this->content = $this->Template('../views/v_index.php', array(		    'greetings' => $greetings,		    'sort_user_name' => $sort_user_name,            'nav_title_sort_user_name' => $nav_title_sort_user_name,            'nav_title_sort_status' => $nav_title_sort_status,            'nav_title_sort_date' => $nav_title_sort_date,            'sort_date' => $sort_date,            'sort_status' => $sort_status,		    'page' => $page,            'results_per_page' => $results_per_page,		    'tasksCount' => $tasksCount,		    'count_pages' => $count_pages_total,            'statusData' => $statusData,            'usersData' => $usersData,		    'tasks' => $tasks,            'order' => $order,            'page' => $page,            'modal' => $modal,            ));	}	// страница для создания или редактирования задачи    public function action_create(){            $create_or_update = 'Создайте задачу';            $usersData = getUsersData();            $task_name = '';            $task_description = '';            // если есть id_task, задача редактируется            if (isset($_GET['id_task'])){                $create_or_update = 'Редактирование задачи';                if (isset($_GET['id_task'])) {                    // получаем информацию о задаче по её id                    $task_data = getTask($_GET['id_task']);                    $task_data_item = $task_data['0'];                    $task_id = $task_data_item['task_id'];                    $task_name = $task_data_item['task_name'];                    $task_description = $task_data_item['description'];                    $user_name = $task_data_item['user_name'];                    $user_login = $task_data_item['login'];                    $status_name = $task_data_item['status_name'];                    $status_id = $task_data['status_id'];                    $created_at = $task_data_item['created_at'];                    $dead_line = $task_data_item['dead_line'];                }            }            $this->title .= $create_or_update;        if($this->isPost()){            $task_id = $_POST['id_task'];            $task_name = $_POST['task_name'];            $task_description = clean($_POST['description']);            $id_user = $_POST['name'];            $date = $_POST['date'];            $time = $_POST['time'];            $dead_line = $date . " " . $time;            // если задача редактируется, дату оставляем прежней            if (empty($_POST['date']) || empty($_POST['time'])) {                $dead_line = $_POST['dead_line'];            }            // если не ввели время или дату, просим ввести            if (empty($dead_line) || strlen($dead_line) < 10) {                $response = 'Введите время и дату';            }else{            // добавляем или редактируем задачу            $response = setTask($task_id, $task_name, $task_description, $id_user, $dead_line);            }            if ($response == 'Задача добавлена') {                $task_id = getLastInsertedTaskId();                header("location: index.php?c=page&act=one&id_task=" . $task_id);            }        }        $this->content = $this->Template('../views/v_create.php',            array(                'create_or_update' => $create_or_update,                'usersData' => $usersData,                'response' => $response,                'date' => $date,                'time' => $time,                'task_id' => $task_id,                'task_name' => $task_name,                'task_description' => $task_description,                'status_name' => $status_name,                'user_name' => $user_name,                'created_at' => $created_at,                'dead_line' => $dead_line,                ));    }    // страница задачи    public function action_one(){        $this->title .= 'Карточка задачи';        if (isset($_GET['id_task'])){            $task_data = getTask($_GET['id_task']);            $task_data_item = $task_data['0'];            $task_id = $task_data_item['task_id'];            $task_name = $task_data_item['task_name'];            $task_description = $task_data_item['description'];            $user_name = $task_data_item['user_name'];            $user_login = $task_data_item['login'];            $id_status = $task_data_item['id_status'];            $status_name = $task_data_item['status_name'];            $created_at = $task_data_item['created_at'];            $dead_line = $task_data_item['dead_line'];            // информация о том, что задача выполнена            if ($_GET['completed'] == 'on'){                if(completedTask($task_id)){                    $id_status = 1;                }            }            // удаление задачи            if (isset($_GET['delete']) && $_GET['delete'] == 'on'){                $response = deleteTask($task_id);                header('location: index.php');            }        }        // попадаем на карточку отредактированной задачи        if($this->isPost())        {            if (isset($_POST['id_task'])){                $task_data = getTask($_POST['id_task']);                $task_id = $task_data['0']['task_id'];                $user_name = $task_data['0']['user_name'];                $user_login = $task_data['0']['login'];                //$status_name = $task_data['0']['status_name'];                $id_status = $task_data['0']['id_status'];                $task_name = $_POST['task_name'];                $task_description = clean($_POST['description']);                if (!isset($_POST['completed'])) {                    $response = setTask($task_id, $task_name, $task_description, null, null);                }                header("location: /?act=one&id_task=$task_id");            }        }        $this->content = $this->Template('../views/v_task_item.php', array(                'task_id' => $task_id,                'task_name' => $task_name,                'task_description' => $task_description,                'status_name' => $status_name,                'id_status' => $id_status,                'user_login' => $user_login,                'user_name' => $user_name,                'created_at' => $created_at,                'dead_line' => $dead_line,        ));    }    public function action_registration(){        $this->title .= 'Регистрация';        $response = "";        if ($this->isPost()){            $user_name = $_POST['name'];            $user_login = $_POST['login'];            $user_email = $_POST['email'];        }        // валидация для email Оставим для регистрации пользователя        if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {            $response = 'email указан неверно!';        }        else if(!empty($_POST['name']) && !empty($_POST['login']) &&            !empty($_POST['password']) && !empty($_POST['email'])            && checkExistedLogin()){            $response = "Пользователь с таким логином уже существует";        }        else if (!empty($_POST['name']) && !empty($_POST['login']) &&            !empty($_POST['password']) && !empty($_POST['email'])){            $response = setUser();            header("location: /?res=registered");        }        else if (!empty($_POST['name'])){            $response = "Вы заполнили не все поля";        }        $this->content = $this->Template('../views/v_registration.php',            array(                'user_name' => $user_name,                'user_login' => $user_login,                'user_email' => $user_email,                'response' => $response            ));    }    // страница авторизации    public function action_auth()    {   $this->title .= 'Вход';        // если уже залогинен, то выбрасываем на главную        if(alreadyLoggedIn()){            header("Location: /");        }        // если есть куки, то авторизуем сразу        if(checkAuthWithCookie()){            header("Location: /");        }        // иначе пробуем авторизовать по логину и паролю        else{            $autherror = '';            if ($this->isPost()) {                if (empty($_POST['login']) || empty($_POST['password'])) {                    $autherror = "Введите логин и пароль";                    unset($_SESSION["user"]);                    session_destroy();                }                if (!authWithCredentials()) {                    $autherror = 'Неправильный логин/пароль';                    unset($_SESSION["user"]);                    session_destroy();                } else {                    header("Location:  /");                }            }        }        $this->content = $this->Template('../views/v_auth.php',            array('autherror' => $autherror));    }    public function action_logout(){        unset($_SESSION["user"]);        session_destroy();        header("Location: /");    }}
<?php////Конттроллер главной страницы.////Импортируем модели и базовый контроллерinclude_once('models/m_tasks.php');include_once('models/m_auth.php');include_once('models/m_users.php');include_once('models/m_status.php');include_once('models/m_validation.php');include_once('C_Base.php');class C_Page extends C_Base{	//	// Конструктор.	//	function __construct(){				parent::__construct();	}	// главная страница	public function action_index(){	    // ответ о добавлении задачи        if (isset($_GET['res']) && $_GET['res'] == 'created'){            $response = 'Задача добавлена';        }elseif (isset($_GET['res']) && $_GET['res'] == 'deleted') {            $response = 'Задача удалена';        }elseif (isset($_GET['res']) && $_GET['res'] == 'registered'){            $response = 'Вы успешно зарегистрированы';        }        //сортировка:        $order = 'DESC'; //порядок вывода данных        $order_icon = 'a-z↓'; //отображение вывода данных        $order_value = ''; //переменная для подстановки параметра        //возможные параметры сортировки:        $sort_user_name = 'user_name';        $sort_email = 'email';        $sort_status = 'status';        //условие для передачи в Get-параметр порядка сортировки        if ($_GET['sort'] == 'user_name'){            $sort_user_name = '-user_name';        }elseif ($_GET['sort'] == 'email'){            $sort_email = '-email';        }elseif ($_GET['sort'] == 'status'){            $sort_status = '-status';        }        //получаем из Get-параметра порядок и параметр сортировки        if (substr($_GET['sort'],0, 1) == '-'){            $order_value = substr($_GET['sort'], 1);            $order = 'DESC';            $order_icon = 'z-a↓';        }elseif (isset($_GET['sort'])){            $order_value = $_GET['sort'];            $order = 'ASC';            $order_icon = 'a-z↓';        }        // передаём изображение вывода данных в ссылку, по которой производится сортировка        $$order_value = $order_icon;        //пагинация:        $tasksCount = getTasksCount(); //получаем количесвто задач        $results_per_page = 3; // количество задач на странице        $count_pages = (intdiv($tasksCount, $results_per_page)); //получаем количество страниц с задачами        $count_pages_total = ($tasksCount % $results_per_page ? $count_pages + 1 : $count_pages);        //получаем текущую страницу        if (!isset($_GET['page'])){            $page = 1;        }else{            $page = $_GET['page'];        }        //определяем переменные для шаблона        $this->title .= ':: Главная'; //заголовок        $statusData = getStatusData();//данные таблицы status	    $usersData = getUsersData();  //данные таблицы users        $tasks = getTasks($results_per_page, $order, $order_value); //массив с задачами        // помещаем переменные в шаблон		$this->content = $this->Template('views/v_index.php', array(		    'sort_user_name' => $sort_user_name,            'sort_email' => $sort_email,            'sort_status' => $sort_status,		    'page' => $page,            'results_per_page' => $results_per_page,		    'tasksCount' => $tasksCount,		    'count_pages' => $count_pages_total,            'statusData' => $statusData,            'usersData' => $usersData,		    'tasks' => $tasks,            "$order_value" => $$order_value,            'order' => $order,            'page' => $page,            'response' => $response            ));	}	// страница для создания задачи    public function action_create(){            $this->title .= '::Создайте задачу';            $usersData = getUsersData();            $task_name = 'Название задачи';            $task_description = 'Описание задачи';        if($this->isPost()){            $task_id = $_POST['id_task'];            $task_name = $_POST['task_name'];            $task_description = clean($_POST['description']);            $id_user = $_POST['name'];            $date = $_POST['date'];            $time = $_POST['time'];            $dead_line = $date . " " . $time;            if (empty($_POST['date']) || empty($_POST['time'])){                $response = 'Введите время и дату';            }else {                $response = setTask($task_id, $task_name, $task_description, $id_user,                    $dead_line);            }            if ($response == 'Задача добавлена') {                header('location: index.php?res=created');            }        }        $this->content = $this->Template('views/v_create.php',            array(                'usersData' => $usersData,                'response' => $response,                'task_name' => $task_name,                'task_description' => $task_description,                'date' => $date,                'time' => $time                ));    }    // страница для редактирования задачи администратором    public function action_one(){        $this->title .= '::Карточка задачи';        if (isset($_GET['id_task'])){            $task_data = getTask($_GET['id_task']);            $task_id = $task_data['0']['task_id'];            $task_name = $task_data['0']['task_name'];            $task_description = $task_data['0']['description'];            $user_name = $task_data['0']['user_name'];            $user_login = $task_data['0']['login'];            $status_name = $task_data['0']['status_name'];            if ($_GET['res'] == 'edited'){                $response = 'Задача отредактирована';            }            if (isset($_GET['delete']) && $_GET['delete'] == 'on'){                $response = deleteTask($task_id);                header('location: index.php?res=deleted');            }        }        if($this->isPost())        {            // если администратор поставил галочку о выполнении задания            if (isset($_POST['completed']) && $_POST['completed'] == 'on'){                completedTask($_POST['id_task']);            }            if (isset($_POST['id_task'])){                $task_data = getTask($_POST['id_task']);                $task_id = $task_data['0']['task_id'];                $user_name = $task_data['0']['user_name'];                $user_login = $task_data['0']['login'];                $status_name = $task_data['0']['status_name'];                $task_name = $_POST['task_name'];                $task_description = clean($_POST['description']);                $response = setTask($task_id, $task_name, $task_description, null);                header("location: /?act=one&id_task=$task_id&res=edited");            }        }        $this->content = $this->Template('views/v_task_item.php', array(                'task_id' => $task_id,                'task_name' => $task_name,                'task_description' => $task_description,                'status_name' => $status_name,                'user_login' => $user_login,                'user_name' => $user_name,                'response' => $response        ));    }    public function action_registration(){        $this->title .= '::Регистрация';        $response = "";        if ($this->isPost()){            $user_name = $_POST['name'];            $user_login = $_POST['login'];            $user_email = $_POST['email'];        }        //валидация для email Оставим для регистрации пользователя        if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {            $response = 'email указан неверно!';        }        else if(!empty($_POST['name']) && !empty($_POST['login']) &&            !empty($_POST['password']) && !empty($_POST['email'])            && checkExistedLogin()){            $response = "Пользователь с таким логином уже существует";        }        else if (!empty($_POST['name']) && !empty($_POST['login']) &&            !empty($_POST['password']) && !empty($_POST['email'])){            $response = setUser();            header("location: /?res=registered");        }        else if (!empty($_POST['name'])){            $response = "Вы заполнили не все поля";        }        $this->content = $this->Template('views/v_registration.php',            array(                'user_name' => $user_name,                'user_login' => $user_login,                'user_email' => $user_email,                'response' => $response            ));    }    // страница авторизации    public function action_auth()    {   $this->title .= '::Вход';        // если уже залогинен, то выбрасываем на главную        if(alreadyLoggedIn()){            header("Location: /");        }        // если есть куки, то авторизуем сразу        if(checkAuthWithCookie()){            header("Location: /");        }        // иначе пробуем авторизовать по логину и паролю        else{            $autherror = '';            if ($this->isPost()) {                if (empty($_POST['login']) || empty($_POST['password'])) {                    $autherror = "Введите логин и пароль";                    unset($_SESSION["user"]);                    session_destroy();                }                if (!authWithCredentials()) {                    $autherror = 'Неправильный логин/пароль';                    unset($_SESSION["user"]);                    session_destroy();                } else {                    header("Location: /");                }            }        }        $this->content = $this->Template('views/v_auth.php',            array('autherror' => $autherror));    }    public function action_logout(){        unset($_SESSION["user"]);        session_destroy();        header("Location: /");    }}
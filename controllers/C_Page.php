<?php////Конттроллер главной страницы.////Импортируем модели и базовый контроллерinclude_once('models/m_tasks.php');include_once('models/m_auth.php');include_once('models/m_users.php');include_once('models/m_status.php');include_once('models/m_validation.php');include_once('C_Base.php');class C_Page extends C_Base{	//	// Конструктор.	//	function __construct(){				parent::__construct();	}	// главная страница	public function action_index(){	    // ответ о добавлении задачи        $response = (isset($_GET['res']) && $_GET['res'] == 'created')            ? 'Задача добавлена' : null;	    // если администратор поставил галочку о выполнении задания        if (isset($_POST['completed']) && $_POST['completed'] == 'on'){            $completed_task = completedTask($_POST['id_task']);        }        //сортировка:        $order = 'ASC'; //порядок вывода данных        $order_icon = 'a-z↓'; //отображение вывода данных        $order_value = ''; //переменная для подстановки параметра        //возможные параметры сортировки:        $sort_user_name = 'user_name';        $sort_email = 'email';        $sort_status = 'status';        //условие для передачи в Get-параметр порядка сортировки        if ($_GET['sort'] == 'user_name'){            $sort_user_name = '-user_name';        }elseif ($_GET['sort'] == 'email'){            $sort_email = '-email';        }elseif ($_GET['sort'] == 'status'){            $sort_status = '-status';        }        //получаем из Get-параметра порядок и параметр сортировки        if (substr($_GET['sort'],0, 1) == '-'){            $order_value = substr($_GET['sort'], 1);            $order = 'DESC';            $order_icon = 'z-a↓';        }elseif (isset($_GET['sort'])){            $order_value = $_GET['sort'];            $order = 'ASC';            $order_icon = 'a-z↓';        }        // передаём изображение вывода данных в ссылку, по которой производится сортировка        $$order_value = $order_icon;        //пагинация:        $tasksCount = getTasksCount(); //получаем количесвто задач        $results_per_page = 3; // количество задач на странице        $count_pages = (intdiv($tasksCount, $results_per_page)); //получаем количество страниц с задачами        $count_pages_total = ($tasksCount % $results_per_page ? $count_pages + 1 : $count_pages);        //получаем текущую страницу        if (!isset($_GET['page'])){            $page = 1;        }else{            $page = $_GET['page'];        }        //определяем переменные для шаблона        $this->title .= ':: Главная'; //заголовок        $statusData = getStatusData();//данные таблицы status	    $usersData = getUsersData();  //данные таблицы users        $tasks = getTasks($results_per_page, $order, $order_value); //массив с задачами        // помещаем переменные в шаблон		$this->content = $this->Template('views/v_index.php', array(		    'sort_user_name' => $sort_user_name,            'sort_email' => $sort_email,            'sort_status' => $sort_status,		    'page' => $page,            'results_per_page' => $results_per_page,		    'tasksCount' => $tasksCount,		    'count_pages' => $count_pages_total,            'statusData' => $statusData,            'usersData' => $usersData,		    'tasks' => $tasks,            "$order_value" => $$order_value,            'order' => $order,            'page' => $page,            'response' => $response            ));	}	// страница для создания задачи    public function action_create(){            $this->title .= '::Создайте задачу';            $usersData = getUsersData();        if($this->isPost()){            $task_id = $_POST['id_task'];            $task_description = clean($_POST['description']);            $id_user = $_POST['name'];            $response = setTask($task_id, $task_description, $id_user);            header('location: index.php?res=created');            //валидация для email Оставим для регистрации пользователя            /*if (filter_var($email, FILTER_VALIDATE_EMAIL)) {                $response = setTask($task_id, $task_description, $email);            }else{                $response = 'email указан неверно!';            }*/        }        $this->content = $this->Template('views/v_task.php',            array(                'usersData' => $usersData,                'response' => $response,                ));    }    // страница для редактирования задачи администратором    public function action_edit(){        $this->title .= '::Редактирование';        // данные задачи        $task_data = getTask($_GET['id_task']);        $task_id = $task_data['0']['id'];        $task_description = $task_data['0']['description'];        // данные пользователя        $id_user = $task_data['0']['id_user'];        $user_data = getUser($id_user);        $user_name = $user_data['0']['name'];        $user_email = $user_data['0']['email'];        if($this->isPost())        {            $task_id = $_POST['id_task'];            $task_description = clean($_POST['description']);            $response = setTask($task_id, $task_description, null);            //header('location: index.php');            //exit();        }        $this->content = $this->Template('views/v_edit.php', array(                'task_id' => $task_id,                'user_name' => $user_name,                'user_email' => $user_email,                'task_description' => $task_description,                'response' => $response        ));    }    // страница авторизации    public function action_auth()    {        if ($_SERVER['REQUEST_METHOD'] == 'POST'){            if(!authWithCredentials()){                $autherror = 'Неправильный логин/пароль';                unset($_SESSION["user"]);                session_destroy();            }            else{                header("Location: /");            }        }        $this->content = $this->Template('views/v_auth.php',            array('autherror' => $autherror));    }    public function action_logout(){        unset($_SESSION["user"]);        session_destroy();        header("Location: /");    }}
<?php// Класс контроллераinclude_once('Controller.php');//// Базовый контроллер сайта.//abstract class C_Base extends Controller{	protected $title;		// заголовок страницы	protected $content;		// содержание страницы    protected $login;       // вход/выход    protected $auth;        // Get-параметр для входа/выхода    protected $reg;         // регистрация    protected $active_href;      // пометка активной ссылки в главном меню	//	// Конструктор.	//	function __construct()	{	    $this->title = 'Задачник';        $this->login = 'Войти';        $this->auth = 'auth';        $this->reg = 'Регистрация';        $this->content = '';        $this->active_href = (isset($_GET['act'])) ? $_GET['act'] . '_active' : 'index_active ';        if(isset($_SESSION['user'])){            $this->auth = 'logout';            $this->login = 'Выйти';        }	}		//	// Генерация базового шаблонаы	//		public function render()	{		$vars = array(		    "$this->active_href" => 'active',		    'title' => $this->title,            'login' => $this->login,            'auth' => $this->auth,            'reg' => $this->reg,            'content' => $this->content,        );		$page = $this->Template('views/v_main.php', $vars);		echo $page;	}	}
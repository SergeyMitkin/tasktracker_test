<?php/** * Шаблон главной страницы * ======================= * $text - текст */?><html><head>    <meta charset="utf-8" /></head><body>    <p class="red"><?=$response?></p>    <form method="post">		<p>Как Вас зовут<input type="text" name="name" /></p>        <p>Введите логин<input type="text" name="login" /></p>        <p>Введите email<input type="text" name="email" /></p>        <p>Введите пароль<input type="password" name="password" /></p>		<p><input type="submit" value="Зарегистрироваться" /></p>    </form></body></html>
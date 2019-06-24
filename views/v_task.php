<?php
/**
 * Шаблон главной страницы
 * =======================
 * $text - текст
 */
?>
<?=$response?>
<h3>Создайте задачу</h3>
<form method="post" action = '?act=create' /> Выберете ответсвенного
    <select name="name">
    <?php
    foreach($usersData as $name) {
    echo '<option value="' . $name['id'] . '">' . $name['name'] . '</option>';
    }
    ?>
    </select>
<p><input type="text" name="description" value="Текст задачи"></p>
<p><input type="text" name="email" value="email"></p>
<p><input type="submit" value="Отправить"/></p>
</form>

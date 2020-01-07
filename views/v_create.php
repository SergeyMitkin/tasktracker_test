<?php
/**
 * Шаблон главной страницы
 * =======================
 * $text - текст
 */
?>
<?=$response?>
<h3>Создайте задачу</h3>

<form method="post" action ='?act=create'/> Выберете ответсвенного
    <select name="name">
    <?php
    foreach($usersData as $name) {
    echo '<option value="' . $name['user_id'] . '">' . $name['user_name'] . '</option>';
    }
    ?>
    </select>

    <p><input type="text" name="task_name" value="<?=$task_name?>"></p>
    <p><input type="text" name="description" value="<?=$task_description?>"></p>

    <p>
        <label for="date">Срок выполнения: </label>
        <input type="date" id="date" name="date" value="<?=$date?>"/>
    </p>

    <p>
        <label for="time">Время: </label>
        <input type="time" id="time" name="time" value="<?=$time?>"/>
    </p>

    <p><input type="submit" value="Отправить"/></p>
</form>

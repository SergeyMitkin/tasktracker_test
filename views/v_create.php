<?php
/**
 * Шаблон главной страницы
 * =======================
 * $text - текст
 */
?>
<?=$response?>

<form method="post" action ='?act=create'/> Выберете ответсвенного
    <select name="name">
    <?php
    foreach($usersData as $name) {
    echo '<option value="' . $name['user_id'] . '">' . $name['user_name'] . '</option>';
    }
    ?>
    </select>

    <br><br>
    <label for="task_name">Введите название задачи </label>
    <input type="text" id="task_name" name="task_name" value="<?=$task_name?>" placeholder="Название задачи">

    <br><br>
    <label for="description">Введите описание задачи </label>
    <input type="text" name="description" value="<?=$task_description?>" placeholder="Описание задачи">

    <br><br>
    <label for="date">Срок выполнения: </label>
    <input type="date" id="date" name="date" value="<?=$date?>"/>

    <br><br>
    <label for="time">Время: </label>
    <input type="time" id="time" name="time" value="<?=$time?>"/>

    <br><br>
    <input type="submit" value="Отправить"/>
</form>

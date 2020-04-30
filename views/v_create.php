<?php
/**
 * Шаблон главной страницы
 * =======================
 * $text - текст
 */
?>

<div class="create-container">
    <?=$response?>

    <form method="post" action ='?act=create'/>
        <h1><?=$create_or_update?></h1>

            <?
            if($_GET['edit'] == 'on'){
                ?>

                <div class="group">
                    <p>Ответственный: <?=$user_name?></p>
                </div>

                <div class="group">
                    <label for="task_name">Название задачи </label>
                    <input type="text" id="task_name" name="task_name" value="<?=$task_name?>" placeholder="Название задачи">
                </div>

                <div class="group">
                    <label for="description">Описание задачи </label>
                    <textarea name="description" value="<?=$task_description?>" placeholder="Описание задачи"><?=$task_description?></textarea>
                </div>

                <div class="group">
                    <p>Срок выполнения: <?=$dead_line?></p>
                    <input type="hidden" id="dead_line" name="dead_line" value="<?=$dead_line?>">
                </div>

            <?}else{?>

                <div class="group">
                    <label for="name">Выберете ответсвенного</label>
                    <select id="name" name="name">
                    <?php
                    foreach($usersData as $name) {
                    echo '<option value="' . $name['user_id'] . '">' . $name['user_name'] . '</option>';
                    }
                    ?>
                    </select>
                </div>

                <div class="group">
                    <label for="task_name">Введите название задачи </label>
                    <input type="text" id="task_name" name="task_name" value="<?=$task_name?>" placeholder="Название задачи">
                </div>

                <div class="group">
                    <label for="description">Введите описание задачи </label>
                    <textarea id="description" name="description" value="<?=$task_description?>" placeholder="Описание задачи"></textarea>
                    <div id="charactersLeft">180 символов</div>
                </div>

                <div class="group">
                    <label for="date">Срок выполнения: </label>
                    <input type="date" id="date" name="date" value="<?=$date?>"/>
                </div>

                <div class="group">
                    <label for="time">Время: </label>
                    <input type="time" id="time" name="time" value="<?=$time?>"/>
                </div>
            <?}?>
        <div class="group" align="center">
            <button class="btn btn-light">Отправить</button>
        </div>
    </form>
</div>
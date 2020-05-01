<script>
    var sessionUserLogin = "<?php echo $_SESSION['user']['login']; ?>";
</script>
<div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="taskModal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title card-title" id="taskModalLabel"></h1>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p id="modal-task-description" class="task_description"></p>

                <p id="modal-task-user"></p>

                <div class="row text-center">
                    <p class="col-6">создана:
                        <em id="modal-task-created-date"></em>
                    </p>
                    <p class="col-6">срок выполнения:
                        <em id="modal-task-dead-line"></em>
                    </p>
                </div>

                <p id="modal-task-status"></p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button class="btn btn-primary">Save</button>



                <?
        // кнопка удаления задачи
           // if ($_SESSION['user']['login'] == 'admin' || $_SESSION['user']['login'] == "$user_login"){
            //?>
            <a class="btn btn-danger" id="delete" href="?act=one&delete=on&id_task=<?=$task_id?>" role="button">Удалить</a>
        <?//}?>
            </div>
        </div>
    </div>
</div>


<!--
                <form id="modal-login">
                    <div class="two-thirds column" id="modal-main">
                        <legend>Авторизация</legend>
                        <label for="modal-username">Логин:</label>
                        <input type="text" id="modal-username" name="modal-username"/>
                        <label for="modal-pwd">Пароль:</label>
                        <input type="password" id="modal-pwd" name="pwd-username"/>
                        <input type="submit" value="Войти">
                    </div>
                </form>
                -->


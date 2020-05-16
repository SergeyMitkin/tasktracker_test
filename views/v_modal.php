<script>
    <?if (isset($_SESSION['user']['login'])){;?>
    var sessionUserLogin = "<?php echo $_SESSION['user']['login']; ?>";
    <?}
    ?>
</script>
<div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="taskModal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">

                <h1 class="modal-title card-title" id="task_modal_title"></h1>

                <form class="edit-form" id="edit-task_modal_title-form" hidden>
                    <div class="group">
                        <label for="task_modal_title-input">Название задачи </label>
                        <input type="text" id="task_modal_title-input" name="task_name" placeholder="Название задачи">
                    </div>

                    <input id="hidden-title" class="hidden-title-id" name="hidden_title" type="hidden">

                    <div class="group" align="center">
                        <button id="edit-title-post" class="btn btn-outline-light">Отправить</button>
                    </div>
                </form>

                <button class="btn btn-outline-light edit-button edit-text-button" id="edit-task_modal_title-button" hidden>Изменить</button>

                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <p id="task_modal_description" class="task_description"></p>

                <form class="edit-form" id="edit-task_modal_description-form" hidden>
                    <div class="group">
                        <label for="task_modal_description-input">Описание задачи </label>
                        <input type="text" id="task_modal_description-input" name="task_description">
                    </div>

                    <input id="hidden-description" class="hidden-title-id" name="hidden_description" type="hidden">

                    <div class="group" align="center">
                        <button id="edit-description-post" class="btn btn-outline-light">Отправить</button>
                    </div>
                </form>

                <button class="btn btn-outline-light edit-button edit-text-button" id="edit-task_modal_description-button" hidden>Изменить</button>

                <!-- Ответственный -->
                <p>Ответственный: <span id="modal-task-user"></span></p>

                <form class="edit-form" id="edit_modal_user" hidden>
                    <div class="group">
                        <label for="task-user-select">Выберете ответственного</label>
                        <select id="task-user-select" name="task-user-select"></select>
                    </div>

                    <input id="hidden-user" class="hidden-title-id" name="hidden_user" type="hidden">
                    <input id="hidden-user-id" name="hidden_user_id" type="hidden">

                    <div class="group" align="center">
                        <button id="edit-user-post" class="btn btn-outline-light">Отправить</button>
                    </div>
                </form>

                <button class="btn btn-outline-light edit-button" id="edit-user-button" hidden>Изменить</button>

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
                <button class="btn btn-primary">Редактировать</button>
                <a class="btn btn-danger edit-button" id="delete_button" href="?act=one&delete=on&id_task=<?=$task_id?>" role="button">Удалить</a>
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


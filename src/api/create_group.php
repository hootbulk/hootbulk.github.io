<?php

if($_POST){

    include_once '../config/core.php';
    include_once '../config/database.php';
    include_once '../objects/group.php';

    $database = new Database();
    $db = $database->getConnection();
    $group = new Group($db);

    $group->user_id = $_POST['user_id'];
    $group->group_name = $_POST['group_name'];
    $group->group_description = $_POST['group_description'];
    $group->group_type = $_POST['group_type'];

    echo $user->create() ? "true" : "false";
}
?>

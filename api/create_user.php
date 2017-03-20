<?php

if($_POST){

    include_once '../config/core.php';
    include_once '../config/database.php';
    include_once '../objects/user.php';

    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    $user->f_name = $_POST['f_name'];
    $user->l_name = $_POST['l_name'];
    $user->email = $_POST['email'];
    $user->password = $_POST['password'];
    $user->dob = $_POST['dob'];
    $user->membership_id = $_POST['membership_id'];

    echo $user->create() ? "true" : "false";
}
?>

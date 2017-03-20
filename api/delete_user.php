<?php
if($_POST){

    include_once '../config/core.php';
    include_once '../config/database.php';
    include_once '../objects/user.php';

    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    $ins="";
    foreach($_POST['del_ids'] as $id){
        $ins.="{$id},";
    }

    $ins=trim($ins, ",");

    echo $user->delete($ins) ? "true" : "false";
}
?>

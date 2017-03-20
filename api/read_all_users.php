<?php
  include_once '../config/core.php';
  include_once '../config/database.php';
  include_once '../objects/user.php';

  $database = new Database();
  $db = $database->getConnection();
  $user = new User($db);

  $results=$user->readAll();

  echo $results;
?>
<?php
  include_once '../config/core.php';
  include_once '../config/database.php';
  include_once '../objects/group.php';

  $database = new Database();
  $db = $database->getConnection();
  $group = new Group($db);

  $results=$group->readAll();

  echo $results;
?>

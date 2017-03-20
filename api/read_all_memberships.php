<?php
  include_once '../config/core.php';
  include_once '../config/database.php';
  include_once '../objects/membership.php';

  $database = new Database();
  $db = $database->getConnection();
  $membership = new Membership($db);

  $results=$membership->readAll();

  echo $results;
?>

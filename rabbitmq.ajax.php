<?php
require_once 'RabbitMqManager.php';

$command = $_POST['command'];
$user    = $_POST['user'];
$message = $_POST['message'];
$manager = new RabbitMqManager();
switch ($command) {
case 'fetch':
  $manager->fetch($user);
  break;
case 'send':
  $manager->send($user, $message);
  break;
default:
  echo '[]';
  break;
}

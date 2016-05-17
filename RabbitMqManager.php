<?php

require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMqManager {
  private $messages;

  public function __construct() {
    $this->messages = array();
  }

  private function connect() {
    return new AMQPStreamConnection('uakk7f3c570e.ajalvesneto.koding.io', 5672, 'guest', 'guest');
  }

  public function send($queue, $message) {
    $connection = $this->connect();
    $channel = $connection->channel();

    if (isset($channel)) {
      $channel->queue_declare($queue, true, false, false);
      $msg = new AMQPMessage($message);
      $channel->basic_publish($msg, '', $queue);
    }

    $channel->close();
    $connection->close();
  }

  public function fetch($queue) {
    $connection = $this->connect();
    $channel = $connection->channel();

    if (isset($channel)) {
      $channel->queue_declare($queue, true, false, false);
      $callback = function($message) {
        call_user_func(array($this, 'appendMessage'), $message);
      };
      $channel->basic_consume($queue, '', false, true, false, false, $callback);

      for ($i = 0; $i < 10; $i++) {
        try {
          $channel->wait(null, false, 1);
        } catch (Exception $e) {
          break;
        }
      }
    }

    $channel->close();
    $connection->close();
    echo '[' . implode($this->messages, ', ') . ']';
  }

  private function appendMessage($message) {
    array_push($this->messages, $message->body);
  }
}

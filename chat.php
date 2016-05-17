<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>RabbitMessenger</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/chat.css">
  </head>
  <body>
    <div class="container-fluid">
      <div id="queues" class="col-xs-3 col-lg-4">
        <div class="bg-primary">
          <span class="glyphicon glyphicon-user"></span>
          <span></span>
        </div>
      </div>
      <div id="message-area" class="col-xs-9 col-lg-8">
        <div id="messages"></div>
        <div id="message-input-area" class="form-inline">
          <textarea id="message-text" class="form-control"></textarea>
          <button id="send" class="btn btn-primary form-control"><span class="glyphicon glyphicon-send"></span></button>
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
    <script src="assets/js/rabbitmessenger.js"></script>
    <script id="user-template" type="text/x-custom-template">
      <div class="user" data-user="{{name}}">
        <span>{{name}}</span><span class="glyphicon glyphicon-envelope"></span>
      </div>
    </script>
    <script id="message-template" type="text/x-custom-template">
      <div class="message-box row">
        <div class="message {{class}}">
          <div class="row">{{content}}</div>
          <div class="row">
            <span class="pull-right">{{date}}</span>
          </div>
        </div>
      </div>
    </script>
  </body>
</html>

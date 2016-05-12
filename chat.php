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
      <div id="queues" class="col-xs-3 col-lg-2"></div>
      <div id="messages" class="col-xs-9 col-lg-10"></div>
    </div>
    <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
    <script src="assets/js/rabbitmessenger.js"></script>
    <script id="user-template" type="text/x-custom-template">
      <div class="user">
        <span class="glyphicon glyphicon-user"> {{name}}</span>
      </div>
    </script>
  </body>
</html>

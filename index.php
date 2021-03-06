<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>RabbitMessenger</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/rabbitmessenger.css">
  </head>
  <body class="php">
    <div class="container">
      <div class="background"></div>
      <div class="login-panel">
        <div class="col-sm-4 col-sm-offset-2 col-md-3 col-md-offset-2">
          <div class="account-wall text-center">
            <img class="img-responsive" src="assets/img/logo_login.jpg" alt="">
            <div class="form-horizontal">
              <div class="form-group">
                <input id="user" name="user" type="email" class="form-control" placeholder="Email" required autofocus>
              </div>
              <div class="form-group">
                <button id="login" class="btn btn-lg btn-primary btn-block" type="button">
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alert-danger hidden">Usuário inexistente.</div>
  <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
    <script>
      var login = function() {
        var userField = $("#user");
        var user = userField.val();
        var users = [
          "railan@rabbitmessenger.com.br"
        , "eric@rabbitmessenger.com.br"
        , "tarcisio@rabbitmessenger.com.br"
        , "saulo@rabbitmessenger.com.br"
        , "tonny@rabbitmessenger.com.br"
        ];
        if (users.indexOf(user) >= 0) {
          localStorage.currentUser = user;
          window.location = "chat.php";
        } else {
          userField.closest(".form-group").addClass("has-error");
          $(".alert-danger").removeClass("hidden");
        }
      };
      $("#login").click(login);
      $(document).keypress(function(e) {
        if (e.which == 13) {
          login();
        }
      });
    </script>
  </body>
</html>


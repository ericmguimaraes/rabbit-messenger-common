var RabbitMessenger = (function() {
  var messages = {};
  var activeTimeout = null;

  function ajax(apiFunction, callback, method) {
    if (method == null) {
      method = 'GET';
    }
    $.ajax({
      url: 'http://uakk7f3c570e.ajalvesneto.koding.io:15672/api/' + apiFunction,
      method: method,
      dataType: 'json',
      username: 'web',
      password: 'web'
    }).done(function(queues, rt, response) {
      if (response.status == 200 && callback != null) {
        callback(queues);
      }
    });
  }

  function renderQueues(rmq_queues) {
    var userTemplate = $("#user-template").html();
    rmq_queues.map(function(q) {
      var queues = $("#queues");
      queues.append(userTemplate.replace("{{name}}", q.name));
    });
  }

  function load() {
    ajax("queues", renderQueues)
  }


  return {
    ajax: ajax
  , renderQueues: renderQueues
  , load: load
  };
})();



var RabbitMessenger = (function() {
  var messages = {};
  var activeTimeout = null;

  function openConversation(queueName) {
    createNewTimeout(queueName);
  }

  function renderQueues(rmq_queues) {
    var userTemplate = $("#user-template").html();
    rmq_queues.map(function(q) {
      var queues = $("#queues");
      queues.append(userTemplate.replace("{{name}}", q.name));
    });
  }

  function load() {
  }


  return { render: renderQueues };
})();



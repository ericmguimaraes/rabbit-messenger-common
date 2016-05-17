var RabbitMessenger = (function() {
  var messageList = {};
  var currentUser = "saulo@rabbitmessenger.com.br";
  var currentConversation = null;
  var users = [
    "railan@rabbitmessenger.com.br"
  , "eric@rabbitmessenger.com.br"
  , "tarcisio@rabbitmessenger.com.br"
  , "saulo@rabbitmessenger.com.br"
  , "tonny@rabbitmessenger.com.br"
  ];

  function dumpMessages() {
    localStorage.messageList = JSON.stringify(messageList);
  }

  function restoreMessages() {
    if (localStorage.messageList) {
      messageList = JSON.parse(localStorage.messageList);
    } else {
      messageList = {};
    }
  }

  function receiveMessage(message) {
    var message = classifyMessage(message);
    var queue;
    if (message.class == "ours") {
      queue = message.receiver;
    } else {
      queue = message.sender;
    }
    if (messageList[queue] == null) {
      messageList[queue] = [];
    }
    messageList[queue].push(message);
    if (queue == currentConversation) {
      appendMessage(message);
    }
  }

  function classifyMessage(message) {
    message.class = message.sender == currentUser ? "ours" : "theirs";
    return message;
  }

  function ajax(data, callback) {
    $.ajax({
      url: "rabbitmq.ajax.php",
      method: "POST",
      dataType: "json",
      data: data
    }).done(function(data, rt, response) {
      if (response.status == 200 && callback != null) {
        callback(data);
      }
    });
  }

  function renderTemplate(templateId, data, $appendTo) {
    if (templateId == null || data == null) {
      return;
    }
    var template = document.getElementById(templateId).innerHTML;
    data.map(function(d) {
      var element = template;
      for (key in d) {
        element = element.replace(new RegExp("{{" + key + "}}", "g"), d[key]);
      }
      if ($appendTo != null) {
        $appendTo.append(element);
      }
    });
  }

  function renderQueues() {
    var userTemplate = $("#user-template").html();
    var queues = $("#queues");
    queues.on("click", ".user", function(event){
      changeCurrentConversation(event.currentTarget.children[0].innerHTML);
    });
    users
      //.filter(function(user){ return user != currentUser; })
      .map(function(user) {
      queues.append(userTemplate.replace("{{name}}", user));
    });
  }

  function changeCurrentConversation(user) {
    currentConversation = user;
    var messages = $("#messages");
    messages.html("");
    if (user != null) {
      renderMessages();
    }
  }

  function fetchMessages() {
    ajax({command: "fetch", user: currentUser}, function(data) {
      data.map(receiveMessage);
    });
  }

  var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

  function getCurrentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = monthNames[date.getMonth()];

    return month + " " + day + ", " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  function sendMessage() {
    var messageText = $("#message-text");
    var text = messageText.val();
    var message = {
      "content": text
    , "date": getCurrentDate()
    , "read": false
    , "sender": currentUser
    , "receiver": currentConversation
    };
    receiveMessage(message);
    messageText.val("");
    ajax({"command": "send", "user": message.receiver, "message": JSON.stringify(message)});
  }

  function appendMessage(message) {
    renderTemplate("message-template", [message], $("#messages"))
  }

  function renderMessages() {
    $("#messages").html("");
    renderTemplate("message-template", messageList[currentConversation], $("#messages"))
  }

  function load() {
    renderQueues();
    $("#send").on("click", sendMessage);
    window.setInterval(fetchMessages, 1000);
  }

  return {
    ajax: ajax
  , renderQueues: renderQueues
  , renderMessages: renderMessages
  , load: load
  , dumpMessages: dumpMessages
  , restoreMessages: restoreMessages
  , clear: function() {
      messageList = {};
      delete localStorage.messageList;
    }
  };
})();

$(function() {
  RabbitMessenger.restoreMessages();
  RabbitMessenger.load();
  $(window).unload(RabbitMessenger.dumpMessages);
});


var RabbitMessenger = (function() {
  var messageList = {};
  var currentUser = localStorage.currentUser;
  var currentConversation = null;
  var users = [
    "railan@rabbitmessenger.com.br"
  , "eric@rabbitmessenger.com.br"
  , "tarcisio@rabbitmessenger.com.br"
  , "saulo@rabbitmessenger.com.br"
  , "tonny@rabbitmessenger.com.br"
  ];

  function logout() {
    currentUser = null;
    delete localStorage.currentUser;
    window.location = "index.php";
  }

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
    if (messageList[currentUser] == null) {
      messageList[currentUser] = {};
    }

    if (messageList[currentUser][queue] == null) {
      messageList[currentUser][queue] = [];
    }
    messageList[currentUser][queue].push(message);
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
      messages.addClass("talking");
    } else {
      messages.removeClass("talking");
    }
  }

  function scrollToBottom() {
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
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
    var text = messageText.val().trim();
    if (text == "") {
      messageText.val("");
      return;
    }
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
    if (messageList[currentUser] == null) {
      messageList[currentUser] = {};
    }

    if (messageList[currentUser][currentConversation] == null) {
      messageList[currentUser][currentConversation] = [];
    }
    renderTemplate("message-template", messageList[currentUser][currentConversation], $("#messages"))
  }

  function load() {
    renderQueues();
    $("#message-text").keypress(function(e) {
      if (e.which == 13) {
        sendMessage();
      }
    });
    $("#send").on("click", sendMessage);
    window.setInterval(fetchMessages, 5000);
  }

  return {
    load: load
  , dumpMessages: dumpMessages
  , restoreMessages: restoreMessages
  , clear: function() {
      messageList = {};
      delete localStorage.messageList;
    }
  , unselect: function() {
      changeCurrentConversation(null);
    }
  , logout: logout
  };
})();

$(function() {
  RabbitMessenger.restoreMessages();
  RabbitMessenger.load();
  $(window).unload(RabbitMessenger.dumpMessages);
  $(window).keyup(function(e) {
    if (e.which == 27) {
      RabbitMessenger.unselect();
    }
  });
});


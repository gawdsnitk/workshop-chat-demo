var textInput = document.querySelector('#text');
var postButton = document.querySelector('#post');
var chatPanel = document.querySelector('#chat-panel');
var headingName = document.querySelector('#headingname');
var chatContainer = document.querySelector('#chat-container');

function verifymsg(text) {
    if (text === "") return false;
    return true;
}


postButton.addEventListener("click", function () {
    var msgUser = localStorage.getItem('chatuser');
    var msgText = textInput.value;
    if (verifymsg(msgText)) {
        msgList.push({ username: msgUser, text: msgText });
    }
    textInput.value = "";
});

/** Function to add a data listener **/
var startListening = function () {
    msgList.on('child_added', function (snapshot) {
        var msg = snapshot.val();
        var msgUsernameElement = document.createElement("b");
        if (msg.username === localStorage.getItem('chatuser'))
            msgUsernameElement.textContent = "you";
        else
            msgUsernameElement.textContent = msg.username;

        var msgTextElement = document.createElement("p");
        msgTextElement.textContent = msg.text;

        var msgElement = document.createElement("div");
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgTextElement);
        if (msg.username === localStorage.getItem('chatuser'))
            msgElement.className = "msg-self";
        else
            msgElement.className = "msg";

        document.getElementById("chat-container").appendChild(msgElement);

        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
}

function intializeChat() {
    if (checkSession()) {
        loginPanel.style.display = "none";
        chatPanel.style.display = "block";
        headingName.innerHTML = localStorage.getItem('chatuser') + "'s Chatroom";
        // Begin listening for data
        startListening();
    }
}

intializeChat();

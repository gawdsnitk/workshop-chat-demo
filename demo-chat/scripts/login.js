var loginPanel = document.querySelector('#login-panel');
var loginNameInput = document.querySelector('#user');
var loginPasswordInput = document.querySelector('#passkey');
var loginButton = document.querySelector('#loginbutton');

var logoutButton = document.querySelector('#logoutbutton');
var headingName = document.querySelector('#headingname');
var chatContainer = document.querySelector('#chat-container');

function checkSession() {
    if (localStorage.getItem("chatuser") === undefined || localStorage.getItem("chatuser") === null || localStorage.getItem("chatuser") === "") return false;
    return true;
}

function loggedIn(usernamelogged) {
    console.log("Hi", usernamelogged);
    localStorage.setItem('chatuser', usernamelogged);
    loginPanel.style.display = "none";
    chatPanel.style.display = "block";
    headingName.innerHTML = usernamelogged + "'s Chatroom";
    startListening();
}

function createNewUser(name, passkey) {
    firebase.database().ref('/users/' + name).set({ name: name, password: passkey });
    loggedIn(name);
}

loginButton.addEventListener("click", function () {
    var name = loginNameInput.value;
    var password = loginPasswordInput.value;
    if (name !== '' && password !== '') {
        return firebase.database().ref('/users/' + name).once('value').then(function (snapshot) {
            if (snapshot.val() === null) {
                var answer = confirm('User does not exist! Do you want to create new user ?');
                if (answer) {
                    createNewUser(name, password);
                }
            } else if (snapshot.val().password == password) {
                loggedIn(snapshot.val().name);
            } else {
                alert('You entered the wrong password!!');
            }
        });
    } else {
        alert('Please fill in your name and password');
    }
});

logoutButton.addEventListener("click", function () {
    localStorage.removeItem("chatuser");
    location.reload(true);
});
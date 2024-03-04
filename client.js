const socket = io("http://localhost:8000");

//get DOM elements in respective JS variables
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".message-box");

//audio will play on receiving messages
var audio = new Audio("chatify_notif.mp3");

//function which will append event info to the conatainer
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

//ask new user for his/her name and let the server know
const username = prompt("Enter your name to join");
socket.emit("new-user-joined", username);

//if new user joins, receive his/her name from the server
socket.on("user-joined", (username) => {
  append(`${username} joined the chat`, "left");
});

//if server sends a message, receive it
socket.on("receive", (data) => {
  append(`${data.username}: ${data.message}`, "left");
});

//if a user leaves the chat, append the info to the container
socket.on("left", (data) => {
  append(`${username} left the chat`, "left");
});

//if the form gets submitted, send server the messages
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`you: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

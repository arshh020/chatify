const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".message-box");

const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);
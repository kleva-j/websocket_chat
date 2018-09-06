(()=>{
  // Make a dom reference to the chat box
  const textArea = document.querySelector('.content');
  const form = textArea.nextElementSibling;
  const inputField = form.children[0];
  const sendButton = form.children[1];

  // Establish a socket connection to the server
  const socket = io.connect('/');

  // Listen fo submit events
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = inputField.value;
    textArea.innerHTML += `<div class="chat">${inputField.value}</div>`;
    let data = { message };
    socket.emit('chat message', data);
    inputField.value = '';
  });

  const sendChat = (data) => {
    textArea.innerHTML += `<div>${data.message}</div>`;
  }
  socket.on('chat message', sendChat);
})()


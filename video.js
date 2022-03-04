let player = videojs('video-fm');
let chat = document.querySelector('.chat');
let container = document.querySelector('.container');
let playerV = document.querySelector('.player');

player.on('play', function() {
  chat.classList.add('chat-vision');
  container.classList.add('container-w-chat');
  playerV.classList.add('player-w-chat');
});  

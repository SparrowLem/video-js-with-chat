let chatContent = document.querySelector('.chat-content'); // Контейнер для сообщений
var messages = chatContent.children; // Коллекция всех сообщений в контейнере
let newMessageForm = document.querySelector('.chat-form'); // Форма и поле ввода текста
let newMessageInput = document.querySelector('.chat-form-input'); 
// Шаблон для сообщения
let messageTemplate = document.querySelector('#message-template').content;
let newMessageTemplate = messageTemplate.querySelector('.chat-message');

newMessageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    // Получаем текст из поля ввода
var messageText = newMessageInput.value;
    // Клонируем шаблон сообщения
var newMessage = newMessageTemplate.cloneNode(true);
    // Добавляем текст введенный пользователем
newMessage.children[1].textContent = messageText;
    // Добавляем сообщение на страницу
chatContent.appendChild(newMessage);
    // Удаляем содержимое поля ввода
newMessageInput.value = '';
});


   /*let newMessage = document.createElement('li'); 
    newMessage.textContent = input.value;
    input.value = '';
    chat.append(newMessage); */
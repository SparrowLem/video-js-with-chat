let chatContent = document.querySelector('.chat-content'); // Контейнер для сообщений
let newMessageForm = document.querySelector('.chat-form'); // Форма и поле ввода текста
let newMessageInput = document.querySelector('.chat-form-input'); 
// Шаблон для сообщения
let messageTemplate = document.querySelector('#message-template').content;
let newMessageTemplate = messageTemplate.querySelector('.chat-message');
let comments = [];
//comments  = JSON.parse(localStorage.getItem('comments'));


// формируем переписку
if (!localStorage.comments == 0) {
    //for (let i = 0; i < localStorage.length; i++) {
        //comments = JSON.parse(localStorage.getItem('comments'));
        //localStorage.setItem(comments, JSON.stringify(comments));
        let data = localStorage.getItem('comments');
        //let comments = localStorage.key(i);
        //let text = localStorage.getItem(comments);
        let newMessage = newMessageTemplate.cloneNode(true);
        newMessage.children[1].textContent = data; 
        chatContent.appendChild(newMessage);
   // }
} 

function addMessage (evt) {    //функция отправки сообщений
    evt.preventDefault();
////
    let messageText = newMessageInput.value;
        // Клонируем шаблон сообщения

    let newMessage = newMessageTemplate.cloneNode(true);// Клонируем шаблон сообщения
            newMessage.children[1].textContent = messageText; // Добавляем текст введенный пользователем
            chatContent.appendChild(newMessage);  // Добавляем сообщение на страницу
            newMessageInput.value = ''; // Удаляем содержимое поля ввода

            //comments.push(newMessage); //Добавление сообщения в конец массива
            //localStorage.setItem('comments', JSON.stringify(comments));

            
            localStorage.comments = comments;
};

window.onbeforeunload = function (evt) { 
	let warning = "Document 'too' is not saved. ";
	if (typeof evt == "undefined") {
		evt = window.event;
	}
	if (evt) {
		evt.returnValue = warning;
         // заполняем массив
        document.querySelectorAll('p.chat-message-text').forEach(p => comments.push(p.outerHTML))
        // записываем данные в хранилище
        localStorage.comments = comments
	}
	return warning;
   
} 

newMessageForm.addEventListener('submit', addMessage); 

//localStorage.clear();
//comments = [];

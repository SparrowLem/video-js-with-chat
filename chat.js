let chatContent = document.querySelector('.chat-content'); // Контейнер для сообщений
let newMessageForm = document.querySelector('.chat-form'); // Форма и поле ввода текста
let newMessageInput = document.querySelector('.chat-form-input'); 
// Шаблон для сообщения
let messageTemplate = document.querySelector('#message-template').content;
//let newMessageTemplate = messageTemplate.querySelector('.chat-message');
let comments = [];//
//let comments = JSON.parse(localStorage.getItem('comments')) || [];


if (localStorage.comments) {
    // формируем переписку
    localStorage.comments
        .split('</p>,')
        .map(p => chatContent.insertAdjacentHTML('beforeend', p))
}

function addMessage (evt) {    //функция отправки сообщений
      evt.preventDefault()
        let messageText = newMessageInput.value; // Получаем текст из поля ввода 
        let template = `<p><span>${'User1'}</span> ${messageText}</p>`;

    // добавляем шаблон в контейнер
    chatContent.insertAdjacentHTML('afterbegin', template)
    // сбрасываем значение инпут
    newMessageInput.value = ''
    // записываем сообщение в хранилище
    //localStorage.comments = template
    //comments.push(template)
    //localStorage.setItem(comments, JSON.stringify(template));
    // массив сообщений
    // заполняем массив
      
    //comments.push(template);
    
    // записываем сообщение в хранилище
    localStorage.comments = template
}; 

window.onbeforeunload = function (evt) { 
	let warning = "Document 'foo' is not saved. ";
	if (typeof evt == "undefined") {
		evt = window.event;
	}
	if (evt) {
		evt.returnValue = warning;
         // заполняем массив
         document.querySelectorAll('p').forEach(p => comments.push(p.outerHTML));
        // записываем данные в хранилище
        localStorage.comments = comments;
	}
	return warning;
   
}  

newMessageForm.addEventListener('submit', addMessage); 

//localStorage.clear();
//comments = [];

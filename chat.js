let player = videojs('video-fm');
player.muted(true);

let chat = videojs.dom.createEl('div', {className: 'vjs-text-visible', background: 'red', width: '400px', height: '400px'});
let container = player.addChild('chat');
console.log(container);

//let domEl = videojs.dom.isEl(chat);
//let posicion = videojs.dom.findPosition(chat);
//console.log(domEl);
//console.log(posicion);
//console.log(chat);

/*class Container {
    constructor(options) {
        this.$el = videojs.dom.createEl(options.type);
        //this.$el = document.querySelector(options.type);
        this.$el.style.display = 'block';
    }
};

let container = new Container({
    type: 'div'
});
console.log(container);
let chat = player.addChild('container');
console.log(chat);*/


let messages = JSON.parse(localStorage.getItem('messages')) || [];

//функция создание контейнера для сообщений и формы
function createChat () {
    let chatContent = document.createElement('div');
    chatContent.classList.add('chat-content');
        //cont.appendChild(chatContent);
    document.body.appendChild(chatContent);
    chatContent.style.cssText = `height:100px;
    max-height: 105px;
    overflow: scroll;
    max-width: 300px;
    border: 1px dashed rgb(180, 180, 180)`;
        //создание формы отправки
        document.querySelector('body').insertAdjacentHTML('afterbegin','<form action="" method="post"><input type="text" required><button type="submit">Отправить</button></form>');
       // })

    function historyChat() {
        if (messages.length>0) {
            //let users = JSON.parse(localStorage.getItem('messages'));
            //console.log(users);
            //console.log(users[0].message);}
            for (let i = 0; i<messages.length; i++){
                    console.log(messages[i].message);
                    let template = `<p><span>${'User1'}</span> ${messages[i].message}</p>`; 
                    chatContent.insertAdjacentHTML('afterbegin', template);
            }
            
        }
    }
    return historyChat();
};

let form = document.querySelector('form'); 
console.log(form);

//функция отправки сообщений
function sendMessage() {
    let form = document.querySelector('form'); 
    console.log(form);

    let chatContent = document.querySelector('.chat-content'); 

    form.addEventListener('submit', function (evt) { 
        evt.preventDefault();
        
        let obj = {};
        let inputText = document.querySelector('input'); 
        let messageText = inputText.value;
        let template = `<p><span>${'User1'}</span> ${messageText}</p>`;
        chatContent.insertAdjacentHTML('afterbegin', template);
        obj.name = 'User1';
        obj.message = messageText;
        messages.push(obj);
            
        inputText.value = '';
    });
};


let change = false;
player.on('play', function() {
    if (!change) {
       createChat(); 
        sendMessage();
       change = true;
    } return change;
});

console.log(change);

//функция отправки сообщения
if (change === true) {
    console.log(form);
    sendMessage();
    //historyChat();
};

console.log(messages);

//при закрытии окна сохранение сообщений в localStorage
window.onbeforeunload = function (evt) { 
    let warning = "Document 'too' is not saved. ";
        if (typeof evt == "undefined") {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = warning;
            
            localStorage.setItem('messages', JSON.stringify(messages));
            console.log(localStorage);
            //let users = JSON.parse(localStorage.getItem('messages'));
        }
        return warning;
       
}; 
//}; 

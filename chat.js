let player = videojs('video-fm');
player.muted(true);

//videojs.dom.createEl 
/*let con = player.createEl('div');
document.body.append(con);*/
let cont = player.el();
console.log(cont);
cont.style.width = '500px';
//cont.style.dislay = 'grid';


let messages = JSON.parse(localStorage.getItem('messages')) || [];
console.log(messages.lenght);
console.log(messages[0].message);

if (messages.lenght>0) {
    console.log(messages);
    //let users = JSON.parse(localStorage.getItem('messages'));
    //console.log(users);
    //console.log(users[0].message);}
       for (let i = 0; i<messages.lenght; i++){
            console.log(messages[i].message);
            let template = `<p><span>${'User1'}</span> ${messages[i].message}</p>`; 
            chatContent.insertAdjacentHTML('afterbegin', template);
        }
};

//функция создание контейнера для сообщений и формы
function createChat () {
    let chatContent = document.createElement('div');
        //cont.appendChild(chatContent);
    document.body.appendChild(chatContent);
    chatContent.style.cssText = `height:100px;
    max-height: 105px;
    overflow: scroll;
    max-width: 300px;
    border: 1px dashed rgb(180, 180, 180)`;
        //создание формы отправки
    document.querySelector('body').insertAdjacentHTML('afterbegin','<form action="" method="post"><input type="text" required><button>Отправить</button></form>');
       // })
    
};


//функция отправки сообщений
function sendMessage() {
    form.addEventListener('submit', function addMessage (evt) { 
        console.log('fuctionAddMessage');
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
if (!change) {
    player.on('play', function() {
       createChat(); 
    })
    change = true;
};

//переменная для формы оправки
//let form = document.querySelector('form'); 
//console.log(form);

//функция отправки сообщения
/*if (form) {
    console.log(form);
    sendMessage;
};*/

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

'use strict';

(() => {
	class ChatContainer extends videojs.getComponent('Component') {
		constructor(player, options) {
			super(player, options);
			this.addClass(options.customClass);
			
			this.el().innerHTML = `
			<div class="chat-messages" style="height: 80%; background: rgba(205, 214, 219, 0.3);
			overflow: scroll;"></div>
			<form action="" method="post">
				<input type="text" required style="background: rgba(205, 214, 219, 0.3)"><button type="submit">Отправить</button>
			</form>
			</div>`;
			this.el().style.cssText = `display: none;
			height:200px;
			z-index: 9999;
			position: absolute;
			bottom: 21px;
			left: 5px`;
			this.messages = JSON.parse(localStorage.getItem('messages')) || [];
			//this.messages = [];

			let change = false;
			player.on('play', () => {
				if (!change) {
				this.renderMessages();
				this.sendMessage();
				change = true;
				} return change; 
			});

			window.onbeforeunload = (evt) =>  { 
				let warning = "Document 'too' is not saved. ";
					if (typeof evt == "undefined") {
						evt = window.event;
					}
					if (evt) {
						evt.returnValue = warning;
						
						localStorage.setItem('messages', JSON.stringify(this.messages));
						console.log(localStorage);
					}
					return warning;
				
			};
		}

		// Этот метод вызывается самим videojs при монтировании компонента
		createEl () {
			// Созданный тут элемент будет родительским для этого компоннета. Его можно будет получить вызвав this.el()
			return videojs.dom.createEl('div', { className: 'vjs-some-component chat-content' });
		}

		renderMessages = () => {
			//let messages = this.messages;
					if (this.messages.length>0) {
						for (let i = 0; i<this.messages.length; i++){
								console.log(this.messages[i].message);
								let chatMessages = document.querySelector('.chat-messages'); 
								let template = `<p><span>${'User1'}</span> ${this.messages[i].message}</p>`; 
								chatMessages.insertAdjacentHTML('afterbegin', template);
						}
						
					}
				}


		sendMessage() {
			let form = document.querySelector('form'); 
			console.log(form);
			let chatContent = document.querySelector('.chat-content');
			console.log(chatContent);
			let chatMessages = document.querySelector('.chat-messages'); 
			chatContent.style.display = 'block';
		
			console.log(chatMessages);
						
			form.addEventListener('submit', (evt) => { 
				evt.preventDefault();
								
				let obj = {};
				let inputText = document.querySelector('input'); 
				let messageText = inputText.value;
				let template = `<p><span>${'User1'}</span> ${messageText}</p>`;
				chatMessages.insertAdjacentHTML('afterbegin', template);
				obj.name = 'User1';
				obj.message = messageText;
				this.messages.push(obj);
				console.log(obj);
				inputText.value = '';
			});
			return this.messages;
		};
	
	};
	
	// Регистрирую компонент, чтобы videojs знал, что он существует
	videojs.registerComponent('ChatContainer', ChatContainer);

	// Создаю плагин
	class ChatPlugin extends videojs.getPlugin('plugin') {
		constructor(player, options) {
			super(player, options);

			// Плагин после того как в плеер происходит событие ready добавляет плееру класс vjs-some-plugin и добавляет дочерний компонент SomeComponent созданный ранее
			player.on('ready', function() {
				//player.addClass(options.customClass)
				player.addClass('vjs-some-plugin');
				player.addChild('ChatContainer', options);
			});
		}
	}
	// Регистрирую плагин чтобы videojs знал о его существовании
	videojs.registerPlugin('chatPlugin', ChatPlugin);

	// Инициализирую плеер
	videojs('video-fm', {
		plugins: {
			chatPlugin: {
			customClass: 'check' 
			}
		}
	});
})();

'use strict';

(() => {
	class SomeComponent extends videojs.getComponent('Component') {
		constructor(player, options) {
			super(player, options);
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
		}

		// Этот метод вызывается самим videojs при монтировании компонента
		createEl() {
			// Созданный тут элемент будет родительским для этого компоннета. Его можно будет получить вызвав this.el()
			return videojs.dom.createEl('div', { className: 'vjs-some-component chat-content' });
		}
	}

	// Регистрирую компонент, чтобы videojs знал, что он существует
	videojs.registerComponent('SomeComponent', SomeComponent);

  //let ps = new SomeComponent();  

	// Создаю плагин
	class SomePlugin extends videojs.getPlugin('plugin') {
		constructor(player, options) {
			super(player, options);

			// Плагин после того как в плеер происходит событие ready добавляет плееру класс vjs-some-plugin и добавляет дочерний компонент SomeComponent созданный ранее
			player.on('ready', function() {
                player.addClass(options.customClass)
				player.addClass('vjs-some-plugin');
				player.addChild('SomeComponent', options);

                let messages = JSON.parse(localStorage.getItem('messages')) || [];
                console.log(messages);

				function historyChat() {
					if (messages.length>0) {
						for (let i = 0; i<messages.length; i++){
								console.log(messages[i].message);
								let chatMessages = document.querySelector('.chat-messages'); 
								let template = `<p><span>${'User1'}</span> ${messages[i].message}</p>`; 
								chatMessages.insertAdjacentHTML('afterbegin', template);
						}
						
					}
				}

				//функция отправки сообщений
				function sendMessage() {
					let form = document.querySelector('form'); 
					console.log(form);
					let chatContent = document.querySelector('.chat-content');
					chatContent.style.display = 'block';
					let chatMessages = document.querySelector('.chat-messages'); 
				
					form.addEventListener('submit', function (evt) { 
						evt.preventDefault();
						
						let obj = {};
						let inputText = document.querySelector('input'); 
						let messageText = inputText.value;
						let template = `<p><span>${'User1'}</span> ${messageText}</p>`;
						//template.style.cssText = `margin: 0;`
						chatMessages.insertAdjacentHTML('afterbegin', template);
						obj.name = 'User1';
						obj.message = messageText;
						messages.push(obj);
							
						inputText.value = '';
					});
				};
                
				let videoPlay = false;
				player.on('play', function() {
					if (!videoPlay) {
						historyChat()
						sendMessage();
						videoPlay = true;
					} return videoPlay;
				});

				console.log(videoPlay);

							//функция отправки сообщения
				if (videoPlay === true) {
				console.log(form);
				sendMessage();
				historyChat();
				};

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
			});
		}
	}
	// Регистрирую плагин чтобы videojs знал о его существовании
	videojs.registerPlugin('somePlugin', SomePlugin);

	// Инициализирую плеер
    videojs('video-fm', {
		plugins: {
			somePlugin: {
                customClass: 'check' 
            }
		}
	});
})();

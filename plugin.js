'use strict';

(() => {
	class ChatContainer extends videojs.getComponent('Component') {
		
		constructor(player, options) {
			super(player, options);
			this.addClass(options.customClass);
			

			let controlChat = player.getChild('ControlBar').addChild('button', {
                controlText: 'Chatcontrol',
                className: 'vjs-button-chat',
				clickHandler: function(event) {
				//this.chatopen();
				let page = document.querySelector('.vjs-chat-component');
				page.classList.toggle('vjs-chat-content-hide');
				page.classList.toggle('vjs-chat-content');
				}				
              });

			controlChat.addClass('vjs-chat-control');

			let iconControlChat = document.querySelector('.vjs-chat-control .vjs-icon-placeholder');
			iconControlChat.innerHTML = `
			<svg width="16" height="15" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M19.75 6C19.7495 5.60231 19.5914 5.22105 19.3102 4.93984C19.029 4.65864 18.6477 4.50045 18.25 4.5H15.25V1.5C15.2495 1.10231 15.0914 0.721048 14.8102 0.439842C14.529 0.158636 14.1477 0.000454817 13.75 0H1.75C1.35231 0.000454817 0.971048 0.158636 0.689842 0.439842C0.408636 0.721048 0.250455 1.10231 0.25 1.5V13.5C0.249996 13.6416 0.290079 13.7803 0.365614 13.9001C0.441148 14.0199 0.549046 14.1158 0.676829 14.1768C0.804611 14.2378 0.947055 14.2614 1.08768 14.2449C1.22831 14.2283 1.36138 14.1723 1.4715 14.0832L4.75 11.4328L4.75009 14.25C4.75055 14.6477 4.90873 15.029 5.18994 15.3102C5.47114 15.5914 5.85241 15.7495 6.25009 15.75H15.024L18.5286 18.5832C18.6387 18.6723 18.7718 18.7283 18.9124 18.7449C19.053 18.7614 19.1955 18.7378 19.3233 18.6768C19.451 18.6158 19.5589 18.5199 19.6345 18.4001C19.71 18.2803 19.7501 18.1416 19.7501 18L19.75 6ZM15.7607 14.4168C15.6272 14.3089 15.4608 14.25 15.2892 14.25H6.25009L6.25 11.25H13.75C14.1477 11.2495 14.529 11.0914 14.8102 10.8102C15.0914 10.529 15.2495 10.1477 15.25 9.75V6H18.25L18.2501 16.4292L15.7607 14.4168Z" fill="currentColor"/>
			</svg> `

			this.el().innerHTML = `
				<div class="chat-list-messages" style=" background: rgba(205, 214, 219, 0.1);">

					<div class="chat-message-pin"> </div>
			  	
					<ul class="chat-usermes">
			  			<li>
							<div class="chat-message-block">
								<div class="chat-message-avatar">
									<img class="chat-avatar-img">
								</div>

								<div class="chat-message-comment">
									<span class="chat-message-user">User1</span>
									<p class="chat-message-text">Какие дельфины самые большие?</p>
								</div>
							</div>
						</li>

			  			<li>
						<div class="chat-message-block">
							<div class="chat-message-avatar">
								<img class="chat-avatar-img">
							</div>

							<div class="chat-message-comment">
								<span class="chat-message-user">User1</span>
								<p class="chat-message-text">Какие дельфины самые большие?</p>
							</div>

						</div>
						</li>
					</div>
				</div>

				<div class ="chat-bottom">
					<div class="chat-textbox">
						<img class="icon-user" src="image/iconUser.png">

						<form  class="chat-input" action="" method="post">
							<input class="input-text" type="text" required placeholder="Добавить комментарий" maxlength="300" contenteditable="true">
						</form>
					</div>

					<div class="chat-buttom-like">
					<button class="heart" type="button"></button>
					</div>
				</div>`;
				
				
			this.messages = JSON.parse(localStorage.getItem('messages')) || [];

			player.one('play', () => {
				this.addMessages();
				this.renderMessages();
				this.sendMessage();
				
			});

			window.addEventListener('unload', (evt) =>  { 
				localStorage.setItem('messages', JSON.stringify(this.messages));
			});
		}

		
		// Этот метод вызывается самим videojs при монтировании компонента
		createEl () {
			// Созданный тут элемент будет родительским для этого компоннета. Его можно будет получить вызвав this.el()
			return videojs.dom.createEl('div', { className: 'vjs-chat-component vjs-chat-content' });
		}

		sendMessage() {
			let form = document.querySelector('form'); 
			let chatContent = document.querySelector('.vjs-chat-content');
			let chatMessages = document.querySelector('.chat-usermes'); 

			chatContent.classList.add('vjs-chat-content-hide');
			chatContent.classList.remove('vjs-chat-content');
						
			form.addEventListener('submit', (evt) => { 
				evt.preventDefault();
								
				let obj = {};
				let inputText = document.querySelector('input'); 
				let messageText = inputText.value;
				let template = `<li>
				<div class="chat-message-block">
				<span class="chat-message-avatar">
					<img class="chat-avatar-img" src="image/icon-user.png">
				</span>
				
				<div class="chat-message-comment">
					<span class="chat-message-user">${'User1'}</span> 
					<div class="chat-message-text contenteditable class=editor ">${messageText}</div>
				</div>
			</div>
			</li>`;

				chatMessages.insertAdjacentHTML('beforeend', template);
				obj.name = 'User1';
				obj.message = messageText;
				this.messages.push(obj);
				inputText.value = '';
			});

		};

		addMessages() {
			let arrayMessages = [
				{
					"id": "0",
					"userName": "Admin",
					"isPinned": true,
					"isAdmin": true,
					"message": "Дополнительная скидка 15% по промокоду ВЕСНА15",
					"avatar": "https://cdn-icons-png.flaticon.com/512/194/194938.png",
					"answerTo": null
				}, {
					"id": "1",
					"userName": "Костя Морозов",
					"isPinned": false,
					"isAdmin": false,
					"message": "Надюша начинай",
					"avatar": "https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png",
					"answerTo": null
				}, {
					"id": "2",
					"userName": "Рузанна Комиссарова",
					"isPinned": false,
					"isAdmin": false,
					"message": "Здравствуйте, как купить туфли",
					"avatar": null,
					"answerTo": null
				}, {
					"id": "3",
					"userName": "Admin",
					"isPinned": false,
					"isAdmin": true,
					"message": "Надюша начинай",
					"avatar": null,
					"answerTo": "2"
				}
			];
			
			let inssertMessages = function(array){
				for (let i = 0; i<array.length; i++) {
					let chatMessages = document.querySelector('.chat-usermes'); 
					let chatPin = document.querySelector('.chat-message-pin')
					let template = `<div id=${i} class="chat-message-block <!---${array[i].isPinned ? 'chat-message-pin' : ''}-->">
						<span class="chat-message-avatar">
							<img class="chat-avatar-img" src="${(array[i].avatar !== null) ? array[i].avatar : 'image/icon-user.png'}">
						</span>
			
						<div class="chat-message-comment ${array[i].isAdmin ? 'chat-message-comment-admin' : ''}">
							<div class="chat-message-user">${array[i].userName}</div> 
							<p class="chat-message-text">${array[i].message}</p>
						</div>
					</div>`; 

					if (array[i].isPinned){
						console.log('admin');
						template = `<div id=${i} >
			
							<div class="chat-message-comment chat-message-comment-pin">
								<div class="message-pin-img">
									<img class="chat-pin-icon" src="image/point.png">
								</div>
								<div class="chat-text-pin">
									<div class="chat-message-user">${array[i].userName}</div> 
									<p class="chat-message-text">${array[i].message}</p>
								</div>
							</div>
							
						</div>`
						chatPin.insertAdjacentHTML('beforeend', template);
					} else {
					chatMessages.insertAdjacentHTML('beforeend', template);}
				}
			}
			
			inssertMessages(arrayMessages);
		}

		renderMessages = () => {
			if (this.messages.length>0) {
				for (let i = 0; i<this.messages.length; i++){
					let chatMessages = document.querySelector('.chat-usermes'); 
					let template = `<li>
					<div class="chat-message-block">
					<span class="chat-message-avatar">
						<img class="chat-avatar-img" src="image/icon-user.png">
					</span>

					<div class="chat-message-comment">
						<div class="chat-message-user">${'User1'}</div> 
						<p class="chat-message-text">${this.messages[i].message}</p>
						</div>
					</div>
					</li>`; 
					chatMessages.insertAdjacentHTML('beforeend', template);
				}
						
			}
		}
	
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
				player.addClass('vjs-chat-plugin');
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
			}
		}
	});
})();

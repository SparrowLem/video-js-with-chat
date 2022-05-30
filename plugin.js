'use strict';

(() => {
	class ChatContainer extends videojs.getComponent('Component') {

		constructor(player, options) {
			super(player, options);
			this.addClass(options.customClass);

			this.el().innerHTML = `
				<div class="chat-list-messages" style="height: 80%; background: rgba(205, 214, 219, 0.1);
				overflow: scroll;">

					<div class="chat-message-block">
						<div class="chat-message-avatar">
							<img class="chat-avatar-img">
						</div>

						<div class="chat-message-comment">
							<span class="chat-message-user">User1</span>
							<p class="chat-message-text">Какие дельфины самые большие?</p>
						</div>
					</div>

					<div class="chat-message-block">
						<div class="chat-message-avatar">
							<img class="chat-avatar-img">
						</div>

						<div class="chat-message-comment chat-message-comment-admin">
							<span class="chat-message-user">Admin</span>
							<p class="chat-message-text">Самый большой дельфин - касатка. Коса́тка (лат. Orcinus orca) — вид китообразных из семейства дельфиновых (дельфинов)
							 парвотряда зубатых китов. Единственный современный представитель рода косаток.</p>
						</div>
					</div>

				</div>

				<div class ="chat-bottom">
					<div class="chat-textbox">
						<img src="iconUser.png">

						<form  class="chat-input" action="" method="post">
							<input class="input-text" type="text" required placeholder="Добавить комментарий" maxlength="300">
						</form>
					</div>

					<div class="chat-buttom-like">
					<button class="heart" type="button"></button>
					</div>
				</div>`;


			this.messages = JSON.parse(localStorage.getItem('messages')) || [];

			player.one('play', () => {
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

		renderMessages = () => {
			if (this.messages.length>0) {
				for (let i = 0; i<this.messages.length; i++){
					let chatMessages = document.querySelector('.chat-list-messages');
					let template = `<div class="chat-message-block">
					<span class="chat-message-avatar">
						<img class="chat-avatar-img">
					</span>

					<div class="chat-message-comment">
						<div class="chat-message-user">${'User1'}</div>
						<p class="chat-message-text">${this.messages[i].message}</p>
						</div>
					</div>`;
					chatMessages.insertAdjacentHTML('beforeend', template);
				}

			}
		}


		sendMessage() {
			let form = document.querySelector('form');
			let chatContent = document.querySelector('.vjs-chat-content');
			let chatMessages = document.querySelector('.chat-list-messages');

			chatContent.classList.add('vjs-chat-content-hide');

			form.addEventListener('submit', (evt) => {
				evt.preventDefault();

				let obj = {};
				let inputText = document.querySelector('input');
				let messageText = inputText.value;
				let template = `<div class="chat-message-block">
				<span class="chat-message-avatar">
					<img class="chat-avatar-img">
				</span>

				<div class="chat-message-comment">
					<span class="chat-message-user">${'User1'}</span>
					<p class="chat-message-text">${messageText}</p>
				</div>
			</div>`;

				chatMessages.insertAdjacentHTML('beforeend', template);
				obj.name = 'User1';
				obj.message = messageText;
				this.messages.push(obj);
				inputText.value = '';
			});

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

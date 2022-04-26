'use strict';

(() => {
	class SomeComponent extends videojs.getComponent('Component') {
		constructor(player, options) {
			super(player, options);
			this.el().innerHTML = `<div>SomeComponent</div>`;
            this.el().style.background = options.background;
		}

		// Этот метод вызывается самим videojs при монтировании компонента
		createEl() {
			// Созданный тут элемент будет родительским для этого компоннета. Его можно будет получить вызвав this.el()
			return videojs.dom.createEl('div', { className: 'vjs-some-component' });
		}
	}

const ChatContent = new SomeComponent(videojs('video-fm'), {background:'red'});
/*const ChatForm = new SomeComponent(videojs('video-fm'), {
    innerHTML: '<form action="" method="post"><input type="text" required><button type="submit">Отправить</button></form>',
    className: 'chat-content'
});
const ChatMessages = new SomeComponent(videojs('video-fm'), {
    innerHTML: '<div>SomeComponent</div>',
    className: 'chat-messages'
});*/


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
                //let ps = this.createEl(this.el());
                //console.log(ps)
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

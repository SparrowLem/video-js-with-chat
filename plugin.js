'use strict';

(() => {
	class SomeComponent extends videojs.getComponent('Component') {
		constructor(player, options) {
			super(player, options);
			this.el().innerHTML = `
			<div class="ChatMessages" style="height: 80%; background: rgba(205, 214, 219, 0.3)"></div>
			<form action="" method="post">
				<input type="text" required style="background: rgba(205, 214, 219, 0.3)"><button type="submit">Отправить</button>
			</form>
			</div>`;
			this.el().style.cssText = `display: block;
			height:200px;
			z-index: 9999;
			position: absolute;
			bottom: 21px;
			left: 5px`;
		}

		// Этот метод вызывается самим videojs при монтировании компонента
		createEl() {
			// Созданный тут элемент будет родительским для этого компоннета. Его можно будет получить вызвав this.el()
			return videojs.dom.createEl('div', { className: 'vjs-some-component' });
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

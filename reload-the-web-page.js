;(function() {
	window.addEventListener('load', function() { //when the page loads...
		window['Reload-the-web-page'] = window['Reload-the-web-page'] || function() {
			//setup settings...
				var optionsDefault = {
					'autostart': true,
					'restartOnScroll': true,
					'delay': 30,
					'i18n': {
						'playing': 'Reload in {{seconds}}s',
						'paused': 'Reload paused'
					}
				};
				var options = optionsDefault;
				var opts = window['Reload-the-web-page-options'];
				if (opts !== undefined) {
					options.delay = (opts.delay!==undefined) ? opts.delay : optionsDefault.delay;
					options.autostart = (opts.autostart!==undefined) ? opts.autostart : optionsDefault.autostart;
					options.restartOnScroll = (opts.restartOnScroll!==undefined) ? opts.restartOnScroll : optionsDefault.restartOnScroll;
					options.i18n = optionsDefault.i18n;
					if (opts.i18n !== undefined) {
						if(opts.i18n.playing!==undefined) { options.i18n.playing = opts.i18n.playing; }
						if(opts.i18n.paused!==undefined) { options.i18n.paused = opts.i18n.paused; }
					}
				}
			//some interal things...
				var currentTimeout = 0;
				var currentInterval = null;
				var paused = !options.autostart;
				var reloadPage = function reloadPage () {
					window.location.reload();
				};
				var updateTimerEl = function(updateElOpts) {
					reloadElement.className = updateElOpts.css ? updateElOpts.css : '';
					if (!updateElOpts.paused) {
						reloadElement.innerHTML = options.i18n.playing.replace('{{seconds}}', updateElOpts.time);
						reloadElement.className = updateElOpts.css ? updateElOpts.css : '';
					}
					else {
						reloadElement.innerHTML = options.i18n.paused;
					}
				};
				var resetTimer = function() {
					if (currentTimeout) { currentTimeout = 0; }
					if (currentInterval) { clearInterval(currentInterval); }
				};
				var startTimer = function(delay) {
					var time = delay||(options.delay*1000);
					updateTimerEl({time: time/1000, css: 'animated'});
					var interv = setInterval(function() {
							time = time-1000;
							updateTimerEl({
								time: time/1000,
								css: 'animated'
							});
							if (time<=0) {
								reloadPage();
							}
						}, 1000)
					return interv;
				};
				var go = function() {
					resetTimer();
					currentInterval = startTimer();
				};
				var pause = function() {
					resetTimer();
					updateTimerEl({paused: true})
				};
				var restart = function() {
					if(paused!==false) {
						resetTimer();
						go();
					}
				};
				var toggleTimer = function() {
					var status = paused;
					paused = !paused;
					if (status) {
						pause();
					}
					else {
						go();
					}
				};
			//setup the html el
				var random = Math.floor( ( Math.random() *99999) + 1 );
				var id = 'reload-'+random;
				var cssCode = [
					'@-webkit-keyframes greenPulse {','\n',
						'from { background-color: #749a02; box-shadow: 0 0 9px #333; box-shadow: 0 0 9px #333; }','\n',
						'50% { background-color: #91bd09; box-shadow: 0 0 18px #91bd09; box-shadow: 0 0 18px #91bd09; }','\n',
						'to { background-color: #749a02; box-shadow: 0 0 9px #333; box-shadow: 0 0 9px #333; }','\n',
					'}','\n','\n',

					'#', id, '.animated', ' {', '\n',
						'background-color: #749a02;',
						'-webkit-animation-name: greenPulse;','\n',
						'-webkit-animation-duration: 2s;','\n',
						'-webkit-animation-iteration-count: infinite;','\n',
						'background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAARCQAAEQkBwOWiGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADdSURBVFiF7ZexDcJADEX9zykYgIIJSENBlRQUMEcGQCkYgiEoIgZgl6SiZgIKBqC4s6kiRUk4IQpSYJfvLPtJbv5BVWnKcpNuNwETIKIk9phl2VpETkQ0b5mq3pMk2dd1fev25nm+9N6fASw6+OGcOzRNc/1KIIRQAth0GYBURAoiOna5iBQAtr0RaQihJKLy3Y7oCQDMxriqDvgYi834SOAXZQImYAImYAImYAJRAVV9jnEAAz7GYjPaiiYiZq5EZEW9SMbMl36vc+7ivd/1IxkzV7EdsJ+RCfy9wAvyxUhV5hZ7OQAAAABJRU5ErkJggg==\');', '\n',
					'}','\n','\n',

					'#', id, ' {', '\n',
						'position: fixed;', '\n',
						'right: 20px;', '\n',
						'top: 20px;', '\n',
						'padding: 10px 22px 10px 47px;', '\n',
						'background: red;', '\n',
						'color: #fff;', '\n',
						'font-size: 32.5px;', '\n',
						'font-weight: 800;','\n',
						'background-position: 15px center;',
						'box-shadow: 0 0 5px #aaaaaa;',
						'background-repeat: no-repeat;',
						'background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAARCQAAEQkBwOWiGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGKSURBVFiF7dbPThpRFAbw71xAa92rtXHFA0DgzJQn4RFcmGpM07h0raJpGoOpVfs+ToYJ7AVNjNq03daKDPdzI8bNVEW4bPh2J/ffL7m5N0dIYpQxIz19DBgDAKSTBkql0mwcx4si0ib5IwzDP8MASNIz9Dxvn+TiffmXZJXkdhRFvwcJSLwCkh8eldMismaMOVPVSi6Xmxk6ICFvAXzOZDKnqrrj+/6ca8BjyCdrbcvzvC+q+s41oJcpkqsAWqr6tVAozLsG9PIGwIoxplUsFnfz+fx714BeJkXkYzqdbqpq1ff9BdeABwiAJWvtiapWy+VyyjWglwkAS81mc3lUgCeT+BUPKLcADrPZ7K5rQBvAkTFmIwiC8/9NHDSgTfKg2+1u1Ov1i+csGBTgBsB3a+1mFEWXL1n4WsA/EdknuRWG4VU/G/QLuAbwzRhTCYLgZ5979AW4BrDX6XQqjUbj12sOfhIgIsckc/fl0BqSREAqlVqP41hIXohItVaruW3JXGXkX/EYMAbcARu4mG9J2s4FAAAAAElFTkSuQmCC\');', '\n',
							'border-radius: 19px;', '\n',
							'font-family: Monospace;', '\n',
							'color: rgba(255,255,255,0.9);', '\n',
							'cursor: pointer', '\n',
					'}'
				].join('');
				var styleElement = document.createElement("style");
				styleElement.type = "text/css";
				if (styleElement.styleSheet) { styleElement.styleSheet.cssText = cssCode;	}
				else { styleElement.appendChild(document.createTextNode(cssCode)); }
				var head = document.getElementsByTagName("head")[0];
				head.appendChild(styleElement);
				var reloadElement = document.createElement('div');
				reloadElement.id = id;

			//inject & start
				var body = document.getElementsByTagName('body')[0];
				body.appendChild(reloadElement);
				if(options.restartOnScroll) {
					window.onscroll = restart;
					window.resize = restart;
				}
				reloadElement.onclick = toggleTimer;
				toggleTimer();
		}();
	});
})();

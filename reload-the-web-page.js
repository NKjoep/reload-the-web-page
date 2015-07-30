;(function() {
	window.addEventListener('load', function() {
		//start
	window['Reload-the-web-page'] = window['Reload-the-web-page'] || function(opts) {
		var self = this;
		var optionsDefault = {
			'autostart': true,
			'delay': 30,
			'i18n': {
    		'playing': 'Reload in {{seconds}}',
    		'paused': 'Reload paused'
    	}
		};
		var options = optionsDefault;
		if (opts) {
			options.delay = (opts!== undefined && opts.delay!==undefined) ? opts.delay : optionsDefault.delay;
			options.autostart = (opts!== undefined && opts.autostart!==undefined) ? opts.autostart : optionsDefault.autostart;
			options.i18n = optionsDefault.i18n;
			if (opts.i18n !== undefined) {
				if(opts.i18n.playing!==undefined) { options.i18n.playing = opts.i18n.playing; }
				if(opts.i18n.paused!==undefined) { options.i18n.paused = opts.i18n.paused; }
			}
		}
		var random = Math.floor( ( Math.random() *99999) + 1 );
		var id = 'reload-'+random;
		var cssCode = [
			'@-webkit-keyframes greenPulse {','\n',
			  'from { background-color: #749a02; -webkit-box-shadow: 0 0 9px #333; box-shadow: 0 0 9px #333; }','\n',
			  '50% { background-color: #91bd09; -webkit-box-shadow: 0 0 18px #91bd09; box-shadow: 0 0 18px #91bd09; }','\n',
			  'to { background-color: #749a02; -webkit-box-shadow: 0 0 9px #333; box-shadow: 0 0 9px #333; }','\n',
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
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		}
	  else {
	  	styleElement.appendChild(document.createTextNode(cssCode));
  	}
		document.getElementsByTagName("head")[0].appendChild(styleElement);

		var reloadDiv=document.createElement('div');
		reloadDiv.id = id;

		var body = document.getElementsByTagName('body')[0];
		if (body!==undefined) {
			body.appendChild(reloadDiv);
			var reloadElement = document.getElementById(id);
			var delay = options.delay * 1000;
			if (currentTimeout) { clearTimeout(currentTimeout); }
			if (currentInterval) { clearInterval(currentInterval); }
			var currentTimeout = null;
			var currentInterval = null;
			var paused = !options.autostart;
			self.reloadPage = function reloadPage () {
				window.location.reload();
			};
			self.displayTimer = function(time) {
				reloadElement.innerHTML = options.i18n.playing.replace('{{seconds}}', time)
			};
			self.go = function() {
				if (currentTimeout) { clearTimeout(currentTimeout); }
				if (currentInterval) { clearInterval(currentInterval); }
				currentTimeout = setTimeout(self.reloadPage, delay);
				var time = delay;
				self.displayTimer(time/1000);
				reloadElement.className='animated';
				currentInterval = setInterval(function() {
					time = time-1000;
					self.displayTimer(time/1000);
				}, 1000)
				//reloadElement.onclick = self.pause;
			};
			self.pause = function() {
				if (paused == false) {
					paused = true;
					return self.go();
				}
				else {
					if (currentTimeout) { clearTimeout(currentTimeout); }
					if (currentInterval) { clearInterval(currentInterval); }
					reloadElement.className = '';
					reloadElement.innerHTML = options.i18n.paused;
					paused = false;
				}
			};
			reloadElement.onclick = self.pause;
			window.onscroll = self.go;
			window.resize = self.go;
			self.pause();
		} //if

	}; //main fn

	window['Reload-the-web-page'](window['Reload-the-web-page-options']);
		//end
	});
})();

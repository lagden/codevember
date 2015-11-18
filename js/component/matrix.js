(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'component/rnd', 'webfontloader/webfontloader', 'component/trail'], factory);
	} else if (typeof exports !== 'undefined') {
		factory(exports, require('component/rnd'), require('webfontloader/webfontloader'), require('component/trail'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.random, global.webFont, global.Trail);
		global.matrix = mod.exports;
	}
})(this, function (exports, _componentRnd, _webfontloaderWebfontloader, _componentTrail) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _random = _interopRequireDefault(_componentRnd);

	var _webFont = _interopRequireDefault(_webfontloaderWebfontloader);

	var _Trail = _interopRequireDefault(_componentTrail);

	var matrix = document.querySelector('#matrix');
	var body = document.body;
	var trails = [];
	var context = matrix.getContext('2d');

	function retina() {
		var ratio = window.devicePixelRatio || 1;
		matrix.width *= ratio;
		matrix.height *= ratio;
		context = matrix.getContext('2d');
	}

	function resize() {
		context.canvas.width = body.clientWidth;
		context.canvas.height = body.clientHeight;
		retina();
	}

	function add() {
		var t = new _Trail['default'](context);
		trails.push(t);
	}

	function update() {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.save();
		var t = undefined;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = trails[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				t = _step.value;

				t.draw();
				if (t.letters.length === 0) {
					var idx = trails.indexOf(t);
					if (idx > -1) {
						trails.splice(idx, 1);
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator['return']) {
					_iterator['return']();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	var fps = 15;
	function loop() {
		if ((0, _random['default'])(1, 10) % 2) {
			add();
		}
		setTimeout(function () {
			window.requestAnimationFrame(loop);
			update();
		}, 1000 / fps);
	}

	function init() {
		window.addEventListener('resize', resize);
		matrix.addEventListener('click', add);
		resize();
		loop();
	}

	// Webfont
	var webFontConfig = {
		custom: {
			families: ['SG07']
		},
		active: init
	};
	_webFont['default'].load(webFontConfig);
});
//# sourceMappingURL=matrix.js.map

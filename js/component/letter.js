(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.letter = mod.exports;
	}
})(this, function (exports, module) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var AddLetter = (function () {
		function AddLetter() {
			_classCallCheck(this, AddLetter);

			for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
				opts[_key] = arguments[_key];
			}

			var char = opts[0];
			var font = opts[1];
			var size = opts[2];

			this.char = char;
			this.font = font;
			this.size = size;
			this.tempCanvas = document.createElement('canvas');
			this.tempCtx = this.tempCanvas.getContext('2d');
			this.firstTime = true;
		}

		_createClass(AddLetter, [{
			key: 'draw',
			value: function draw(context, x, y, cc) {
				context.font = this.font;
				context.fillStyle = rgbToHex(cc, cc, cc);
				context.fillText(this.char, x, y);
			}
		}]);

		return AddLetter;
	})();

	function componentToHex(c) {
		var hexa = c.toString(16);
		return hexa.length === 1 ? '0' + hexa : hexa;
	}

	function rgbToHex(r, g, b) {
		return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	module.exports = AddLetter;
});
//# sourceMappingURL=letter.js.map

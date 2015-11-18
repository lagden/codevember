(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'component/rnd', 'component/letter'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('component/rnd'), require('component/letter'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.random, global.AddLetter);
		global.trail = mod.exports;
	}
})(this, function (exports, module, _componentRnd, _componentLetter) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _random = _interopRequireDefault(_componentRnd);

	var _AddLetter = _interopRequireDefault(_componentLetter);

	var letters = 'thiagolagden1234567890';
	var nums = letters.length;

	var Trail = (function () {
		function Trail(context) {
			_classCallCheck(this, Trail);

			this.x = Math.floor((0, _random['default'])(0, context.canvas.width) / 10) * 10;
			this.y = -100;
			this.size = (0, _random['default'])(1, 10) * 8;
			this.spacing = this.size;
			this.ctx = context;
			this.cc = 255;
			this.letters = [];
		}

		_createClass(Trail, [{
			key: 'draw',
			value: function draw() {
				if (this.y < this.ctx.canvas.height) {
					this.cc -= 10;
					this.y += this.spacing;
					var char = letters.charAt((0, _random['default'])(0, nums - 1));
					var t = new _AddLetter['default'](char, this.size + 'px SG07', this.size);
					t.draw(this.ctx, this.x, this.y, this.cc);
					this.letters.push(t);
				} else {
					this.letters.shift();
				}
			}
		}]);

		return Trail;
	})();

	module.exports = Trail;
});
//# sourceMappingURL=trail.js.map

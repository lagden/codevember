(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "module"], factory);
	} else if (typeof exports !== "undefined" && typeof module !== "undefined") {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.rnd = mod.exports;
	}
})(this, function (exports, module) {
	"use strict";

	function random(min, max) {
		return min + Math.random() * (max - min) + 0.5 | 0;
	}

	module.exports = random;
});
//# sourceMappingURL=rnd.js.map

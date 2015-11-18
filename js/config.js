'use strict';

define('config', function () {
	requirejs.config({
		baseUrl: 'js/lib',
		paths: {
			app: '../app',
			component: '../component',
			TweenLite: './gsap/src/uncompressed/TweenLite',
			CSSPlugin: './gsap/src/uncompressed/plugins/CSSPlugin',
			ColorPropsPlugin: './gsap/src/uncompressed/plugins/ColorPropsPlugin'
		}
	});
});
//# sourceMappingURL=config.js.map

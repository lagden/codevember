(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'component/matrix'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('component/matrix'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.matrix);
    global.core = mod.exports;
  }
})(this, function (exports, _componentMatrix) {
  'use strict';
});
//# sourceMappingURL=core.js.map

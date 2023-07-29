/*! madxartwork - v3.11.5 - 14-03-2023 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ../core/editor/assets/js/editor-loader-v2.js ***!
  \****************************************************/


var _window$__UNSTABLE__e;
window.__madxartworkEditorV1LoadingPromise = new Promise(function (resolve) {
  window.addEventListener('madxartwork/init', function () {
    resolve();
  }, {
    once: true
  });
});
window.madxartwork.start();
if (!((_window$__UNSTABLE__e = window.__UNSTABLE__madxartworkPackages) !== null && _window$__UNSTABLE__e !== void 0 && _window$__UNSTABLE__e.editor)) {
  throw new Error('The "@madxartwork/editor" package was not loaded.');
}
window.__UNSTABLE__madxartworkPackages.editor.init(document.getElementById('madxartwork-editor-wrapper-v2'));
/******/ })()
;
//# sourceMappingURL=editor-loader-v2.js.map
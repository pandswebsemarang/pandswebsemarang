/*! madxartwork-pro - v3.9.2 - 21-12-2022 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["code-highlight"],{

/***/ "../modules/code-highlight/assets/js/frontend/handler.js":
/*!***************************************************************!*\
  !*** ../modules/code-highlight/assets/js/frontend/handler.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

class codeHighlightHandler extends madxartworkModules.frontend.handlers.Base {
  onInit() {
    super.onInit(...arguments);
    Prism.highlightAllUnder(this.$element[0], false);
  }

  onElementChange() {
    // Handle the changes for "Word Wrap" feature
    Prism.highlightAllUnder(this.$element[0], false);
  }

}

exports["default"] = codeHighlightHandler;

/***/ })

}]);
//# sourceMappingURL=code-highlight.025966fc6b037ea07f05.bundle.js.map
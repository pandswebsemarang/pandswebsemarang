/*! madxartwork - v3.11.5 - 14-03-2023 */
"use strict";
(self["webpackChunkmadxartwork"] = self["webpackChunkmadxartwork"] || []).push([["alert"],{

/***/ "../assets/dev/js/frontend/handlers/alert.js":
/*!***************************************************!*\
  !*** ../assets/dev/js/frontend/handlers/alert.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class Alert extends madxartworkModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        dismissButton: '.madxartwork-alert-dismiss'
      }
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $dismissButton: this.$element.find(selectors.dismissButton)
    };
  }
  bindEvents() {
    this.elements.$dismissButton.on('click', this.onDismissButtonClick.bind(this));
  }
  onDismissButtonClick() {
    this.$element.fadeOut();
  }
}
exports["default"] = Alert;

/***/ })

}]);
//# sourceMappingURL=alert.fab41b1ce9a2329c8779.bundle.js.map
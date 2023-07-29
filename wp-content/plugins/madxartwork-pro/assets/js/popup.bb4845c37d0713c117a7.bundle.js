/*! madxartwork-pro - v3.11.6 - 14-03-2023 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["popup"],{

/***/ "../modules/popup/assets/js/frontend/handlers/forms-action.js":
/*!********************************************************************!*\
  !*** ../modules/popup/assets/js/frontend/handlers/forms-action.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = madxartworkModules.frontend.handlers.Base.extend({
  getDefaultSettings() {
    return {
      selectors: {
        form: '.madxartwork-form'
      }
    };
  },
  getDefaultElements() {
    var selectors = this.getSettings('selectors'),
      elements = {};
    elements.$form = this.$element.find(selectors.form);
    return elements;
  },
  bindEvents() {
    this.elements.$form.on('submit_success', this.handleFormAction);
  },
  handleFormAction(event, response) {
    if ('undefined' === typeof response.data.popup) {
      return;
    }
    const popupSettings = response.data.popup;
    if ('open' === popupSettings.action) {
      return madxartworkProFrontend.modules.popup.showPopup(popupSettings);
    }
    setTimeout(() => {
      return madxartworkProFrontend.modules.popup.closePopup(popupSettings, event);
    }, 1000);
  }
});
exports["default"] = _default;

/***/ })

}]);
//# sourceMappingURL=popup.bb4845c37d0713c117a7.bundle.js.map
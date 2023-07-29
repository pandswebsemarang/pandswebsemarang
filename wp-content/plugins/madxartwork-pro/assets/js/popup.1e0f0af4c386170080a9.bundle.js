/*! madxartwork-pro - v3.9.2 - 21-12-2022 */
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
//# sourceMappingURL=popup.1e0f0af4c386170080a9.bundle.js.map
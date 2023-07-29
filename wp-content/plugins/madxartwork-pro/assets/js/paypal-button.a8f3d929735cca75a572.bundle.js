/*! madxartwork-pro - v3.4.1 - 01-09-2021 */
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["paypal-button"],{

/***/ "../modules/payments/assets/js/frontend/handlers/paypal-button.js":
/*!************************************************************************!*\
  !*** ../modules/payments/assets/js/frontend/handlers/paypal-button.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class PayPalHandler extends madxartworkModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        button: '.madxartwork-button.madxartwork-paypal-legacy',
        errors: '.madxartwork-message-danger'
      }
    };
  }

  getDefaultElements() {
    const settings = this.getSettings();
    return {
      wrapper: this.$element[0],
      button: this.$element[0].querySelector(settings.selectors.button),
      errors: this.$element[0].querySelectorAll(settings.selectors.errors)
    };
  }

  handleClick(event) {
    if (0 < this.elements.errors.length) {
      event.preventDefault();
      this.elements.errors.forEach(error => {
        error.classList.remove('madxartwork-hidden');
      });
    }
  }

  bindEvents() {
    this.elements.button.addEventListener('click', this.handleClick.bind(this));
  }

}

exports.default = PayPalHandler;

/***/ })

}]);
//# sourceMappingURL=paypal-button.a8f3d929735cca75a572.bundle.js.map
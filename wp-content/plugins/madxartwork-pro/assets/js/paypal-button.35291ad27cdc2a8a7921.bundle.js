/*! madxartwork-pro - v3.9.2 - 21-12-2022 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["paypal-button"],{

/***/ "../modules/payments/assets/js/frontend/handlers/paypal-button.js":
/*!************************************************************************!*\
  !*** ../modules/payments/assets/js/frontend/handlers/paypal-button.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

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

exports["default"] = PayPalHandler;

/***/ })

}]);
//# sourceMappingURL=paypal-button.35291ad27cdc2a8a7921.bundle.js.map
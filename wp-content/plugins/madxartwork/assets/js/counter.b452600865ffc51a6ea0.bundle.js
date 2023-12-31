/*! madxartwork - v3.4.8 - 16-11-2021 */
(self["webpackChunkmadxartwork"] = self["webpackChunkmadxartwork"] || []).push([["counter"],{

/***/ "../assets/dev/js/frontend/handlers/counter.js":
/*!*****************************************************!*\
  !*** ../assets/dev/js/frontend/handlers/counter.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class Counter extends madxartworkModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        counterNumber: '.madxartwork-counter-number'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $counterNumber: this.$element.find(selectors.counterNumber)
    };
  }

  onInit() {
    super.onInit();
    this.intersectionObserver = madxartworkModules.utils.Scroll.scrollObserver({
      callback: event => {
        if (event.isInViewport) {
          this.intersectionObserver.unobserve(this.elements.$counterNumber[0]);
          const data = this.elements.$counterNumber.data(),
                decimalDigits = data.toValue.toString().match(/\.(.*)/);

          if (decimalDigits) {
            data.rounding = decimalDigits[1].length;
          }

          this.elements.$counterNumber.numerator(data);
        }
      }
    });
    this.intersectionObserver.observe(this.elements.$counterNumber[0]);
  }

}

exports.default = Counter;

/***/ })

}]);
//# sourceMappingURL=counter.b452600865ffc51a6ea0.bundle.js.map
/*! madxartwork - v3.4.4 - 13-09-2021 */
(self["webpackChunkmadxartwork"] = self["webpackChunkmadxartwork"] || []).push([["progress"],{

/***/ "../assets/dev/js/frontend/handlers/progress.js":
/*!******************************************************!*\
  !*** ../assets/dev/js/frontend/handlers/progress.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class Progress extends madxartworkModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        progressNumber: '.madxartwork-progress-bar'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $progressNumber: this.$element.find(selectors.progressNumber)
    };
  }

  onInit() {
    super.onInit();
    madxartworkFrontend.waypoint(this.elements.$progressNumber, () => {
      const $progressbar = this.elements.$progressNumber;
      $progressbar.css('width', $progressbar.data('max') + '%');
    });
  }

}

exports.default = Progress;

/***/ })

}]);
//# sourceMappingURL=progress.5306267e0436c8de4985.bundle.js.map
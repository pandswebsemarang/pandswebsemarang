/*! madxartwork-pro - v3.11.6 - 14-03-2023 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["social"],{

/***/ "../modules/social/assets/js/frontend/handlers/facebook.js":
/*!*****************************************************************!*\
  !*** ../modules/social/assets/js/frontend/handlers/facebook.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class FacebookHandler extends madxartworkModules.frontend.handlers.Base {
  getConfig() {
    return madxartworkProFrontend.config.facebook_sdk;
  }
  setConfig(prop, value) {
    madxartworkProFrontend.config.facebook_sdk[prop] = value;
  }
  parse() {
    // On FB SDK is loaded, parse current element
    FB.XFBML.parse(this.$element[0]);
  }
  loadSDK() {
    const config = this.getConfig();

    // Preventing from ajax request to be sent multiple times when loading multiple widgets
    if (config.isLoading || config.isLoaded) {
      return;
    }
    this.setConfig('isLoading', true);
    jQuery.ajax({
      url: 'https://connect.facebook.net/' + config.lang + '/sdk.js',
      dataType: 'script',
      cache: true,
      success: () => {
        FB.init({
          appId: config.app_id,
          version: 'v2.10',
          xfbml: false
        });
        this.setConfig('isLoaded', true);
        this.setConfig('isLoading', false);
        madxartworkFrontend.elements.$document.trigger('fb:sdk:loaded');
      }
    });
  }
  onInit() {
    super.onInit(...arguments);
    this.loadSDK();
    const config = this.getConfig();
    if (config.isLoaded) {
      this.parse();
    } else {
      madxartworkFrontend.elements.$document.on('fb:sdk:loaded', () => this.parse());
    }
  }
}
exports["default"] = FacebookHandler;

/***/ })

}]);
//# sourceMappingURL=social.02ea9f7665e0d131a2b5.bundle.js.map
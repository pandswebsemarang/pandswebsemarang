/*! madxartwork-pro - v3.9.2 - 21-12-2022 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["share-buttons"],{

/***/ "../modules/share-buttons/assets/js/frontend/handlers/share-buttons.js":
/*!*****************************************************************************!*\
  !*** ../modules/share-buttons/assets/js/frontend/handlers/share-buttons.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _default = madxartworkModules.frontend.handlers.Base.extend({
  async onInit() {
    if (!this.isActive()) {
      return;
    }

    madxartworkModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    const elementSettings = this.getElementSettings(),
          classes = this.getSettings('classes'),
          isCustomURL = elementSettings.share_url && elementSettings.share_url.url,
          shareLinkSettings = {
      classPrefix: classes.shareLinkPrefix
    };

    if (isCustomURL) {
      shareLinkSettings.url = elementSettings.share_url.url;
    } else {
      shareLinkSettings.url = location.href;
      shareLinkSettings.title = madxartworkFrontend.config.post.title;
      shareLinkSettings.text = madxartworkFrontend.config.post.excerpt;
      shareLinkSettings.image = madxartworkFrontend.config.post.featuredImage;
    }
    /**
     * First check of the ShareLink is for detecting if the optimized mode is disabled and the library should be loaded dynamically.
     * Checking if the assetsLoader exist, in case that the library is not loaded due to Ad Blockers and not because the optimized mode is enabled.
     */


    if (!window.ShareLink && madxartworkFrontend.utils.assetsLoader) {
      await madxartworkFrontend.utils.assetsLoader.load('script', 'share-link');
    }
    /**
     * The following condition should remain regardless of the share-link dynamic loading.
     * Ad Blockers may block the share script. (/assets/lib/share-link/share-link.js).
     */


    if (!this.elements.$shareButton.shareLink) {
      return;
    }

    this.elements.$shareButton.shareLink(shareLinkSettings);
  },

  getDefaultSettings() {
    return {
      selectors: {
        shareButton: '.madxartwork-share-btn'
      },
      classes: {
        shareLinkPrefix: 'madxartwork-share-btn_'
      }
    };
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors');
    return {
      $shareButton: this.$element.find(selectors.shareButton)
    };
  },

  isActive() {
    return !madxartworkFrontend.isEditMode();
  }

});

exports["default"] = _default;

/***/ })

}]);
//# sourceMappingURL=share-buttons.d46ad1a7ae4811ddf539.bundle.js.map
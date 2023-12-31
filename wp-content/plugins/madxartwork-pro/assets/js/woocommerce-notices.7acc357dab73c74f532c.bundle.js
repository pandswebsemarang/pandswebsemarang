/*! madxartwork-pro - v3.9.2 - 21-12-2022 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["woocommerce-notices"],{

/***/ "../modules/woocommerce/assets/js/frontend/handlers/notices.js":
/*!*********************************************************************!*\
  !*** ../modules/woocommerce/assets/js/frontend/handlers/notices.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

class _default extends madxartworkModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        woocommerceNotices: '.woocommerce-NoticeGroup, :not(.woocommerce-NoticeGroup) .woocommerce-error, :not(.woocommerce-NoticeGroup) .woocommerce-message, :not(.woocommerce-NoticeGroup) .woocommerce-info',
        noticesWrapper: '.e-woocommerce-notices-wrapper'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $documentScrollToElements: madxartworkFrontend.elements.$document.find('html, body'),
      $woocommerceCheckoutForm: madxartworkFrontend.elements.$body.find('.form.checkout'),
      $noticesWrapper: this.$element.find(selectors.noticesWrapper)
    };
  }

  moveNotices() {
    let scrollToNotices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const selectors = this.getSettings('selectors');
    let $notices = madxartworkFrontend.elements.$body.find(selectors.woocommerceNotices);

    if (madxartworkFrontend.isEditMode() || madxartworkFrontend.isWPPreviewMode()) {
      $notices = $notices.filter(':not(.e-notices-demo-notice)');
    }

    if (scrollToNotices) {
      this.elements.$documentScrollToElements.stop();
    }

    this.elements.$noticesWrapper.prepend($notices);

    if (!this.is_ready) {
      this.elements.$noticesWrapper.removeClass('e-woocommerce-notices-wrapper-loading');
      this.is_ready = true;
    }

    if (scrollToNotices) {
      let $scrollToElement = $notices;

      if (!$scrollToElement.length) {
        $scrollToElement = this.elements.$woocommerceCheckoutForm;
      }

      if ($scrollToElement.length) {
        // Scrolls to the notice and puts it in the middle of the window so users' attention is drawn to it.
        this.elements.$documentScrollToElements.animate({
          scrollTop: $scrollToElement.offset().top - document.documentElement.clientHeight / 2
        }, 1000);
      }
    }
  }

  onInit() {
    super.onInit();
    this.is_ready = false;
    this.moveNotices(true);
  }

  bindEvents() {
    madxartworkFrontend.elements.$body.on('updated_wc_div updated_checkout updated_cart_totals applied_coupon removed_coupon applied_coupon_in_checkout removed_coupon_in_checkout checkout_error', () => this.moveNotices(true));
  }

}

exports["default"] = _default;

/***/ })

}]);
//# sourceMappingURL=woocommerce-notices.7acc357dab73c74f532c.bundle.js.map
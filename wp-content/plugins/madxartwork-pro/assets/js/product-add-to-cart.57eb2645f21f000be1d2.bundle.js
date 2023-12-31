/*! madxartwork-pro - v3.9.2 - 21-12-2022 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["product-add-to-cart"],{

/***/ "../modules/woocommerce/assets/js/frontend/handlers/base.js":
/*!******************************************************************!*\
  !*** ../modules/woocommerce/assets/js/frontend/handlers/base.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

class Base extends madxartworkModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        stickyRightColumn: '.e-sticky-right-column'
      },
      classes: {
        stickyRightColumnActive: 'e-sticky-right-column--active'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $stickyRightColumn: this.$element.find(selectors.stickyRightColumn)
    };
  }

  bindEvents() {
    // Add our wrapper class around the select2 whenever it is opened.
    madxartworkFrontend.elements.$document.on('select2:open', event => {
      this.addSelect2Wrapper(event);
    });
  }

  addSelect2Wrapper(event) {
    // The select element is recaptured every time because the markup can refresh
    const selectElement = jQuery(event.target).data('select2');

    if (selectElement.$dropdown) {
      selectElement.$dropdown.addClass('e-woo-select2-wrapper');
    }
  }

  isStickyRightColumnActive() {
    const classes = this.getSettings('classes');
    return this.elements.$stickyRightColumn.hasClass(classes.stickyRightColumnActive);
  }

  activateStickyRightColumn() {
    const elementSettings = this.getElementSettings(),
          $wpAdminBar = madxartworkFrontend.elements.$wpAdminBar,
          classes = this.getSettings('classes');
    let stickyOptionsOffset = elementSettings.sticky_right_column_offset || 0;

    if ($wpAdminBar.length && 'fixed' === $wpAdminBar.css('position')) {
      stickyOptionsOffset += $wpAdminBar.height();
    }

    if ('yes' === this.getElementSettings('sticky_right_column')) {
      this.elements.$stickyRightColumn.addClass(classes.stickyRightColumnActive);
      this.elements.$stickyRightColumn.css('top', stickyOptionsOffset + 'px');
    }
  }

  deactivateStickyRightColumn() {
    if (!this.isStickyRightColumnActive()) {
      return;
    }

    const classes = this.getSettings('classes');
    this.elements.$stickyRightColumn.removeClass(classes.stickyRightColumnActive);
  }
  /**
   * Activates the sticky column
   *
   * @return {void}
   */


  toggleStickyRightColumn() {
    if (!this.getElementSettings('sticky_right_column')) {
      this.deactivateStickyRightColumn();
      return;
    }

    if (!this.isStickyRightColumnActive()) {
      this.activateStickyRightColumn();
    }
  }

  equalizeElementHeight($element) {
    if ($element.length) {
      $element.removeAttr('style'); // First remove the custom height we added so that the new height can be re-calculated according to the content

      let maxHeight = 0;
      $element.each((index, element) => {
        maxHeight = Math.max(maxHeight, element.offsetHeight);
      });

      if (0 < maxHeight) {
        $element.css({
          height: maxHeight + 'px'
        });
      }
    }
  }
  /**
   * WooCommerce prints the Purchase Note separated from the product name by a border and padding.
   * In madxartwork's Order Summary design, the product name and purchase note are displayed un-separated.
   * To achieve this design, it is necessary to access the Product Name line before the Purchase Note line to adjust
   * its padding. Since this cannot be achieved in CSS, it is done in this method.
   *
   * @param {Object} $element
   *
   * @return {void}
   */


  removePaddingBetweenPurchaseNote($element) {
    if ($element) {
      $element.each((index, element) => {
        jQuery(element).prev().children('td').addClass('product-purchase-note-is-below');
      });
    }
  }
  /**
   * `madxartworkPageId` and `madxartworkWidgetId` are added to the url in the `_wp_http_referer` input which is then
   * received when WooCommerce does its cart and checkout ajax requests e.g `update_order_review` and `update_cart`.
   * These query strings are extracted from the url and used in our `load_widget_before_wc_ajax` method.
   */


  updateWpReferers() {
    const selectors = this.getSettings('selectors'),
          wpHttpRefererInputs = this.$element.find(selectors.wpHttpRefererInputs),
          url = new URL(document.location);
    url.searchParams.set('madxartworkPageId', madxartworkFrontend.config.post.id);
    url.searchParams.set('madxartworkWidgetId', this.getID());
    wpHttpRefererInputs.attr('value', url);
  }

}

exports["default"] = Base;

/***/ }),

/***/ "../modules/woocommerce/assets/js/frontend/handlers/product-add-to-cart.js":
/*!*********************************************************************************!*\
  !*** ../modules/woocommerce/assets/js/frontend/handlers/product-add-to-cart.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../modules/woocommerce/assets/js/frontend/handlers/base.js"));

class ProductAddToCart extends _base.default {
  getDefaultSettings() {
    return {
      selectors: {
        quantityInput: '.e-loop-add-to-cart-form input.qty',
        addToCartButton: '.e-loop-add-to-cart-form .ajax_add_to_cart',
        addedToCartButton: '.added_to_cart',
        loopFormContainer: '.e-loop-add-to-cart-form-container'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $quantityInput: this.$element.find(selectors.quantityInput),
      $addToCartButton: this.$element.find(selectors.addToCartButton)
    };
  }

  updateAddToCartButtonQuantity() {
    this.elements.$addToCartButton.attr('data-quantity', this.elements.$quantityInput.val());
  }

  handleAddedToCart($button) {
    const selectors = this.getSettings('selectors'),
          $addToCartButton = $button.siblings(selectors.addedToCartButton),
          $loopFormContainer = $addToCartButton.parents(selectors.loopFormContainer);
    $loopFormContainer.children(selectors.addedToCartButton).remove();
    $loopFormContainer.append($addToCartButton);
  }

  bindEvents() {
    super.bindEvents(...arguments);
    this.elements.$quantityInput.on('change', () => {
      this.updateAddToCartButtonQuantity();
    });
    madxartworkFrontend.elements.$body.off('added_to_cart.madxartwork-woocommerce-product-add-to-cart');
    madxartworkFrontend.elements.$body.on('added_to_cart.madxartwork-woocommerce-product-add-to-cart', (e, fragments, cartHash, $button) => {
      this.handleAddedToCart($button);
    });
  }

}

exports["default"] = ProductAddToCart;

/***/ })

}]);
//# sourceMappingURL=product-add-to-cart.57eb2645f21f000be1d2.bundle.js.map
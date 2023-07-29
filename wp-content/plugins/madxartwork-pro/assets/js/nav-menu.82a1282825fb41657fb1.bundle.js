/*! madxartwork-pro - v3.11.6 - 14-03-2023 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["nav-menu"],{

/***/ "../modules/nav-menu/assets/js/frontend/handlers/nav-menu.js":
/*!*******************************************************************!*\
  !*** ../modules/nav-menu/assets/js/frontend/handlers/nav-menu.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = madxartworkModules.frontend.handlers.Base.extend({
  stretchElement: null,
  getDefaultSettings() {
    return {
      selectors: {
        menu: '.madxartwork-nav-menu',
        anchorLink: '.madxartwork-nav-menu--main .madxartwork-item-anchor',
        dropdownMenu: '.madxartwork-nav-menu__container.madxartwork-nav-menu--dropdown',
        menuToggle: '.madxartwork-menu-toggle'
      }
    };
  },
  getDefaultElements() {
    var selectors = this.getSettings('selectors'),
      elements = {};
    elements.$menu = this.$element.find(selectors.menu);
    elements.$anchorLink = this.$element.find(selectors.anchorLink);
    elements.$dropdownMenu = this.$element.find(selectors.dropdownMenu);
    elements.$dropdownMenuFinalItems = elements.$dropdownMenu.find('.menu-item:not(.menu-item-has-children) > a');
    elements.$menuToggle = this.$element.find(selectors.menuToggle);
    elements.$links = elements.$dropdownMenu.find('a.madxartwork-item');
    return elements;
  },
  bindEvents() {
    if (!this.elements.$menu.length) {
      return;
    }
    this.elements.$menuToggle.on('click', this.toggleMenu.bind(this));
    if (this.getElementSettings('full_width')) {
      this.elements.$dropdownMenuFinalItems.on('click', this.toggleMenu.bind(this, false));
    }
    madxartworkFrontend.addListenerOnce(this.$element.data('model-cid'), 'resize', this.stretchMenu);
    madxartworkFrontend.addListenerOnce(this.$element.data('model-cid'), 'scroll', this.debounce(this.reassignMobileMenuHeight, 250));
  },
  initStretchElement() {
    this.stretchElement = new madxartworkModules.frontend.tools.StretchElement({
      element: this.elements.$dropdownMenu
    });
  },
  toggleNavLinksTabIndex() {
    let enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.elements.$links.attr('tabindex', enabled ? 0 : -1);
  },
  toggleMenu(show) {
    var isDropdownVisible = this.elements.$menuToggle.hasClass('madxartwork-active');
    if ('boolean' !== typeof show) {
      show = !isDropdownVisible;
    }
    this.elements.$menuToggle.attr('aria-expanded', show);
    this.elements.$dropdownMenu.attr('aria-hidden', !show);
    this.elements.$menuToggle.toggleClass('madxartwork-active', show);
    this.toggleNavLinksTabIndex(show);
    this.reassignMobileMenuHeight(show);
    if (show && this.getElementSettings('full_width')) {
      this.stretchElement.stretch();
    }
  },
  followMenuAnchors() {
    var self = this;
    self.elements.$anchorLink.each(function () {
      if (location.pathname === this.pathname && '' !== this.hash) {
        self.followMenuAnchor(jQuery(this));
      }
    });
  },
  followMenuAnchor($element) {
    const anchorSelector = $element[0].hash;
    let offset = -300,
      $anchor;
    try {
      // `decodeURIComponent` for UTF8 characters in the hash.
      $anchor = jQuery(decodeURIComponent(anchorSelector));
    } catch (e) {
      return;
    }
    if (!$anchor.length) {
      return;
    }
    if (!$anchor.hasClass('madxartwork-menu-anchor')) {
      var halfViewport = jQuery(window).height() / 2;
      offset = -$anchor.outerHeight() + halfViewport;
    }
    madxartworkFrontend.waypoint($anchor, function (direction) {
      if ('down' === direction) {
        $element.addClass('madxartwork-item-active');
      } else {
        $element.removeClass('madxartwork-item-active');
      }
    }, {
      offset: '50%',
      triggerOnce: false
    });
    madxartworkFrontend.waypoint($anchor, function (direction) {
      if ('down' === direction) {
        $element.removeClass('madxartwork-item-active');
      } else {
        $element.addClass('madxartwork-item-active');
      }
    }, {
      offset,
      triggerOnce: false
    });
  },
  stretchMenu() {
    if (this.getElementSettings('full_width')) {
      this.stretchElement.stretch();
      this.elements.$dropdownMenu.css('top', this.elements.$menuToggle.outerHeight());
    } else {
      this.stretchElement.reset();
    }
  },
  onInit() {
    madxartworkModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    if (!this.elements.$menu.length) {
      return;
    }
    const elementSettings = this.getElementSettings(),
      iconValue = elementSettings.submenu_icon.value;
    let subIndicatorsContent = '';
    if (iconValue) {
      // The value of iconValue can be either className inside the editor or a markup in the frontend.
      subIndicatorsContent = iconValue.indexOf('<') > -1 ? iconValue : `<i class="${iconValue}"></i>`;
    }

    // SubIndicators param - Added for backwards compatibility:
    // If the old 'indicator' control value = 'none', the <span class="sub-arrow"> wrapper element is removed
    this.elements.$menu.smartmenus({
      subIndicators: '' !== subIndicatorsContent,
      subIndicatorsText: subIndicatorsContent,
      subIndicatorsPos: 'append',
      subMenusMaxWidth: '1000px'
    });
    this.initStretchElement();
    this.stretchMenu();
    if (!madxartworkFrontend.isEditMode()) {
      this.followMenuAnchors();
    }
  },
  onElementChange(propertyName) {
    if ('full_width' === propertyName) {
      this.stretchMenu();
    }
  },
  calculateStickyMenuNavHeight() {
    const menuToggleHeight = this.elements.$dropdownMenu?.offset().top - jQuery(window).scrollTop();
    return madxartworkFrontend.elements.$window.height() - menuToggleHeight;
  },
  isElementSticky() {
    return this.$element.hasClass('madxartwork-sticky') || this.$element.parents('.madxartwork-sticky').length;
  },
  getMenuHeight() {
    // Max-height value is fixed to 1000vmax in order to allow the mobile menu closing animation.
    return this.isElementSticky() ? this.calculateStickyMenuNavHeight() + 'px' : '1000vmax';
  },
  setMenuHeight(menuHeight) {
    this.elements.$dropdownMenu.css('--menu-height', menuHeight);
  },
  reassignMobileMenuHeight() {
    const menuHeight = this.elements.$menuToggle.hasClass('madxartwork-active') ? this.getMenuHeight() : 0;
    return this.setMenuHeight(menuHeight);
  },
  debounce(fn, time) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, time);
    };
  }
});
exports["default"] = _default;

/***/ })

}]);
//# sourceMappingURL=nav-menu.82a1282825fb41657fb1.bundle.js.map
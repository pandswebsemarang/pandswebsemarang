/*! madxartwork-pro - v3.9.2 - 21-12-2022 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["posts"],{

/***/ "../modules/posts/assets/js/frontend/handlers/cards.js":
/*!*************************************************************!*\
  !*** ../modules/posts/assets/js/frontend/handlers/cards.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _posts = _interopRequireDefault(__webpack_require__(/*! ./posts */ "../modules/posts/assets/js/frontend/handlers/posts.js"));

var _default = _posts.default.extend({
  getSkinPrefix() {
    return 'cards_';
  }

});

exports["default"] = _default;

/***/ }),

/***/ "../modules/posts/assets/js/frontend/handlers/posts.js":
/*!*************************************************************!*\
  !*** ../modules/posts/assets/js/frontend/handlers/posts.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _default = madxartworkModules.frontend.handlers.Base.extend({
  getSkinPrefix() {
    return 'classic_';
  },

  bindEvents() {
    madxartworkFrontend.addListenerOnce(this.getModelCID(), 'resize', this.onWindowResize);
  },

  unbindEvents() {
    madxartworkFrontend.removeListeners(this.getModelCID(), 'resize', this.onWindowResize);
  },

  getClosureMethodsNames() {
    return madxartworkModules.frontend.handlers.Base.prototype.getClosureMethodsNames.apply(this, arguments).concat(['fitImages', 'onWindowResize', 'runMasonry']);
  },

  getDefaultSettings() {
    return {
      classes: {
        fitHeight: 'madxartwork-fit-height',
        hasItemRatio: 'madxartwork-has-item-ratio'
      },
      selectors: {
        postsContainer: '.madxartwork-posts-container',
        post: '.madxartwork-post',
        postThumbnail: '.madxartwork-post__thumbnail',
        postThumbnailImage: '.madxartwork-post__thumbnail img'
      }
    };
  },

  getDefaultElements() {
    var selectors = this.getSettings('selectors');
    return {
      $postsContainer: this.$element.find(selectors.postsContainer),
      $posts: this.$element.find(selectors.post)
    };
  },

  fitImage($post) {
    var settings = this.getSettings(),
        $imageParent = $post.find(settings.selectors.postThumbnail),
        $image = $imageParent.find('img'),
        image = $image[0];

    if (!image) {
      return;
    }

    var imageParentRatio = $imageParent.outerHeight() / $imageParent.outerWidth(),
        imageRatio = image.naturalHeight / image.naturalWidth;
    $imageParent.toggleClass(settings.classes.fitHeight, imageRatio < imageParentRatio);
  },

  fitImages() {
    var $ = jQuery,
        self = this,
        itemRatio = getComputedStyle(this.$element[0], ':after').content,
        settings = this.getSettings();

    if (self.isMasonryEnabled()) {
      this.elements.$postsContainer.removeClass(settings.classes.hasItemRatio);
      return;
    }

    this.elements.$postsContainer.toggleClass(settings.classes.hasItemRatio, !!itemRatio.match(/\d/));
    this.elements.$posts.each(function () {
      var $post = $(this),
          $image = $post.find(settings.selectors.postThumbnailImage);
      self.fitImage($post);
      $image.on('load', function () {
        self.fitImage($post);
      });
    });
  },

  setColsCountSettings() {
    var currentDeviceMode = madxartworkFrontend.getCurrentDeviceMode(),
        settings = this.getElementSettings(),
        skinPrefix = this.getSkinPrefix(),
        colsCount;

    switch (currentDeviceMode) {
      case 'mobile':
        colsCount = settings[skinPrefix + 'columns_mobile'];
        break;

      case 'tablet':
        colsCount = settings[skinPrefix + 'columns_tablet'];
        break;

      default:
        colsCount = settings[skinPrefix + 'columns'];
    }

    this.setSettings('colsCount', colsCount);
  },

  isMasonryEnabled() {
    return !!this.getElementSettings(this.getSkinPrefix() + 'masonry');
  },

  initMasonry() {
    imagesLoaded(this.elements.$posts, this.runMasonry);
  },

  getVerticalSpaceBetween() {
    /* The `verticalSpaceBetween` variable is setup in a way that supports older versions of the portfolio widget */
    let verticalSpaceBetween = this.getElementSettings(this.getSkinPrefix() + 'row_gap.size');

    if ('' === this.getSkinPrefix() && '' === verticalSpaceBetween) {
      verticalSpaceBetween = this.getElementSettings(this.getSkinPrefix() + 'item_gap.size');
    }

    return verticalSpaceBetween;
  },

  runMasonry() {
    var elements = this.elements;
    elements.$posts.css({
      marginTop: '',
      transitionDuration: ''
    });
    this.setColsCountSettings();
    var colsCount = this.getSettings('colsCount'),
        hasMasonry = this.isMasonryEnabled() && colsCount >= 2;
    elements.$postsContainer.toggleClass('madxartwork-posts-masonry', hasMasonry);

    if (!hasMasonry) {
      elements.$postsContainer.height('');
      return;
    }

    const verticalSpaceBetween = this.getVerticalSpaceBetween();
    var masonry = new madxartworkModules.utils.Masonry({
      container: elements.$postsContainer,
      items: elements.$posts.filter(':visible'),
      columnsCount: this.getSettings('colsCount'),
      verticalSpaceBetween: verticalSpaceBetween || 0
    });
    masonry.run();
  },

  run() {
    // For slow browsers
    setTimeout(this.fitImages, 0);
    this.initMasonry();
  },

  onInit() {
    madxartworkModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.bindEvents();
    this.run();
  },

  onWindowResize() {
    this.fitImages();
    this.runMasonry();
  },

  onElementChange() {
    this.fitImages();
    setTimeout(this.runMasonry);
  }

});

exports["default"] = _default;

/***/ })

}]);
//# sourceMappingURL=posts.7b1a67013e130f316101.bundle.js.map
/*! madxartwork-pro - v3.9.2 - 21-12-2022 */
"use strict";
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["loop"],{

/***/ "../assets/dev/js/preview/utils/document-handle.js":
/*!*********************************************************!*\
  !*** ../assets/dev/js/preview/utils/document-handle.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createElement = createElement;
exports["default"] = addDocumentHandle;
const EDIT_HANDLE_CLASS_NAME = 'madxartwork-document-handle';
const EDIT_MODE_CLASS_NAME = 'madxartwork-edit-mode';
const EDIT_CONTEXT = 'edit';
const SAVE_HANDLE_CLASS_NAME = 'madxartwork-document-save-back-handle';
const SAVE_CONTEXT = 'save';
/**
 * @param {Object}        handleTarget
 * @param {HTMLElement}   handleTarget.element
 * @param {string|number} handleTarget.id      - Document ID.
 * @param {string}        handleTarget.title
 * @param {string}        context              - Edit/Save
 * @param {Function|null} onCloseDocument      - Callback to run when outgoing document is closed.
 */

function addDocumentHandle(_ref) {
  let {
    element,
    id,
    title = __('Template', 'madxartwork-pro')
  } = _ref;
  let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EDIT_CONTEXT;
  let onCloseDocument = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (EDIT_CONTEXT === context) {
    if (!id || !element) {
      throw Error('`id` and `element` are required.');
    }

    if (isCurrentlyEditing(element) || hasHandle(element)) {
      return;
    }
  }

  const handleElement = createHandleElement({
    title,
    onClick: () => onDocumentClick(id, context, onCloseDocument)
  }, context);
  element.prepend(handleElement);

  if (EDIT_CONTEXT === context) {
    element.dataset.editablemadxartworkDocument = id;
  }
}
/**
 * @param {HTMLElement} element
 *
 * @return {boolean} Whether the element is currently being edited.
 */


function isCurrentlyEditing(element) {
  return element.classList.contains(EDIT_MODE_CLASS_NAME);
}
/**
 * @param {HTMLElement} element
 *
 * @return {boolean} Whether the element has a handle.
 */


function hasHandle(element) {
  return !!element.querySelector(`:scope > .${EDIT_HANDLE_CLASS_NAME}`);
}
/**
 * @param {Object}   handleProperties
 * @param {string}   handleProperties.title
 * @param {Function} handleProperties.onClick
 * @param {string}   context
 *
 * @return {HTMLElement} The newly generated Handle element
 */


function createHandleElement(_ref2, context) {
  let {
    title,
    onClick
  } = _ref2;
  const element = createElement({
    tag: 'div',
    classNames: EDIT_CONTEXT === context ? [EDIT_HANDLE_CLASS_NAME] : [EDIT_HANDLE_CLASS_NAME, SAVE_HANDLE_CLASS_NAME],
    children: [createElement({
      tag: 'i',
      classNames: [getHandleIcon(context)]
    }), createElement({
      tag: 'div',
      classNames: [`${EDIT_CONTEXT === context ? EDIT_HANDLE_CLASS_NAME : SAVE_HANDLE_CLASS_NAME}__title`],
      children: [document.createTextNode(EDIT_CONTEXT === context ? __('Edit %s', 'madxartwork-pro').replace('%s', title) : __('Save %s', 'madxartwork-pro').replace('%s', title))]
    })]
  });
  element.addEventListener('click', onClick);
  return element;
}

function getHandleIcon(context) {
  let icon = 'eicon-edit';

  if (SAVE_CONTEXT === context) {
    icon = madxartworkFrontend.config.is_rtl ? 'eicon-arrow-right' : 'eicon-arrow-left';
  }

  return icon;
}
/**
 * Util for creating HTML element.
 *
 * @param {Object}        elementProperties
 * @param {string}        elementProperties.tag
 * @param {string[]}      elementProperties.classNames
 * @param {HTMLElement[]} elementProperties.children
 *
 * @return {HTMLElement} Generated Element
 */


function createElement(_ref3) {
  let {
    tag,
    classNames = [],
    children = []
  } = _ref3;
  const element = document.createElement(tag);
  element.classList.add(...classNames);
  children.forEach(child => element.appendChild(child));
  return element;
}
/**
 * @param {string|number} id
 * @param {string}        context
 * @param {Function|null} onCloseDocument
 *
 * @return {Promise<void>}
 */


async function onDocumentClick(id, context) {
  let onCloseDocument = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (EDIT_CONTEXT === context) {
    window.top.$e.internal('panel/state-loading');
    await window.top.$e.run('editor/documents/switch', {
      id: parseInt(id),
      onClose: onCloseDocument
    });
    window.top.$e.internal('panel/state-ready');
  } else {
    madxartworkCommon.api.internal('panel/state-loading');
    madxartworkCommon.api.run('editor/documents/switch', {
      id: madxartwork.config.initial_document.id,
      mode: 'save',
      shouldScroll: false
    }).finally(() => madxartworkCommon.api.internal('panel/state-ready'));
  }
}

/***/ }),

/***/ "../modules/loop-builder/assets/js/frontend/handlers/loop-grid.js":
/*!************************************************************************!*\
  !*** ../modules/loop-builder/assets/js/frontend/handlers/loop-grid.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _posts = _interopRequireDefault(__webpack_require__(/*! modules/posts/assets/js/frontend/handlers/posts */ "../modules/posts/assets/js/frontend/handlers/posts.js"));

var _documentHandle = _interopRequireDefault(__webpack_require__(/*! madxartwork-pro/preview/utils/document-handle */ "../assets/dev/js/preview/utils/document-handle.js"));

class LoopGrid extends _posts.default {
  getSkinPrefix() {
    return '';
  }

  getDefaultSettings() {
    const defaultSettings = super.getDefaultSettings();
    defaultSettings.selectors.post = '.madxartwork-loop-container .madxartwork';
    defaultSettings.selectors.postsContainer = '.madxartwork-loop-container';
    return defaultSettings;
  }
  /**
   * Fit Images is used in the extended Posts widget handler to apply the "Image Size", "Image Ratio" and
   * "Image Width" controls. These controls don't exist in the Loop Grid widget, so we override `fitImages()`
   * to disable it's functionality.
   */


  fitImages() {}

  getVerticalSpaceBetween() {
    return this.getElementSettings(this.getSkinPrefix() + 'row_gap.size');
  }
  /**
   * This is a callback that runs when the "Edit Template" document handle is clicked in the Editor.
   */


  onInPlaceEditTemplate() {
    const templateID = this.getElementSettings('template_id'),
          elementsToRemove = ['style#loop-' + templateID, 'link#font-loop-' + templateID, 'style#loop-dynamic-' + templateID];
    elementsToRemove.forEach(elementToRemove => {
      this.$element.find(elementToRemove).remove();
    });
  }

  attachEditDocumentHandle() {
    // eslint-disable-next-line computed-property-spacing
    const element = this.$element.find('[data-madxartwork-type="loop-item"]').first()[0],
          id = this.getElementSettings('template_id');

    if (element && id) {
      (0, _documentHandle.default)({
        element,
        title: __('Template', 'madxartwork-pro'),
        id
      }, 'edit', () => this.onInPlaceEditTemplate());
    }
  }

  handleCTA() {
    const emptyViewContainer = document.querySelector(`[data-id="${this.getID()}"] .e-loop-empty-view__wrapper`);

    if (!emptyViewContainer) {
      return;
    }

    const shadowRoot = emptyViewContainer.attachShadow({
      mode: 'open'
    });
    shadowRoot.appendChild(madxartworkPro.modules.loopBuilder.getCtaStyles());
    shadowRoot.appendChild(madxartworkPro.modules.loopBuilder.getCtaContent());
    const ctaButton = shadowRoot.querySelector('.e-loop-empty-view__box-cta');
    ctaButton.addEventListener('click', () => {
      madxartworkPro.modules.loopBuilder.createTemplate();
    });
  }
  /**
   * Allows 3rd party add-ons to run code on the Loop Grid handler when the handler is initialized in the Editor.
   */


  doEditorInitAction() {
    madxartwork.hooks.doAction('editor/widgets/loop-grid/on-init', this);
  }

  onInit() {
    super.onInit(...arguments);

    if (madxartworkFrontend.isEditMode()) {
      this.doEditorInitAction();
      this.attachEditDocumentHandle();
      this.handleCTA();
    }
  }

}

exports["default"] = LoopGrid;

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
//# sourceMappingURL=loop.1ec2eba54ab8dc79374e.bundle.js.map
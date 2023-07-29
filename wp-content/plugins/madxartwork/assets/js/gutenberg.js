/*! madxartwork - v3.11.5 - 14-03-2023 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/i18n":
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/***/ ((module) => {

module.exports = wp.i18n;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************!*\
  !*** ../assets/dev/js/admin/gutenberg.js ***!
  \*******************************************/
/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


/* global madxartworkGutenbergSettings */
(function ($) {
  'use strict';

  var madxartworkGutenbergApp = {
    cacheElements: function cacheElements() {
      var self = this;
      self.ismadxartworkMode = madxartworkGutenbergSettings.ismadxartworkMode;
      self.cache = {};
      self.cache.$gutenberg = $('#editor');
      self.cache.$switchMode = $($('#madxartwork-gutenberg-button-switch-mode').html());
      self.cache.$switchModeButton = self.cache.$switchMode.find('#madxartwork-switch-mode-button');
      self.bindEvents();
      self.toggleStatus();
      wp.data.subscribe(function () {
        setTimeout(function () {
          self.buildPanel();
        }, 1);
      });
    },
    buildPanel: function buildPanel() {
      var self = this;
      if (!self.cache.$gutenberg.find('#madxartwork-switch-mode').length) {
        self.cache.$gutenberg.find('.edit-post-header-toolbar').append(self.cache.$switchMode);
      }
      if (!$('#madxartwork-editor').length) {
        self.cache.$editorPanel = $($('#madxartwork-gutenberg-panel').html());
        // TODO: `editor-block-list__layout` class for WP < 5.3 support.
        self.cache.$gurenbergBlockList = self.cache.$gutenberg.find('.editor-block-list__layout, .editor-post-text-editor, .block-editor-block-list__layout');
        self.cache.$gurenbergBlockList.after(self.cache.$editorPanel);
        self.cache.$editorPanelButton = self.cache.$editorPanel.find('#madxartwork-go-to-edit-page-link');
        self.cache.$editorPanelButton.on('click', function (event) {
          event.preventDefault();
          self.animateLoader();

          // A new post is initialized as an 'auto-draft'.
          // if the post is not a new post it should not save it to avoid some saving conflict between madxartwork and gutenberg.
          var isNewPost = 'auto-draft' === wp.data.select('core/editor').getCurrentPost().status;
          if (isNewPost) {
            var documentTitle = wp.data.select('core/editor').getEditedPostAttribute('title');
            if (!documentTitle) {
              wp.data.dispatch('core/editor').editPost({
                title: 'madxartwork #' + $('#post_ID').val()
              });
            }
            wp.data.dispatch('core/editor').savePost();
          }
          self.redirectWhenSave();
        });
      }
    },
    bindEvents: function bindEvents() {
      var self = this;
      self.cache.$switchModeButton.on('click', function () {
        if (self.ismadxartworkMode) {
          madxartworkCommon.dialogsManager.createWidget('confirm', {
            message: __('Please note that you are switching to WordPress default editor. Your current layout, design and content might break.', 'madxartwork'),
            headerMessage: __('Back to WordPress Editor', 'madxartwork'),
            strings: {
              confirm: __('Continue', 'madxartwork'),
              cancel: __('Cancel', 'madxartwork')
            },
            defaultOption: 'confirm',
            onConfirm: function onConfirm() {
              var wpEditor = wp.data.dispatch('core/editor');
              wpEditor.editPost({
                gutenberg_madxartwork_mode: false
              });
              wpEditor.savePost();
              self.ismadxartworkMode = !self.ismadxartworkMode;
              self.toggleStatus();
            }
          }).show();
        } else {
          self.ismadxartworkMode = !self.ismadxartworkMode;
          self.toggleStatus();
          self.cache.$editorPanelButton.trigger('click');
        }
      });
    },
    redirectWhenSave: function redirectWhenSave() {
      var self = this;
      setTimeout(function () {
        if (wp.data.select('core/editor').isSavingPost()) {
          self.redirectWhenSave();
        } else {
          location.href = madxartworkGutenbergSettings.editLink;
        }
      }, 300);
    },
    animateLoader: function animateLoader() {
      this.cache.$editorPanelButton.addClass('madxartwork-animate');
    },
    toggleStatus: function toggleStatus() {
      jQuery('body').toggleClass('madxartwork-editor-active', this.ismadxartworkMode).toggleClass('madxartwork-editor-inactive', !this.ismadxartworkMode);
    },
    init: function init() {
      this.cacheElements();
    }
  };
  $(function () {
    madxartworkGutenbergApp.init();
  });
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=gutenberg.js.map
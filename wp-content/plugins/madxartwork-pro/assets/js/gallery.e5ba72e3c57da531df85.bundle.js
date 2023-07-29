/*! madxartwork-pro - v3.4.1 - 01-09-2021 */
(self["webpackChunkmadxartwork_pro"] = self["webpackChunkmadxartwork_pro"] || []).push([["gallery"],{

/***/ "../modules/gallery/assets/js/frontend/handler.js":
/*!********************************************************!*\
  !*** ../modules/gallery/assets/js/frontend/handler.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class galleryHandler extends madxartworkModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        container: '.madxartwork-gallery__container',
        galleryTitles: '.madxartwork-gallery-title',
        galleryImages: '.e-gallery-image',
        galleryItemOverlay: '.madxartwork-gallery-item__overlay',
        galleryItemContent: '.madxartwork-gallery-item__content'
      },
      classes: {
        activeTitle: 'madxartwork-item-active'
      }
    };
  }

  getDefaultElements() {
    const {
      selectors
    } = this.getSettings(),
          elements = {
      $container: this.$element.find(selectors.container),
      $titles: this.$element.find(selectors.galleryTitles)
    };
    elements.$items = elements.$container.children();
    elements.$images = elements.$items.children(selectors.galleryImages);
    elements.$itemsOverlay = elements.$items.children(selectors.galleryItemOverlay);
    elements.$itemsContent = elements.$items.children(selectors.galleryItemContent);
    elements.$itemsContentElements = elements.$itemsContent.children();
    return elements;
  }

  getGallerySettings() {
    const settings = this.getElementSettings(),
          activeBreakpoints = madxartworkFrontend.config.responsive.activeBreakpoints,
          activeBreakpointsKeys = Object.keys(activeBreakpoints),
          breakPointSettings = {},
          desktopIdealRowHeight = madxartworkFrontend.getDeviceSetting('desktop', settings, 'ideal_row_height');
    activeBreakpointsKeys.forEach(breakpoint => {
      // The Gallery widget currently does not support widescreen.
      if ('widescreen' !== breakpoint) {
        const idealRowHeight = madxartworkFrontend.getDeviceSetting(breakpoint, settings, 'ideal_row_height');
        breakPointSettings[activeBreakpoints[breakpoint].value] = {
          horizontalGap: madxartworkFrontend.getDeviceSetting(breakpoint, settings, 'gap').size,
          verticalGap: madxartworkFrontend.getDeviceSetting(breakpoint, settings, 'gap').size,
          columns: madxartworkFrontend.getDeviceSetting(breakpoint, settings, 'columns'),
          idealRowHeight: idealRowHeight === null || idealRowHeight === void 0 ? void 0 : idealRowHeight.size
        };
      }
    });
    return {
      type: settings.gallery_layout,
      idealRowHeight: desktopIdealRowHeight === null || desktopIdealRowHeight === void 0 ? void 0 : desktopIdealRowHeight.size,
      container: this.elements.$container,
      columns: settings.columns,
      aspectRatio: settings.aspect_ratio,
      lastRow: 'normal',
      horizontalGap: madxartworkFrontend.getDeviceSetting('desktop', settings, 'gap').size,
      verticalGap: madxartworkFrontend.getDeviceSetting('desktop', settings, 'gap').size,
      animationDuration: settings.content_animation_duration,
      breakpoints: breakPointSettings,
      rtl: madxartworkFrontend.config.is_rtl,
      lazyLoad: 'yes' === settings.lazyload
    };
  }

  initGallery() {
    this.gallery = new EGallery(this.getGallerySettings());
    this.toggleAllAnimationsClasses();
  }

  removeAnimationClasses($element) {
    $element.removeClass((index, className) => (className.match(/madxartwork-animated-item-\S+/g) || []).join(' '));
  }

  toggleOverlayHoverAnimation() {
    this.removeAnimationClasses(this.elements.$itemsOverlay);
    const hoverAnimation = this.getElementSettings('background_overlay_hover_animation');

    if (hoverAnimation) {
      this.elements.$itemsOverlay.addClass('madxartwork-animated-item--' + hoverAnimation);
    }
  }

  toggleOverlayContentAnimation() {
    this.removeAnimationClasses(this.elements.$itemsContentElements);
    const contentHoverAnimation = this.getElementSettings('content_hover_animation');

    if (contentHoverAnimation) {
      this.elements.$itemsContentElements.addClass('madxartwork-animated-item--' + contentHoverAnimation);
    }
  }

  toggleOverlayContentSequencedAnimation() {
    this.elements.$itemsContent.toggleClass('madxartwork-gallery--sequenced-animation', 'yes' === this.getElementSettings('content_sequenced_animation'));
  }

  toggleImageHoverAnimation() {
    const imageHoverAnimation = this.getElementSettings('image_hover_animation');
    this.removeAnimationClasses(this.elements.$images);

    if (imageHoverAnimation) {
      this.elements.$images.addClass('madxartwork-animated-item--' + imageHoverAnimation);
    }
  }

  toggleAllAnimationsClasses() {
    const elementSettings = this.getElementSettings(),
          animation = elementSettings.background_overlay_hover_animation || elementSettings.content_hover_animation || elementSettings.image_hover_animation;
    this.elements.$items.toggleClass('madxartwork-animated-content', !!animation);
    this.toggleImageHoverAnimation();
    this.toggleOverlayHoverAnimation();
    this.toggleOverlayContentAnimation();
    this.toggleOverlayContentSequencedAnimation();
  }

  toggleAnimationClasses(settingKey) {
    if ('content_sequenced_animation' === settingKey) {
      this.toggleOverlayContentSequencedAnimation();
    }

    if ('background_overlay_hover_animation' === settingKey) {
      this.toggleOverlayHoverAnimation();
    }

    if ('content_hover_animation' === settingKey) {
      this.toggleOverlayContentAnimation();
    }

    if ('image_hover_animation' === settingKey) {
      this.toggleImageHoverAnimation();
    }
  }

  setGalleryTags(id) {
    this.gallery.setSettings('tags', 'all' === id ? [] : ['' + id]);
  }

  bindEvents() {
    this.elements.$titles.on('click', this.galleriesNavigationListener.bind(this));
  }

  galleriesNavigationListener(event) {
    const classes = this.getSettings('classes'),
          clickedElement = jQuery(event.target); // Make sure no other gallery title has an active class

    this.elements.$titles.removeClass(classes.activeTitle); // Give the gallery being activated the active class

    clickedElement.addClass(classes.activeTitle);
    this.setGalleryTags(clickedElement.data('gallery-index'));

    const updateLightboxGroup = () => this.setLightboxGalleryIndex(clickedElement.data('gallery-index')); // Wait for the gallery to filter before grouping items for the Light-box


    setTimeout(updateLightboxGroup, 1000);
  }

  setLightboxGalleryIndex(index = 'all') {
    if ('all' === index) {
      return this.elements.$items.attr('data-madxartwork-lightbox-slideshow', 'all_' + this.getID());
    }

    this.elements.$items.not('.e-gallery-item--hidden').attr('data-madxartwork-lightbox-slideshow', index + '_' + this.getID());
  }

  onInit(...args) {
    super.onInit(...args);

    if (madxartworkFrontend.isEditMode() && 1 <= this.$element.find('.madxartwork-widget-empty-icon').length) {
      this.$element.addClass('madxartwork-widget-empty');
    }

    if (!this.elements.$container.length) {
      return;
    }

    this.initGallery();
    this.elements.$titles.first().trigger('click');
  }

  getSettingsDictionary() {
    if (this.settingsDictionary) {
      return this.settingsDictionary;
    }

    const activeBreakpoints = madxartworkFrontend.config.responsive.activeBreakpoints,
          activeBreakpointsKeys = Object.keys(activeBreakpoints);
    const settingsDictionary = {
      columns: ['columns'],
      gap: ['horizontalGap', 'verticalGap'],
      ideal_row_height: ['idealRowHeight']
    };
    activeBreakpointsKeys.forEach(breakpoint => {
      // The Gallery widget currently does not support widescreen.
      if ('widescreen' === breakpoint) {
        return;
      }

      settingsDictionary['columns_' + breakpoint] = ['breakpoints.' + activeBreakpoints[breakpoint].value + '.columns'];
      settingsDictionary['gap_' + breakpoint] = ['breakpoints.' + activeBreakpoints[breakpoint].value + '.horizontalGap', 'breakpoints.' + activeBreakpoints[breakpoint].value + '.verticalGap'];
      settingsDictionary['ideal_row_height_' + breakpoint] = ['breakpoints.' + activeBreakpoints[breakpoint].value + '.idealRowHeight'];
    });
    settingsDictionary.aspect_ratio = ['aspectRatio'];
    this.settingsDictionary = settingsDictionary;
    return this.settingsDictionary;
  }

  onElementChange(settingKey) {
    if (-1 !== ['background_overlay_hover_animation', 'content_hover_animation', 'image_hover_animation', 'content_sequenced_animation'].indexOf(settingKey)) {
      this.toggleAnimationClasses(settingKey);
      return;
    }

    const settingsDictionary = this.getSettingsDictionary();
    const settingsToUpdate = settingsDictionary[settingKey];

    if (settingsToUpdate) {
      const gallerySettings = this.getGallerySettings();
      settingsToUpdate.forEach(settingToUpdate => {
        this.gallery.setSettings(settingToUpdate, this.getItems(gallerySettings, settingToUpdate));
      });
    }
  }

  onDestroy() {
    super.onDestroy();

    if (this.gallery) {
      this.gallery.destroy();
    }
  }

}

exports.default = galleryHandler;

/***/ })

}]);
//# sourceMappingURL=gallery.e5ba72e3c57da531df85.bundle.js.map
/*! madxartwork - v3.4.4 - 13-09-2021 */
(self["webpackChunkmadxartwork"] = self["webpackChunkmadxartwork"] || []).push([["video"],{

/***/ "../assets/dev/js/frontend/handlers/video.js":
/*!***************************************************!*\
  !*** ../assets/dev/js/frontend/handlers/video.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

class Video extends madxartworkModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        imageOverlay: '.madxartwork-custom-embed-image-overlay',
        video: '.madxartwork-video',
        videoIframe: '.madxartwork-video-iframe'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $imageOverlay: this.$element.find(selectors.imageOverlay),
      $video: this.$element.find(selectors.video),
      $videoIframe: this.$element.find(selectors.videoIframe)
    };
  }

  handleVideo() {
    if (this.getElementSettings('lightbox')) {
      return;
    }

    if ('youtube' === this.getElementSettings('video_type')) {
      this.apiProvider.onApiReady(apiObject => {
        this.elements.$imageOverlay.remove();
        this.prepareYTVideo(apiObject, true);
      });
    } else {
      this.elements.$imageOverlay.remove();
      this.playVideo();
    }
  }

  playVideo() {
    if (this.elements.$video.length) {
      // this.youtubePlayer exists only for YouTube videos, and its play function is different.
      if (this.youtubePlayer) {
        this.youtubePlayer.playVideo();
      } else {
        this.elements.$video[0].play();
      }

      return;
    }

    const $videoIframe = this.elements.$videoIframe,
          lazyLoad = $videoIframe.data('lazy-load');

    if (lazyLoad) {
      $videoIframe.attr('src', lazyLoad);
    }

    $videoIframe[0].src = this.apiProvider.getAutoplayURL($videoIframe[0].src);
  }

  async animateVideo() {
    const lightbox = await madxartworkFrontend.utils.lightbox;
    lightbox.setEntranceAnimation(this.getCurrentDeviceSetting('lightbox_content_animation'));
  }

  async handleAspectRatio() {
    const lightbox = await madxartworkFrontend.utils.lightbox;
    lightbox.setVideoAspectRatio(this.getElementSettings('aspect_ratio'));
  }

  async hideLightbox() {
    const lightbox = await madxartworkFrontend.utils.lightbox;
    lightbox.getModal().hide();
  }

  prepareYTVideo(YT, onOverlayClick) {
    const elementSettings = this.getElementSettings(),
          playerOptions = {
      videoId: this.videoID,
      events: {
        onReady: () => {
          if (elementSettings.mute) {
            this.youtubePlayer.mute();
          }

          if (elementSettings.autoplay || onOverlayClick) {
            this.youtubePlayer.playVideo();
          }
        },
        onStateChange: event => {
          if (event.data === YT.PlayerState.ENDED && elementSettings.loop) {
            this.youtubePlayer.seekTo(elementSettings.start || 0);
          }
        }
      },
      playerVars: {
        controls: elementSettings.controls ? 1 : 0,
        rel: elementSettings.rel ? 1 : 0,
        playsinline: elementSettings.play_on_mobile ? 1 : 0,
        modestbranding: elementSettings.modestbranding ? 1 : 0,
        autoplay: elementSettings.autoplay ? 1 : 0,
        start: elementSettings.start,
        end: elementSettings.end
      }
    }; // To handle CORS issues, when the default host is changed, the origin parameter has to be set.

    if (elementSettings.yt_privacy) {
      playerOptions.host = 'https://www.youtube-nocookie.com';
      playerOptions.origin = window.location.hostname;
    }

    this.youtubePlayer = new YT.Player(this.elements.$video[0], playerOptions);
  }

  bindEvents() {
    this.elements.$imageOverlay.on('click', this.handleVideo.bind(this));
  }

  onInit() {
    super.onInit();
    const elementSettings = this.getElementSettings();

    if (madxartworkFrontend.utils[elementSettings.video_type]) {
      this.apiProvider = madxartworkFrontend.utils[elementSettings.video_type];
    } else {
      this.apiProvider = madxartworkFrontend.utils.baseVideoLoader;
    }

    if ('youtube' !== elementSettings.video_type) {
      // Currently the only API integration in the Video widget is for the YT API
      return;
    }

    this.videoID = this.apiProvider.getVideoIDFromURL(elementSettings.youtube_url); // If there is an image overlay, the YouTube video prep method will be triggered on click

    if (!this.videoID) {
      return;
    } // If the user is using an image overlay, loading the API happens on overlay click instead of on init.


    if (elementSettings.show_image_overlay && elementSettings.image_overlay.url) {
      return;
    }

    if (elementSettings.lazy_load) {
      this.intersectionObserver = madxartworkModules.utils.Scroll.scrollObserver({
        callback: event => {
          if (event.isInViewport) {
            this.intersectionObserver.unobserve(this.elements.$video.parent()[0]);
            this.apiProvider.onApiReady(apiObject => this.prepareYTVideo(apiObject));
          }
        }
      }); // We observe the parent, since the video container has a height of 0.

      this.intersectionObserver.observe(this.elements.$video.parent()[0]);
      return;
    } // When Optimized asset loading is set to off, the video type is set to 'Youtube', and 'Privacy Mode' is set
    // to 'On', there might be a conflict with other videos that are loaded WITHOUT privacy mode, such as a
    // video bBackground in a section. In these cases, to avoid the conflict, a timeout is added to postpone the
    // initialization of the Youtube API object.


    if (!madxartworkFrontend.config.experimentalFeatures['e_optimized_assets_loading']) {
      setTimeout(() => {
        this.apiProvider.onApiReady(apiObject => this.prepareYTVideo(apiObject));
      }, 0);
    } else {
      this.apiProvider.onApiReady(apiObject => this.prepareYTVideo(apiObject));
    }
  }

  onElementChange(propertyName) {
    if (0 === propertyName.indexOf('lightbox_content_animation')) {
      this.animateVideo();
      return;
    }

    const isLightBoxEnabled = this.getElementSettings('lightbox');

    if ('lightbox' === propertyName && !isLightBoxEnabled) {
      this.hideLightbox();
      return;
    }

    if ('aspect_ratio' === propertyName && isLightBoxEnabled) {
      this.handleAspectRatio();
    }
  }

}

exports.default = Video;

/***/ })

}]);
//# sourceMappingURL=video.509fb0e07b97e0f603d7.bundle.js.map
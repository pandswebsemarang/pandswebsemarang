;( function( $, madxartwork, settings ) {

	"use strict";

	var madxBlog = {

		YT: null,

		init: function() {

			var widgets = {
				'madx-blog-smart-listing.default': madxBlog.initSmartListing,
				'madx-blog-smart-tiles.default': madxBlog.initSmartTiles,
				'madx-blog-text-ticker.default': madxBlog.initTextTicker,
				'madx-blog-video-playlist.default': madxBlog.initPlayList
			};

			$.each( widgets, function( widget, callback ) {
				madxartwork.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});

		},

		initPlayList: function( $scope ) {

			if ( 'undefined' !== typeof YT.Player ) {
				madxBlog.initPlayListCb( $scope, YT );
			} else {
				$( document ).on( 'madxYouTubeIframeAPIReady', function( event, YT ) {
					madxBlog.initPlayListCb( $scope, YT );
				} );
			}

		},

		initPlayListCb: function( $scope, YT ) {

			if ( null === madxBlog.YT ) {
				madxBlog.YT = YT;
			}

			if ( $scope.hasClass( 'players-initialized' ) ) {
				return;
			}

			$scope.addClass( 'players-initialized' );

			madxBlog.switchVideo( $scope.find( '.madx-blog-playlist__item.madx-blog-active' ) );

			$scope.on( 'click.madxBlog', '.madx-blog-playlist__item', function() {
				$scope.find( '.madx-blog-playlist__canvas' ).addClass( 'madx-blog-canvas-active' );
				madxBlog.switchVideo( $( this ) );
			} );

			$scope.on( 'click.madxBlog', '.madx-blog-playlist__canvas-overlay', madxBlog.stopVideo );
		},

		initTextTicker: function( $scope ) {

			var $ticker        = $scope.find( '.madx-text-ticker__posts' ),
				sliderSettings = $ticker.data( 'slider-atts' );

			$ticker.slick( sliderSettings );

		},

		initSmartListing: function( $scope ) {

			$scope.on( 'click.madxBlog', '.madx-smart-listing__filter-item a', madxBlog.handleSmartListingFilter );
			$scope.on( 'click.madxBlog', '.madx-smart-listing__arrow', madxBlog.handleSmartListingPager );

			var $filter = $scope.find( '.madx-smart-listing__filter' ),
				rollup  = $filter.data( 'rollup' );

			if ( rollup ) {
				$filter.madxBlogMore();
			}

			$( document ).trigger( 'madx-blog-smart-list/init', [ $scope, madxBlog ] );

		},

		initSmartTiles: function( $scope ) {

			var $carousel = $scope.find( '.madx-smart-tiles-carousel' );

			if ( 0 === $carousel.length ) {
				return false;
			}

			var sliderSettings = $carousel.data( 'slider-atts' );

			$carousel.slick( sliderSettings );

		},

		stopVideo: function( event ) {
			var $target         = $( event.currentTarget ),
				$canvas         = $target.closest( '.madx-blog-playlist__canvas' ),
				currentPlayer   = $canvas.data( 'player' ),
				currentProvider = $canvas.data( 'provider' );

			if ( $canvas.hasClass( 'madx-blog-canvas-active' ) ) {
				$canvas.removeClass( 'madx-blog-canvas-active' );
				madxBlog.pauseCurrentPlayer( currentPlayer, currentProvider );
			}

		},

		switchVideo: function( $el ) {

			var $canvas         = $el.closest( '.madx-blog-playlist' ).find( '.madx-blog-playlist__canvas' ),
				$counter        = $el.closest( '.madx-blog-playlist' ).find( '.madx-blog-playlist__counter-val' ),
				id              = $el.data( 'id' ),
				$iframeWrap     = $canvas.find( '#embed_wrap_' + id ),
				newPlayer       = $el.data( 'player' ),
				newProvider     = $el.data( 'provider' ),
				currentPlayer   = $canvas.data( 'player' ),
				currentProvider = $canvas.data( 'provider' );

			if ( newPlayer ) {
				madxBlog.startNewPlayer( newPlayer, newProvider );
				$canvas.data( 'provider', newProvider );
				$canvas.data( 'player', newPlayer );
			}

			if ( currentPlayer ) {
				madxBlog.pauseCurrentPlayer( currentPlayer, currentProvider );
			}

			if ( $counter.length ) {
				$counter.html( $el.data( 'video_index' ) );
			}

			$el.siblings().removeClass( 'madx-blog-active' );

			if ( ! $el.hasClass( 'madx-blog-active' ) ) {
				$el.addClass( 'madx-blog-active' );
			}

			if ( ! $iframeWrap.length ) {

				$iframeWrap = $( '<div id="embed_wrap_' + id + '"></div>' ).appendTo( $canvas );

				switch ( newProvider ) {

					case 'youtube':
						madxBlog.intYouTubePlayer( $el, {
							id: id,
							canvas: $canvas,
							currentPlayer: currentPlayer,
							playerTarget: $iframeWrap,
							height: $el.data( 'height' ),
							videoId: $el.data( 'video_id' )
						} );
					break;

					case 'vimeo':
						madxBlog.intVimeoPlayer( $el, {
							id: id,
							canvas: $canvas,
							currentPlayer: currentPlayer,
							playerTarget: $iframeWrap,
							html: $.parseJSON( $el.data( 'html' ) )
						} );
					break;

				}

				$iframeWrap.addClass( 'madx-blog-playlist__embed-wrap' );

			}

			$iframeWrap.addClass( 'madx-blog-active' ).siblings().removeClass( 'madx-blog-active' );

		},

		intYouTubePlayer: function( $el, plSettings ) {

			var $iframe = $( '<div id="embed_' + plSettings.id + '"></div>' ).appendTo( plSettings.playerTarget );
			var player  = new madxBlog.YT.Player( $iframe[0], {
				height: plSettings.height,
				width: '100%',
				videoId: plSettings.videoId,
				playerVars: { 'showinfo': 0, 'rel': 0 },
				events: {
					onReady: function( event ) {
						$el.data( 'player', event.target );

						if ( plSettings.currentPlayer ) {
							event.target.playVideo();
						}

						plSettings.canvas.data( 'provider', 'youtube' );
						plSettings.canvas.data( 'player', event.target );

					},
					onStateChange: function( event ) {

						var $index  = $el.find( '.madx-blog-playlist__item-index' );

						if ( ! $index.length ) {
							return;
						}

						switch ( event.data ) {

							case 1:
								$index.removeClass( 'madx-is-paused' ).addClass( 'madx-is-playing' );
								if ( ! plSettings.canvas.hasClass( 'madx-blog-canvas-active' ) ) {
									plSettings.canvas.addClass( 'madx-blog-canvas-active' );
								}
							break;

							case 2:
								$index.removeClass( 'madx-is-playing' ).addClass( 'madx-is-paused' );
							break;

						}
					}
				}
			});

		},

		intVimeoPlayer: function( $el, plSettings ) {

			var $iframe = $( plSettings.html ).appendTo( plSettings.playerTarget );
			var player  = new Vimeo.Player( $iframe[0] );
			var $index  = $el.find( '.madx-blog-playlist__item-index' );

			player.on( 'loaded', function( event ) {

				$el.data( 'player', this );
				if ( plSettings.currentPlayer ) {
					this.play();
				}

				plSettings.canvas.data( 'provider', 'vimeo' );
				plSettings.canvas.data( 'player', this );
			});

			player.on( 'play', function() {
				if ( $index.length ) {
					$index.removeClass( 'madx-is-paused' ).addClass( 'madx-is-playing' );
					if ( ! plSettings.canvas.hasClass( 'madx-blog-canvas-active' ) ) {
						plSettings.canvas.addClass( 'madx-blog-canvas-active' );
					}
				}
			});

			player.on( 'pause', function() {
				if ( $index.length ) {
					$index.removeClass( 'madx-is-playing' ).addClass( 'madx-is-paused' );
				}
			});

		},

		pauseCurrentPlayer: function( currentPlayer, currentProvider ) {

			switch ( currentProvider ) {
				case 'youtube':
					currentPlayer.pauseVideo();
				break;

				case 'vimeo':
					currentPlayer.pause();
				break;
			}
		},

		startNewPlayer: function( newPlayer, newProvider ) {

			switch ( newProvider ) {
				case 'youtube':
					setTimeout( function() {
						newPlayer.playVideo();
					}, 300);
				break;

				case 'vimeo':
					newPlayer.play();
				break;
			}

		},

		handleSmartListingFilter: function( event ) {

			var $this = $( this ),
				$item = $this.closest( '.madx-smart-listing__filter-item' ),
				term  = $this.data( 'term' );

			event.preventDefault();

			$item.closest('.madx-smart-listing__filter').find( '.madx-active-item' ).removeClass( 'madx-active-item' );
			$item.addClass( 'madx-active-item' );

			madxBlog.requestPosts( $this, { term: term, paged: 1 } );

		},

		handleSmartListingPager: function() {

			var $this       = $( this ),
				$wrapper    = $this.closest( '.madx-smart-listing-wrap' ),
				currentPage = parseInt( $wrapper.data( 'page' ), 10 ),
				newPage     = 1,
				currentTerm = parseInt( $wrapper.data( 'term' ), 10 ),
				direction   = $this.data( 'dir' );

			if ( $this.hasClass( 'madx-arrow-disabled' ) ) {
				return;
			}

			if ( 'next' === direction ) {
				newPage = currentPage + 1;
			}

			if ( 'prev' === direction ) {
				newPage = currentPage - 1;
			}

			madxBlog.requestPosts( $this, { term: currentTerm, paged: newPage } );

		},

		requestPosts: function( $trigger, data ) {

			var $wrapper = $trigger.closest( '.madx-smart-listing-wrap' ),
				$loader  = $wrapper.next( '.madx-smart-listing-loading' );

			if ( $wrapper.hasClass( 'madx-processing' ) ) {
				return;
			}

			$wrapper.addClass( 'madx-processing' );

			$.ajax({
				url: settings.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'madx_blog_smart_listing_get_posts',
					madx_request_data: data,
					madx_widget_settings: $wrapper.data( 'settings' )
				},
			}).done( function( response ) {

				var $arrows = $wrapper.find( '.madx-smart-listing__arrows' );

				$wrapper
					.removeClass( 'madx-processing' )
					.find( '.madx-smart-listing' )
					.html( response.data.posts );

				if ( $arrows.length ) {
					$arrows.replaceWith( response.data.arrows );
				}

			}).fail(function() {
				$wrapper.removeClass( 'madx-processing' );
			});

			if ( 'undefined' !== typeof data.paged ) {
				$wrapper.data( 'page', data.paged );
			}

			if ( 'undefined' !== typeof data.term ) {
				$wrapper.data( 'term', data.term );
			}

		}

	};

	$( window ).on( 'madxartwork/frontend/init', madxBlog.init );

	var madxBlogMore = function( el ) {

		this.$el        = $( el );
		this.$container = this.$el.closest( '.madx-smart-listing__heading' );

		if ( this.$container.find( '.madx-smart-listing__title' ).length ) {
			this.$heading = this.$container.find( '.madx-smart-listing__title' );
		} else {
			this.$heading = this.$container.find( '.madx-smart-listing__title-placeholder' );
		}

		this.settings = $.extend( {
			icon:      'fa fa-ellipsis-h',
			tag:       'i',
			className: 'madx-smart-listing__filter-item madx-smart-listing__filter-more'
		}, this.$el.data( 'more' ) );

		this.containerWidth = 0;
		this.itemsWidth     = 0;
		this.heading        = 0;

		this.init();

	};

	madxBlogMore.prototype = {

		constructor: madxBlogMore,

		init: function() {

			var self = this;

			this.containerWidth = this.$container.width();
			this.heading        = this.$heading.outerWidth();

			this.$hiddenWrap = $( '<div class="' + this.settings.className + '" hidden="hidden"><' + this.settings.tag + ' class="' + this.settings.icon + '"></' + this.settings.tag + '></div>' ).appendTo( this.$el );
			this.$hidden = $( '<div class="madx-smart-listing__filter-hidden-items"></div>' ).appendTo( this.$hiddenWrap );

			this.iter = 0;

			this.rebuildItems();

			setTimeout( function() {
				self.watch();
				self.rebuildItems();
			}, 300 );

		},

		watch: function() {

			var delay = 100;

			$( window ).on( 'resize.madxBlogMore orientationchange.madxBlogMore', this.debounce( delay, this.watcher.bind( this ) ) );
		},

		/**
		 * Responsive menu watcher callback.
		 *
		 * @param  {Object} Resize or Orientationchange event.
		 * @return {void}
		 */
		watcher: function( event ) {

			this.containerWidth = this.$container.width();
			this.itemsWidth     = 0;

			this.$hidden.html( '' );
			this.$hiddenWrap.attr( 'hidden', 'hidden' );

			this.$el.find( '> div[hidden]:not(.madx-smart-listing__filter-more)' ).each( function() {
				$( this ).removeAttr( 'hidden' );
			});

			this.rebuildItems();
		},

		rebuildItems: function() {

			var self            = this,
				$items          = this.$el.find( '> div:not(.madx-smart-listing__filter-more):not([hidden])' ),
				contentWidth    = 0,
				hiddenWrapWidth = parseInt( this.$hiddenWrap.outerWidth(), 10 );

			this.itemsWidth = 0;

			$items.each( function() {

				var $this  = $( this ),
					$clone = null;

				self.itemsWidth += $this.outerWidth();
				contentWidth = self.$heading.outerWidth() + hiddenWrapWidth + self.itemsWidth;

				if ( 0 > self.containerWidth - contentWidth && $this.is( ':visible' ) ) {

					$clone = $this.clone();

					$this.attr( { 'hidden': 'hidden' } );
					self.$hidden.append( $clone );
					self.$hiddenWrap.removeAttr( 'hidden' );
				}

			} );

		},

		/**
		 * Debounce the function call
		 *
		 * @param  {number}   threshold The delay.
		 * @param  {Function} callback  The function.
		 */
		debounce: function ( threshold, callback ) {
			var timeout;

			return function debounced( $event ) {
				function delayed() {
					callback.call( this, $event );
					timeout = null;
				}

				if ( timeout ) {
					clearTimeout( timeout );
				}

				timeout = setTimeout( delayed, threshold );
			};
		}

	};

	$.fn.madxBlogMore = function() {
		return this.each( function() {
			new madxBlogMore( this );
		} );
	};

}( jQuery, window.madxartworkFrontend, window.madxBlogSettings ) );

if ( 1 === window.hasmadxBlogPlaylist ) {

	function onYouTubeIframeAPIReady() {
		jQuery( document ).trigger( 'madxYouTubeIframeAPIReady', [ YT ] );
	}

}

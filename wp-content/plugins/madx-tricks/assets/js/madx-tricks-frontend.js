( function( $, madxartwork ) {

	'use strict';

	var madxTricks = {

		init: function() {
			madxartwork.hooks.addAction( 'frontend/element_ready/section', madxTricks.madxartworkSection );
			madxartwork.hooks.addAction( 'frontend/element_ready/column', madxTricks.madxartworkColumn );
			madxartwork.hooks.addAction( 'frontend/element_ready/widget', madxTricks.madxartworkWidget );

			var widgets = {
				'madx-view-more.default' : madxTricks.widgetViewMore,
				'madx-unfold.default' : madxTricks.widgetUnfold,
				'madx-hotspots.default' : madxTricks.widgetHotspots
			};

			$.each( widgets, function( widget, callback ) {
				madxartwork.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});
		},

		madxartworkSection: function( $scope ) {
			var $target        = $scope,
				sectionId      = $scope.data( 'id' ),
				editMode       = Boolean( madxartwork.isEditMode() ),
				settings       = {};

			if ( window.madxTricksSettings && window.madxTricksSettings.elements_data.sections.hasOwnProperty( sectionId ) ) {
				settings = window.madxTricksSettings.elements_data.sections[ sectionId ];
			}

			if ( editMode ) {
				settings = madxTricks.sectionEditorSettings( sectionId );
			}

			if ( ! settings ) {
				return false;
			}

			if ( jQuery.isEmptyObject( settings ) ) {
				return false;
			}

			if ( 'false' === settings.particles || '' === settings.particles_json ) {
				return false;
			}

			var particlesId = 'madx-tricks-particles-instance-' + sectionId,
				particlesJson = JSON.parse( settings.particles_json );

			$scope.prepend( '<div id="' + particlesId + '" class="madx-tricks-particles-section__instance"></div>' );

			particlesJS( particlesId, particlesJson );

		},

		madxartworkColumn: function( $scope ) {
			var $target  = $scope,
				$window  = $( window ),
				columnId = $target.data( 'id' ),
				editMode = Boolean( madxartwork.isEditMode() ),
				settings = {},
				stickyInstance = null,
				stickyInstanceOptions = {
					topSpacing: 50,
					bottomSpacing: 50,
					containerSelector: '.madxartwork-row',
					innerWrapperSelector: '.madxartwork-column-wrap',
				};

			if ( ! editMode ) {
				settings = $target.data( 'settings' );

				if ( $target.hasClass( 'madx-sticky-column' ) ) {

					if ( -1 !== settings['stickyOn'].indexOf( madxartworkFrontend.getCurrentDeviceMode() ) ) {

						stickyInstanceOptions.topSpacing = settings['topSpacing'];
						stickyInstanceOptions.bottomSpacing = settings['bottomSpacing'];

						$target.data( 'stickyColumnInit', true );
						stickyInstance = new StickySidebar( $target[0], stickyInstanceOptions );

						$window.on( 'resize.madxTricksStickyColumn orientationchange.madxTricksStickyColumn', madxTricksTools.debounce( 50, resizeDebounce ) );
					}
				}
			} else {
				settings = madxTricks.columnEditorSettings( columnId );

				if ( 'true' === settings['sticky'] ) {
					$target.addClass( 'madx-sticky-column' );

					if ( -1 !== settings['stickyOn'].indexOf( madxartworkFrontend.getCurrentDeviceMode() ) ) {
						stickyInstanceOptions.topSpacing = settings['topSpacing'];
						stickyInstanceOptions.bottomSpacing = settings['bottomSpacing'];

						$target.data( 'stickyColumnInit', true );
						stickyInstance = new StickySidebar( $target[0], stickyInstanceOptions );

						$window.on( 'resize.madxTricksStickyColumn orientationchange.madxTricksStickyColumn', madxTricksTools.debounce( 50, resizeDebounce ) );
					}
				}
			}

			function resizeDebounce() {
				var currentDeviceMode = madxartworkFrontend.getCurrentDeviceMode(),
					availableDevices  = settings['stickyOn'] || [],
					isInit            = $target.data( 'stickyColumnInit' );

				if ( -1 !== availableDevices.indexOf( currentDeviceMode ) ) {

					if ( ! isInit ) {
						$target.data( 'stickyColumnInit', true );
						stickyInstance = new StickySidebar( $target[0], stickyInstanceOptions );
						stickyInstance.updateSticky();
					}
				} else {
					$target.data( 'stickyColumnInit', false );
					stickyInstance.destroy();
				}
			}

		},

		madxartworkWidget: function( $scope ) {
			var parallaxInstance = null,
				satelliteInstance = null,
				tooltipInstance = null;

			parallaxInstance = new madxWidgetParallax( $scope );
			parallaxInstance.init();

			satelliteInstance = new madxWidgetSatellite( $scope );
			satelliteInstance.init();

			tooltipInstance = new madxWidgetTooltip( $scope );
			tooltipInstance.init();

		},

		widgetViewMore: function( $scope ) {
			var $target         = $scope.find( '.madx-view-more' ),
				instance        = null,
				settings        = $target.data( 'settings' );

			instance = new madxViewMore( $target, settings );
			instance.init();
		},

		widgetUnfold: function( $scope ) {
			var $target          = $scope.find( '.madx-unfold' ),
				$body            = $( 'body' ),
				$button          = $( '.madx-unfold__button', $target ),
				$mask            = $( '.madx-unfold__mask', $target ),
				$content         = $( '.madx-unfold__content', $target ),
				settings         = $target.data( 'settings' ),
				maskHeight       = +settings['height']['size'] || 100,
				maskTabletHeight = +settings['heightTablet']['size'] || maskHeight,
				maskMobileHeight = +settings['heightMobile']['size'] || maskHeight,
				separatorHeight  = +settings['separatorHeight']['size'] || 20,
				unfoldDuration   = settings['unfoldDuration'],
				foldDuration     = settings['unfoldDuration'],
				unfoldEasing     = settings['unfoldEasing'],
				foldEasing       = settings['foldEasing'];

			if ( ! $target.hasClass( 'madx-unfold-state' ) ) {
				$mask.css( {
					'height': maskHeight
				} );
			}

			$button.on( 'click.madxUnfold', function() {
				var $this         = $( this ),
					$buttonText   = $( '.madx-unfold__button-text', $this ),
					unfoldText    = $this.data( 'unfold-text' ),
					foldText      = $this.data( 'fold-text' ),
					$buttonIcon   = $( '.madx-unfold__button-icon', $this ),
					unfoldIcon    = $this.data( 'unfold-icon' ),
					foldIcon      = $this.data( 'fold-icon' ),
					contentHeight = $content.outerHeight(),
					deviceHeight  = getDeviceHeight();

				if ( ! $target.hasClass( 'madx-unfold-state' ) ) {
					$target.addClass( 'madx-unfold-state' );

					$buttonIcon.html( '<i class="' + foldIcon + '"></i>' );
					$buttonText.html( foldText );

					anime( {
						targets: $mask[0],
						height: contentHeight,
						duration: unfoldDuration['size'],
						easing: unfoldEasing
					} );
				} else {
					$target.removeClass( 'madx-unfold-state' );

					$buttonIcon.html( '<i class="' + unfoldIcon + '"></i>' );
					$buttonText.html( unfoldText );

					anime( {
						targets: $mask[0],
						height: deviceHeight,
						duration: foldDuration['size'],
						easing: foldEasing
					} );
				}
			} );

			$( window ).on( 'resize.madxWidgetUnfold orientationchange.madxWidgetUnfold', madxTricksTools.debounce( 50, function(){

				var deviceHeight  = getDeviceHeight(),
					contentHeight = $content.outerHeight();

				if ( ! $target.hasClass( 'madx-unfold-state' ) ) {
					$mask.css( {
						'height': deviceHeight
					} );
				} else {
					$mask.css( {
						'height': contentHeight
					} );
				}

			} ) );

			function getDeviceHeight() {
				var $deviceMode  = madxartwork.getCurrentDeviceMode(),
					deviceHeight = maskHeight;

				switch ( $deviceMode ) {
					case 'desktop':
						deviceHeight = maskHeight;
						break;

					case 'tablet':
						deviceHeight = maskTabletHeight;
						break;

					case 'mobile':
						deviceHeight = maskMobileHeight;
						break;
				}

				return deviceHeight;
			}
		},

		widgetHotspots: function( $scope ) {
			var $target   = $scope.find( '.madx-hotspots' ),
				$hotspots = $( '.madx-hotspots__item', $target),
				settings  = $target.data( 'settings' ),
				editMode  = Boolean( madxartwork.isEditMode() );

			$target.imagesLoaded().progress( function() {
				$target.addClass( 'image-loaded' );
			} );

			$hotspots.each( function( index ) {
				var $this          = $( this ),
					horizontal     = $this.data( 'horizontal-position' ),
					vertical       = $this.data( 'vertical-position' ),
					itemSelector   = $this[0];

				$this.css( {
					'left': horizontal + '%',
					'top': vertical + '%'
				} );

				if ( itemSelector._tippy ) {
					itemSelector._tippy.destroy();
				}

				tippy( [ itemSelector ], {
					arrow: settings['tooltipArrow'],
					arrowType: settings['tooltipArrowType'],
					arrowTransform: settings['tooltipArrowSize'],
					duration: [ settings['tooltipShowDuration']['size'], settings['tooltipHideDuration']['size'] ],
					distance: settings['tooltipDistance']['size'],
					placement: settings['tooltipPlacement'],
					trigger: settings['tooltipTrigger'],
					animation: settings['tooltipAnimation'],
					flipBehavior: 'clockwise',
					appendTo: itemSelector,
					hideOnClick: 'manual' !== settings['tooltipTrigger'],
				} );

				if ( 'manual' === settings['tooltipTrigger'] && itemSelector._tippy ) {
					itemSelector._tippy.show();
				}

				if ( settings['tooltipShowOnInit'] && itemSelector._tippy ) {
					itemSelector._tippy.show();
				}

				if ( editMode && itemSelector._tippy ) {
					itemSelector._tippy.show();
				}

			} );
		},

		columnEditorSettings: function( columnId ) {
			var editorElements = null,
				columnData     = {};

			if ( ! window.madxartwork.hasOwnProperty( 'elements' ) ) {
				return false;
			}

			editorElements = window.madxartwork.elements;

			if ( ! editorElements.models ) {
				return false;
			}

			$.each( editorElements.models, function( index, obj ) {

				$.each( obj.attributes.elements.models, function( index, obj ) {
					if ( columnId == obj.id ) {
						columnData = obj.attributes.settings.attributes;
					}
				} );

			} );

			return {
				'sticky': columnData['madx_tricks_column_sticky'] || false,
				'topSpacing': columnData['madx_tricks_top_spacing'] || 50,
				'bottomSpacing': columnData['madx_tricks_bottom_spacing'] || 50,
				'stickyOn': columnData['madx_tricks_column_sticky_on'] || [ 'desktop', 'tablet', 'mobile']
			}

		},

		sectionEditorSettings: function( sectionId ) {
			var editorElements = null,
				sectionData     = {};

			if ( ! window.madxartwork.hasOwnProperty( 'elements' ) ) {
				return false;
			}

			editorElements = window.madxartwork.elements;

			if ( ! editorElements.models ) {
				return false;
			}

			$.each( editorElements.models, function( index, obj ) {
				if ( sectionId == obj.id ) {
					sectionData = obj.attributes.settings.attributes;
				}
			} );

			return {
				'particles': sectionData['section_madx_tricks_particles'] || 'false',
				'particles_json': sectionData['section_madx_tricks_particles_json'] || '',
			}

		}

	};

	$( window ).on( 'madxartwork/frontend/init', madxTricks.init );

	var madxTricksTools = {
		debounce: function( threshold, callback ) {
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
		},

		widgetEditorSettings: function( widgetId ) {
			var editorElements = null,
				widgetData     = {};

			if ( ! window.madxartwork.hasOwnProperty( 'elements' ) ) {
				return false;
			}

			editorElements = window.madxartwork.elements;

			if ( ! editorElements.models ) {
				return false;
			}

			$.each( editorElements.models, function( index, obj ) {

				$.each( obj.attributes.elements.models, function( index, obj ) {

					$.each( obj.attributes.elements.models, function( index, obj ) {
						if ( widgetId == obj.id ) {
							widgetData = obj.attributes.settings.attributes;
						}
					} );

				} );

			} );

			return {
				'speed': widgetData['madx_tricks_widget_parallax_speed'] || { 'size': 50, 'unit': '%'},
				'parallax': widgetData['madx_tricks_widget_parallax'] || 'false',
				'invert': widgetData['madx_tricks_widget_parallax_invert'] || 'false',
				'stickyOn': widgetData['madx_tricks_widget_parallax_on'] || [ 'desktop', 'tablet', 'mobile'],
				'satellite': widgetData['madx_tricks_widget_satellite'] || 'false',
				'satelliteType': widgetData['madx_tricks_widget_satellite_type'] || 'text',
				'satellitePosition': widgetData['madx_tricks_widget_satellite_position'] || 'top-center',
				'tooltip': widgetData['madx_tricks_widget_tooltip'] || 'false',
				'tooltipDescription': widgetData['madx_tricks_widget_tooltip_description'] || 'Lorem Ipsum',
				'tooltipPlacement': widgetData['madx_tricks_widget_tooltip_placement'] || 'top',
				'xOffset': widgetData['madx_tricks_widget_tooltip_x_offset'] || 0,
				'yOffset': widgetData['madx_tricks_widget_tooltip_y_offset'] || 0,
				'tooltipAnimation': widgetData['madx_tricks_widget_tooltip_animation'] || 'shift-toward',
				'zIndex': widgetData['madx_tricks_widget_tooltip_z_index'] || '999'
			}
		}
	}

	/**
	 * madx madxViewMore Class
	 *
	 * @return {void}
	 */
	window.madxViewMore = function( $selector, settings ) {
		var self            = this,
			$window         = $( window ),
			$button         = $( '.madx-view-more__button', $selector ),
			defaultSettings = {
				sections: {},
				effect: 'move-up',
				showall: false
			},
			settings        = $.extend( {}, defaultSettings, settings ),
			sections        = settings['sections'],
			sectionsData    = {},
			buttonVisible   = true,
			editMode        = Boolean( madxartwork.isEditMode() );

		/**
		 * Init
		 */
		self.init = function() {
			self.setSectionsData();

			if ( editMode ) {
				return false;
			}

			// Add Events
			$button.on( 'click', function() {

				for ( var section in sectionsData ) {
					var $section = sectionsData[ section ]['selector'];

					if ( ! settings.showall ) {
						if ( ! sectionsData[ section ]['visible'] ) {
							sectionsData[ section ]['visible'] = true;
							$section.addClass( 'view-more-visible' );
							$section.addClass( 'madx-tricks-' + settings['effect'] + '-effect' );

							break;
						}
					} else {
						sectionsData[ section ]['visible'] = true;
						$section.addClass( 'view-more-visible' );
						$section.addClass( 'madx-tricks-' + settings['effect'] + '-effect' );
					}

				}

				for ( var section in sectionsData ) {
					buttonVisible = true;

					if ( sectionsData[ section ]['visible'] ) {
						buttonVisible = false;
					}
				}

				if ( ! buttonVisible ) {
					$button.css( { 'display': 'none' } );
				}

			} );
		};

		self.setSectionsData = function() {

			for ( var section in sections ) {
				var $selector = $( '#' + sections[ section ] );

				if ( ! editMode ) {
					$selector.addClass( 'madx-view-more-section' );
				} else {
					$selector.addClass( 'madx-view-more-section-edit-mode' );
				}

				sectionsData[ section ] = {
					'section_id': sections[ section ],
					'selector': $selector,
					'visible': false,
				}
			}
		};
	};

	/**
	 * [madxWidgetParallax description]
	 * @param  {[type]} $scope [description]
	 * @return {[type]}        [description]
	 */
	window.madxWidgetParallax = function( $scope ) {
		var self         = this,
			$target      = $( '> .madxartwork-widget-container', $scope ),
			$section     = $scope.closest( '.madxartwork-top-section' ),
			widgetId     = $scope.data('id'),
			settings     = {},
			editMode     = Boolean( madxartwork.isEditMode() ),
			$window      = $( window ),
			isSafari     = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
			platform     = navigator.platform,
			safariClass  = isSafari ? 'is-safari' : '',
			macClass    = 'MacIntel' == platform ? ' is-mac' : '';

		/**
		 * Init
		 */
		self.init = function() {

			$scope.addClass( macClass );

			if ( ! editMode ) {
				settings = $scope.data( 'madx-tricks-settings' );
			} else {
				settings = madxTricksTools.widgetEditorSettings( widgetId );
			}

			if ( ! settings ) {
				return false;
			}

			if ( 'undefined' === typeof settings ) {
				return false;
			}

			if ( 'false' === settings['parallax'] || 'undefined' === typeof settings['parallax'] ) {
				return false;
			}

			$window.on( 'scroll.madxWidgetParallax resize.madxWidgetParallax', self.scrollHandler ).trigger( 'resize.madxWidgetParallax' );
		};

		self.scrollHandler = function( event ) {
			var speed             = +settings['speed']['size'] * 0.01,
				invert            = 'true' == settings['invert'] ? -1 : 1,
				winHeight         = $window.height(),
				winScrollTop      = $window.scrollTop(),
				offsetTop         = $scope.offset().top,
				thisHeight        = $scope.outerHeight(),
				sectionHeight     = $section.outerHeight(),
				positionDelta     = winScrollTop - offsetTop + ( winHeight / 2 ),
				abs               = positionDelta > 0 ? 1 : -1,
				posY              = abs * Math.pow( Math.abs( positionDelta ), 0.85 ),
				availableDevices  = settings['stickyOn'] || [],
				currentDeviceMode = madxartworkFrontend.getCurrentDeviceMode();

			posY = invert * Math.ceil( speed * posY );

			if ( -1 !== availableDevices.indexOf( currentDeviceMode ) ) {
				$target.css( {
					'transform': 'translateY(' + posY + 'px)'
				} );
			} else {
				$target.css( {
					'transform': 'translateY(0)'
				} );
			}
		};
	};

	/**
	 * [madxWidgetSatellite description]
	 * @param  {[type]} $scope [description]
	 * @return {[type]}        [description]
	 */
	window.madxWidgetSatellite = function( $scope ) {
		var self     = this,
			widgetId = $scope.data('id'),
			settings = {},
			editMode = Boolean( madxartwork.isEditMode() );

		/**
		 * Init
		 */
		self.init = function() {

			if ( ! editMode ) {
				settings = $scope.data( 'madx-tricks-settings' );
			} else {
				settings = madxTricksTools.widgetEditorSettings( widgetId );
			}

			if ( ! settings ) {
				return false;
			}

			if ( 'undefined' === typeof settings ) {
				return false;
			}

			if ( 'false' === settings['satellite'] || 'undefined' === typeof settings['satellite'] ) {
				return false;
			}

			$scope.addClass( 'madx-satellite-widget' );

			$( '.madx-tricks-satellite', $scope ).addClass( 'madx-tricks-satellite--' + settings['satellitePosition'] );
		};
	};

	/**
	 * [madxWidgetTooltip description]
	 * @param  {[type]} $scope [description]
	 * @return {[type]}        [description]
	 */
	window.madxWidgetTooltip = function( $scope ) {
		var self           = this,
			widgetId       = $scope.data('id'),
			widgetSelector = $scope[0],
			settings       = {},
			editMode       = Boolean( madxartwork.isEditMode() ),
			tooltipEvent   = editMode ? 'click' : 'mouseenter';

		/**
		 * Init
		 */
		self.init = function() {

			if ( ! editMode ) {
				settings = $scope.data( 'madx-tricks-settings' );
			} else {
				settings = madxTricksTools.widgetEditorSettings( widgetId );
			}

			if ( ! settings ) {
				return false;
			}

			if ( 'undefined' === typeof settings ) {
				return false;
			}

			if ( 'false' === settings['tooltip'] || 'undefined' === typeof settings['tooltip'] || '' === settings['tooltipDescription'] ) {
				return false;
			}

			$scope.addClass( 'madx-tooltip-widget' );

			if ( widgetSelector._tippy ) {
				widgetSelector._tippy.destroy();
			}

			var tippyInstance = tippy(
				[ widgetSelector ],
				{
					html: document.querySelector( '#madx-tricks-tooltip-content-' + widgetId ),
					appendTo: widgetSelector,
					arrow: true,
					placement: settings['tooltipPlacement'],
					flipBehavior: 'clockwise',
					trigger: tooltipEvent,
					offset: settings['xOffset'] + ', ' + settings['yOffset'],
					animation: settings['tooltipAnimation'],
					zIndex: settings['zIndex']
				}
			);

			if ( editMode && widgetSelector._tippy ) {
				widgetSelector._tippy.show();
			}

		};
	};

}( jQuery, window.madxartworkFrontend ) );

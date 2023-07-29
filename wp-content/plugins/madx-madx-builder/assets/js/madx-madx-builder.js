( function( $, madxartworkFrontend ) {

	"use strict";

	var madxmadxBuilder = {

		init: function() {


			var widgets = {
				'madx-single-images.default' : madxmadxBuilder.productImages,
				'madx-single-add-to-cart.default' : madxmadxBuilder.addToCart,
				'madx-single-tabs.default' : madxmadxBuilder.productTabs,
				'madx-madx-products.default' : madxmadxBuilder.widgetProducts,
				'madx-madx-categories.default' : madxmadxBuilder.widgetCategories,
			};

			$.each( widgets, function( widget, callback ) {
				madxartworkFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});

			$( document ).on( 'madx-filter-content-rendered', madxmadxBuilder.reInitCarousel );

		},

		productImages: function( $scope ) {

			$scope.find( '.madx-single-images__loading' ).remove();

			if ( ! window.madxartwork ) {
				return;
			}

			$scope.find( '.madxcommerce-product-gallery' ).each( function() {
				$( this ).wc_product_gallery();
			} );
		},

		addToCart: function( $scope ) {

			if ( ! window.madxartwork ) {
				return;
			}

			if ( typeof wc_add_to_cart_variation_params !== 'undefined' ) {
				$scope.find( '.variations_form' ).each( function() {
					$( this ).wc_variation_form();
				});
			}

		},

		productTabs: function( $scope ) {

			var hash  = window.location.hash;
			var url   = window.location.href;
			var $tabs = $scope.find( '.wc-tabs, ul.tabs' ).first();

			$scope.find( '.madx-single-tabs__loading' ).remove();
			$tabs.find( 'a' ).addClass( 'madxartwork-clickable' );

			if ( ! window.madxartwork ) {
				return;
			}

			$scope.find( '.wc-tab, .madxcommerce-tabs .panel:not(.panel .panel)' ).hide();

			if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' || hash === '#tab-reviews' ) {
				$tabs.find( 'li.reviews_tab a' ).click();
			} else if ( url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {
				$tabs.find( 'li.reviews_tab a' ).click();
			} else if ( hash === '#tab-additional_information' ) {
				$tabs.find( 'li.additional_information_tab a' ).click();
			} else {
				$tabs.find( 'li:first a' ).click();
			}

		},

		widgetProducts: function ( $scope ) {

			var $target = $scope.find( '.madx-madx-carousel' );

			if ( ! $target.length ) {
				return;
			}

			madxmadxBuilder.initCarousel( $target.find( '.madx-madx-products' ), $target.data( 'slider_options' ) );

		},

		widgetCategories: function ( $scope ) {

			var $target = $scope.find( '.madx-madx-carousel' );

			if ( ! $target.length ) {
				return;
			}

			madxmadxBuilder.initCarousel( $target.find( '.madx-madx-categories' ), $target.data( 'slider_options' ) );

		},

		reInitCarousel: function( event, $scope ) {
			madxmadxBuilder.widgetProducts( $scope );
		},

		initCarousel: function( $target, options ) {

			var tabletSlides, mobileSlides, defaultOptions, slickOptions;

			if ( options.slidesToShow.tablet ) {
				tabletSlides = options.slidesToShow.tablet;
			} else {
				tabletSlides = 1 === options.slidesToShow.desktop ? 1 : 2;
			}

			if ( options.slidesToShow.mobile ) {
				mobileSlides = options.slidesToShow.mobile;
			} else {
				mobileSlides = 1;
			}

			options.slidesToShow = options.slidesToShow.desktop;

			defaultOptions = {
				customPaging: function(slider, i) {
					return $( '<span />' ).text( i + 1 );
				},
				dotsClass: 'madx-slick-dots',
				responsive: [
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: tabletSlides,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: mobileSlides,
							slidesToScroll: 1
						}
					}
				]
			};

			slickOptions = $.extend( {}, defaultOptions, options );

			$target.slick( slickOptions );
		},

	};

	$( window ).on( 'madxartwork/frontend/init', madxmadxBuilder.init );

}( jQuery, window.madxartworkFrontend ) );
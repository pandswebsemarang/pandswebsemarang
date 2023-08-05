(function( $ ) {

	'use strict';

	var JetTabsEditor,
		JetTabsData = window.JetTabsData || {};

	JetTabsEditor = {

		modal: false,

		init: function() {
			window.madxartwork.on( 'preview:loaded', JetTabsEditor.onPreviewLoaded );
		},

		onPreviewLoaded: function() {
			var $previewContents = window.madxartwork.$previewContents,
				madxartworkFrontend = $('#madxartwork-preview-iframe')[0].contentWindow.madxartworkFrontend;

			madxartworkFrontend.hooks.addAction( 'frontend/element_ready/jet-tabs.default', function( $scope ){
				$scope.find( '.jet-tabs__edit-cover' ).on( 'click', JetTabsEditor.showTemplatesModal );
				$scope.find( '.jet-tabs-new-template-link' ).on( 'click', function( event ) {
					window.location.href = $( this ).attr( 'href' );
				} );
			} );

			madxartworkFrontend.hooks.addAction( 'frontend/element_ready/jet-accordion.default', function( $scope ){
				$scope.find( '.jet-toggle__edit-cover' ).on( 'click', JetTabsEditor.showTemplatesModal );
				$scope.find( '.jet-toogle-new-template-link' ).on( 'click', function( event ) {
					window.location.href = $( this ).attr( 'href' );
				} );
			} );

			madxartworkFrontend.hooks.addAction( 'frontend/element_ready/jet-switcher.default', function( $scope ){
				$scope.find( '.jet-switcher__edit-cover' ).on( 'click', JetTabsEditor.showTemplatesModal );
				$scope.find( '.jet-switcher-new-template-link' ).on( 'click', function( event ) {
					window.location.href = $( this ).attr( 'href' );
				} );
			} );

			JetTabsEditor.getModal().on( 'hide', function() {
				window.madxartwork.reloadPreview();
			});
		},

		showTemplatesModal: function() {
			var editLink = $( this ).data( 'template-edit-link' );

			JetTabsEditor.showModal( editLink );
		},

		showModal: function( link ) {
			var $iframe,
				$loader;

			JetTabsEditor.getModal().show();

			$( '#jet-tabs-template-edit-modal .dialog-message').html( '<iframe src="' + link + '" id="jet-tabs-edit-frame" width="100%" height="100%"></iframe>' );
			$( '#jet-tabs-template-edit-modal .dialog-message').append( '<div id="jet-tabs-loading"><div class="madxartwork-loader-wrapper"><div class="madxartwork-loader"><div class="madxartwork-loader-boxes"><div class="madxartwork-loader-box"></div><div class="madxartwork-loader-box"></div><div class="madxartwork-loader-box"></div><div class="madxartwork-loader-box"></div></div></div><div class="madxartwork-loading-title">Loading</div></div></div>' );

			$iframe = $( '#jet-tabs-edit-frame');
			$loader = $( '#jet-tabs-loading');

			$iframe.on( 'load', function() {
				$loader.fadeOut( 300 );
			} );
		},

		getModal: function() {

			if ( ! JetTabsEditor.modal ) {
				this.modal = madxartwork.dialogsManager.createWidget( 'lightbox', {
					id: 'jet-tabs-template-edit-modal',
					closeButton: true,
					closeButtonClass: 'eicon-close',
					hide: {
						onBackgroundClick: false
					}
				} );
			}

			return JetTabsEditor.modal;
		}

	};

	$( window ).on( 'madxartwork:init', JetTabsEditor.init );

})( jQuery );

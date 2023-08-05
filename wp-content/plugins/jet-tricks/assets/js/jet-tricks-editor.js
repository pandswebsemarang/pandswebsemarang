(function( $ ) {

	'use strict';

	var JetTricksEditor = {

		init: function() {
			window.madxartwork.on( 'preview:loaded', function() {
				madxartwork.$preview[0].contentWindow.JetTricksEditor = JetTricksEditor;

				JetTricksEditor.onPreviewLoaded();
			} );
		},

		onPreviewLoaded: function() {
			var madxartworkFrontend = $( '#madxartwork-preview-iframe' )[0].contentWindow.madxartworkFrontend;

			madxartworkFrontend.hooks.addAction( 'frontend/element_ready/widget', function( $scope ) {
				$scope.find( '.jet-tricks-edit-template-link' ).on( 'click', function( event ) {
					window.open( $( this ).attr( 'href' ) );
				} );
			} );
		}
	};

	$( window ).on( 'madxartwork:init', JetTricksEditor.init );

	window.JetTricksEditor = JetTricksEditor;

}( jQuery ));

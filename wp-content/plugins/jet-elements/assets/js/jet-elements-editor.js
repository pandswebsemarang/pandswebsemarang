( function( $ ) {

	'use strict';

	var JetElementsEditor = {

		activeSection: null,

		editedElement: null,

		init: function() {
			madxartwork.channels.editor.on( 'section:activated', JetElementsEditor.onAnimatedBoxSectionActivated );
			madxartwork.channels.editor.on( 'section:activated', JetElementsEditor.onCountdownSectionActivated );

			window.madxartwork.on( 'preview:loaded', function() {
				madxartwork.$preview[0].contentWindow.JetElementsEditor = JetElementsEditor;

				JetElementsEditor.onPreviewLoaded();
			});

			// Register controls
			madxartwork.addControlView( 'jet_dynamic_date_time', window.madxartwork.modules.controls.Date_time );
		},

		onAnimatedBoxSectionActivated: function( sectionName, editor ) {
			var editedElement = editor.getOption( 'editedElementView' ),
				prevEditedElement = window.JetElementsEditor.editedElement;

			if ( prevEditedElement
				&& 'jet-animated-box' === prevEditedElement.model.get( 'widgetType' )
				&& 'jet-animated-box' !== editedElement.model.get( 'widgetType' )
			) {

				prevEditedElement.$el.find( '.jet-animated-box' ).removeClass( 'flipped' );
				prevEditedElement.$el.find( '.jet-animated-box' ).removeClass( 'flipped-stop' );

				window.JetElementsEditor.editedElement = null;
			}

			if ( 'jet-animated-box' !== editedElement.model.get( 'widgetType' ) ) {
				return;
			}

			window.JetElementsEditor.editedElement = editedElement;
			window.JetElementsEditor.activeSection = sectionName;

			var isBackSide = -1 !== [ 'section_back_content', 'section_action_button_style' ].indexOf( sectionName );

			if ( isBackSide ) {
				editedElement.$el.find( '.jet-animated-box' ).addClass( 'flipped' );
				editedElement.$el.find( '.jet-animated-box' ).addClass( 'flipped-stop' );
			} else {
				editedElement.$el.find( '.jet-animated-box' ).removeClass( 'flipped' );
				editedElement.$el.find( '.jet-animated-box' ).removeClass( 'flipped-stop' );
			}
		},

		onCountdownSectionActivated: function( sectionName, editor ) {
			var editedElement = editor.getOption( 'editedElementView' ),
				prevEditedElement = window.JetElementsEditor.editedElement;

			if ( prevEditedElement
				&& 'jet-countdown-timer' === prevEditedElement.model.get( 'widgetType' )
				&& 'jet-countdown-timer' !== editedElement.model.get( 'widgetType' )
			) {

				prevEditedElement.$el.find( '.jet-countdown-timer-message' ).hide();
				window.JetElementsEditor.editedElement = null;
			}

			if ( 'jet-countdown-timer' !== editedElement.model.get( 'widgetType' ) ) {
				return;
			}

			window.JetElementsEditor.editedElement = editedElement;
			window.JetElementsEditor.activeSection = sectionName;

			if ( 'section_message_style' === sectionName ) {
				editedElement.$el.find( '.jet-countdown-timer-message' ).show();
			} else {
				editedElement.$el.find( '.jet-countdown-timer-message' ).hide();
			}

		},

		onPreviewLoaded: function() {
			var madxartworkFrontend = $('#madxartwork-preview-iframe')[0].contentWindow.madxartworkFrontend;

			madxartworkFrontend.hooks.addAction( 'frontend/element_ready/widget', function( $scope ){

				$scope.find( '.jet-elements-edit-template-link' ).on( 'click', function( event ) {
					window.open( $( this ).attr( 'href' ) );
				} );
			} );
		}
	};

	$( window ).on( 'madxartwork:init', JetElementsEditor.init );

	window.JetElementsEditor = JetElementsEditor;

}( jQuery ) );

( function ( $ ) {
	"use strict";
	$( function () {
		// re init layout after ajax request
		$( document ).on( "sf:ajaxfinish", ".searchandfilter", function( e, data ) {
			if ( window.madxartworkFrontend && window.madxartworkFrontend.elementsHandler && window.madxartworkFrontend.elementsHandler.runReadyTrigger) {
				var runReadyTrigger = window.madxartworkFrontend.elementsHandler.runReadyTrigger;

				runReadyTrigger( data.targetSelector );
				var ajaxTarget = $( data.targetSelector );
				if ( ajaxTarget.length > 0 ) {
					// re-init the accordion js - madxartwork-widget-accordion
					ajaxTarget.find( '.madxartwork-widget' ).each( function () {
						runReadyTrigger( $( this ) );
					} );
				}
			}
		});
	});

	// load search forms in popups
	$( window ).on( 'madxartwork/frontend/init', function() {
		if ( window.madxartworkFrontend ) {
			window.madxartworkFrontend.elements.$document.on( 'madxartwork/popup/show', ( e, id, document ) => {
				if ( $().searchAndFilter ) {
					var $sliders = $( '.madxartwork-popup-modal .searchandfilter .meta-slider' );
					if ( $sliders.length > 0 ) {
						$sliders.empty();
					}
					$( '.madxartwork-popup-modal .searchandfilter' ).searchAndFilter();
				}
			} );
		}
	});

}( jQuery ) );

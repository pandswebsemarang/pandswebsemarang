import filtersInitializer from './filters-initializer';

// Includes
import editorMode from 'includes/madxartwork-editor-mode';

"use strict";

//JetSmartFilters
window.JetSmartFilters = filtersInitializer;

// Init filters
$(document).ready(function () {
	window.JetSmartFilters.initializeFilters();
});

// If madxartwork
$(window).on('madxartwork/frontend/init', function () {
	// edit mode filters init
	if (madxartworkFrontend.isEditMode())
		editorMode.initFilters();
});

// Reinit filters events
$(window)
	.on('jet-popup/render-content/ajax/success', function (evt, popup) {
		window.JetSmartFilters.initializeFiltersInContainer($('#jet-popup-' + popup.popup_id));
	})
	.on('jet-tabs/ajax-load-template/after', function (evt, props) {
		window.JetSmartFilters.initializeFiltersInContainer(props.contentHolder);
	})
	.on('jet-blocks/ajax-load-template/after', function (evt, props) {
		window.JetSmartFilters.initializeFiltersInContainer(props.contentHolder);
	});

// madxartwork pro popup
$(document).on('madxartwork/popup/show', (event, id, instance) => {
	window.JetSmartFilters.initializeFiltersInContainer(instance.$element);
});
// For madxartwork pro version > 3.9.0
window.addEventListener( 'madxartwork/popup/show', ( event )=>{
	const id = event.detail.id;
	const instance = event.detail.instance;
	
	window.JetSmartFilters.initializeFiltersInContainer(instance.$element);
});

window.JetSmartFiltersBricksInit = function() {
	if ( ! window.bricksIsFrontend ) {
		
		const $body = jQuery( 'body' );

		editorMode.checkboxes( $body );
		editorMode.radio( $body );
		editorMode.range( $body );
		editorMode.dateRange( $body );
		editorMode.datePeriod( $body );

	}
}

// Extensions
import './extensions';
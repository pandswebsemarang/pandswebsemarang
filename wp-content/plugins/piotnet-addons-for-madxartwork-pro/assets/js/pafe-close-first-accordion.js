// Frontend

jQuery(document).ready(function( $ ) {
	$(window).on('load', function() {
		$('[data-pafe-close-first-accordion]').each(function(){
			$(this).find( '.madxartwork-tab-title' ).removeClass( 'madxartwork-active' );
			$(this).find( '.madxartwork-tab-content' ).css( 'display', 'none' );
		});
	});
});
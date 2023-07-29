(function( $ ) {

	'use strict';

	var madxListings = {

		init: function() {

			var self = this;

			if ( window.madxListingsSettings && ! window.madxListingsSettings.hasmadxartwork ) {
				if ( $( '.page-title-action' ).length ) {
					$( '.page-title-action' ).remove();
				}
			}

			$( document )
				.on( 'click.madxListings', '.page-title-action, #madx_engine_export_skin', self.openPopup )
				.on( 'click.madxListings', '.madx-listings-popup__overlay', self.closePopup )
				.on( 'click.madxListings', '#madx_engine_import_skin', self.switchImport );

			$( 'body' ).on( 'change', '#listing_source', self.switchListingSources );

		},

		switchImport: function( event ) {

			var $this       = $( this ),
				$form       = $this.siblings( 'form' ),
				activeClass = 'import-active';

			if ( $form.hasClass( activeClass ) ) {
				$form.removeClass( activeClass );
			} else {
				$form.addClass( activeClass );
			}

		},

		switchListingSources: function( event ) {

			var $this = $( this ),
				val   = $this.find( 'option:selected' ).val(),
				$row  = $this.closest( '.madx-listings-popup__form-row' );

			$row.siblings( '.madx-template-listing' ).removeClass( 'madx-template-act' );
			$row.siblings( '.madx-template-' + val ).addClass( 'madx-template-act' );

		},

		openPopup: function( event ) {
			event.preventDefault();
			$( '.madx-listings-popup' ).addClass( 'madx-listings-popup-active' );
		},

		closePopup: function() {
			$( '.madx-listings-popup' ).removeClass( 'madx-listings-popup-active' );
		}

	};

	madxListings.init();

})( jQuery );

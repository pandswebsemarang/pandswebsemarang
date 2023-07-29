(function( $, CPTData ) {

	'use strict';

	var madxCPTPage = {

		init: function() {

			var self = this;

			$( document )
				.on( 'click.madxCPTPage', '.cpt-edit-labels', self.switchLabels )
				.on( 'click.madxCPTPage', '.cpt-delete', self.confirmDeletion );

			$( window ).on( 'cx-select-change', function( event ) {

				var controlName   = event.controlName,
					controlStatus = event.controlStatus,
					value         = null;

				if ( 'madx_post_type_allowed_post_type' !== controlName ) {
					return;
				}

				value = controlStatus.join( ',' );

				$( '#madx_post_type_allowed_posts' ).data( 'post-type', value ).attr( 'data-post-type', value );

			});

			$( 'body' )
				.on( 'change.madxCPTPage', '#madx_post_type_meta_fields .cx-ui-select, #madx_taxonomy_meta_fields .cx-ui-select, #madx_post_type_admin_columns .cx-ui-repeater-item .cx-ui-select', self.switchMetaControls );

			self.setMetaControls();
		},

		confirmDeletion: function( event ) {

			event.preventDefault();

			var href = $( this ).attr( 'href' );

			if ( confirm( CPTData.labels.confirmDeletion ) ) {
				window.location = href;
			}

		},

		setMetaControls: function() {

			$( '#madx_post_type_meta_fields .cx-ui-repeater-item .cx-ui-select, #madx_taxonomy_meta_fields .cx-ui-repeater-item .cx-ui-select, #madx_post_type_admin_columns .cx-ui-repeater-item .cx-ui-select' ).each( function() {
				madxCPTPage.switchMetaControlsHadnler( $( this ) );
			});

		},

		switchMetaControls: function( event ) {
			madxCPTPage.switchMetaControlsHadnler( $( this ) );
		},

		switchLabels: function() {

			var $this    = $( this ),
				$section = $this.closest( '.madx_post_type_labels, .madx_taxonomy_labels' );

			if ( $section.hasClass( 'active-section' ) ) {
				$section.removeClass( 'active-section' );
				$this.text( CPTData.labels.edit );
			} else {
				$section.addClass( 'active-section' );
				$this.text( CPTData.labels.close );
			}

		},

		switchMetaControlsHadnler: function( $this ) {

			var $container = $this.closest( '.type-wrap' ),
				val        = $this.find( 'option:selected' ).val();

			if ( ! $container.length ) {
				return;
			}

			$container.siblings().removeClass( 'meta-type-active' );
			$container.siblings( '.meta-type-' + val ).addClass( 'meta-type-active' );

		}

	};

	madxCPTPage.init();

})( jQuery, window.madxCPTData );
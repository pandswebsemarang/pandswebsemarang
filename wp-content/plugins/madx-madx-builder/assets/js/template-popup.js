(function( $ ) {

	'use strict';

	var madxmadxTemplatePopup = {

		init: function() {

			var self = this;

			$( document )
				.on( 'click.madxmadxTemplatePopup', '.page-title-action', self.openPopup )
				.on( 'click.madxmadxTemplatePopup', '.madx-template-popup__overlay', self.closePopup )
				.on( 'change.madxmadxTemplatePopup', '#template_type', self.switchTemplates )
				.on( 'click.madxmadxTemplatePopup', '.madx-template-popup__item--uncheck', self.uncheckItem )
				.on( 'click.madxmadxTemplatePopup', '.madx-template-popup__label', self.isCheckedItem );

		},

		switchTemplates: function() {
			var $this = $( this ),
				value = $this.find( 'option:selected' ).val();

			if ( '' !== value ) {
				$( '.predesigned-row.template-' + value ).addClass( 'is-active' ).siblings().removeClass( 'is-active' );
			}
		},

		isCheckedItem: function() {
			var $this = $( this ),
				value = $this.find('input'),
				checked = value.prop( "checked" );

			madxmadxTemplatePopup.uncheckAll();

			if( checked ){
				$this.addClass( 'is--checked');
			}
		},

		uncheckAll: function() {
			var item = $( '.madx-template-popup__label' );

			if( item.hasClass('is--checked') ){
				item.removeClass('is--checked');
				item.find('input').prop( "checked", false );
			}
		},

		uncheckItem: function() {
			var $this = $( this ),
				label = $this.parent().find('.madx-template-popup__label'),
				input = label.find('input'),
				checked = input.prop( "checked" );

			if( checked ){
				input.prop( "checked", false );
				label.removeClass('is--checked');
			}
		},

		openPopup: function( event ) {
			event.preventDefault();
			$( '.madx-template-popup' ).addClass( 'madx-template-popup-active' );

			madxmadxTemplatePopup.uncheckAll();
		},

		closePopup: function() {
			$( '.madx-template-popup' ).removeClass( 'madx-template-popup-active' );
		}

	};

	madxmadxTemplatePopup.init();

})( jQuery );
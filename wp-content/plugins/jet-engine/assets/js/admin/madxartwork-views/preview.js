(function( $ ) {

	"use strict";

	var JetEnginemadxartworkPreview = {

		selectors: {
			document: '.madxartwork[data-madxartwork-type="jet-listing-items"]',
			newLising: '.jet-new-listing-item',
		},

		init: function() {

			window.madxartworkFrontend.hooks.addAction( 'frontend/element_ready/jet-listing-grid.default', JetEnginemadxartworkPreview.loadHandles );

			$( document ).on( 'jet-engine/listing-grid/after-lazy-load', JetEnginemadxartworkPreview.loadHandlesOnLazyLoad );

			window.madxartworkFrontend.on( 'components:init', function () {
				window.madxartwork.on( 'document:loaded', function () {
					JetEnginemadxartworkPreview.loadBackHandles();
				} );
			});

			$( document )
				.on( 'click', '.jet-engine-document-handle',      JetEnginemadxartworkPreview.documentHandleClick )
				.on( 'click', '.jet-engine-document-back-handle', JetEnginemadxartworkPreview.documentBackHandleClick );
		},

		loadHandlesOnLazyLoad: function( event, args ) {
			JetEnginemadxartworkPreview.loadHandles( $( args.container ) );
		},

		loadHandles: function( $scope ) {
			var $listing   = $scope.find( '.jet-listing' ).first(),
				$documents = $scope.find( JetEnginemadxartworkPreview.selectors.document ),
				handlesDocuments = [],
				$handleHtml;

			// Nested lists should not add handles.
			if ( $listing.closest( JetEnginemadxartworkPreview.selectors.document ).length ) {
				return;
			}

			if ( !$documents.length ) {
				return;
			}

			if ( $documents.hasClass( 'madxartwork-edit-mode' ) ) {
				return;
			}

			$handleHtml = '<div class="jet-engine-document-handle" role="button" title="' + window.JetEnginemadxartworkPreviewConfig.i18n.edit + '"><i class="eicon-edit"></i></div>';

			$documents.each( function() {

				var $document = $( this ),
					documentID = $document.data( 'madxartworkId' );

				if ( -1 !== handlesDocuments.indexOf( documentID ) ) {
					return;
				}

				$document.addClass( 'jet-engine-document-edit-item' );
				$document.prepend( $handleHtml );
				handlesDocuments.push( documentID );
			} );
		},

		loadBackHandles: function() {
			var $documents = $( JetEnginemadxartworkPreview.selectors.document ).filter( '.jet-engine-document-edit-item.madxartwork-edit-mode' ),
				$handleHtml;

			if ( ! $documents.length ) {
				return;
			}

			$handleHtml = '<div class="jet-engine-document-back-handle" role="button" title="' + window.JetEnginemadxartworkPreviewConfig.i18n.back + '"><i class="eicon-arrow-left"></i></div>';

			$documents.prepend( $handleHtml );
		},

		documentHandleClick: function() {
			var $handle = $( this ),
				$document = $handle.closest( JetEnginemadxartworkPreview.selectors.document );

			if ( $document.hasClass( 'madxartwork-edit-area-active' ) ) {
				return;
			}

			JetEnginemadxartworkPreview.switchDocument( $document.data( 'madxartworkId' ) );
		},

		documentBackHandleClick: function() {
			JetEnginemadxartworkPreview.switchDocument( window.madxartworkFrontendConfig.post.id );
		},

		switchDocument: function( documentID ) {
			if ( ! documentID ) {
				return;
			}

			window.madxartworkCommon.api.internal( 'panel/state-loading' );
			window.madxartworkCommon.api.run( 'editor/documents/switch', {
				id: documentID
			} ).then( function() {
				return window.madxartworkCommon.api.internal( 'panel/state-ready' );
			} );
		}

	};

	$( window ).on( 'madxartwork/frontend/init', JetEnginemadxartworkPreview.init );

}( jQuery ));

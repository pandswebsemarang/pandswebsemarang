const revertButton = document.getElementById( 'madxartwork-import-export__revert_kit' );

if ( revertButton ) {
	revertButton.addEventListener( 'click', ( event ) => {
		event.preventDefault();

		madxartworkCommon.dialogsManager.createWidget( 'confirm', {
			headerMessage: __( 'Sure you want to make these changes?', 'madxartwork' ),
			message: __( 'Removing assets or changing your site settings can drastically change the look of your website.', 'madxartwork' ),
			strings: {
				confirm: __( 'Yes', 'madxartwork' ),
				cancel: __( 'No, go back', 'madxartwork' ),
			},
			onConfirm() {
				location.href = revertButton.href;
			},
		} ).show();
	} );
}

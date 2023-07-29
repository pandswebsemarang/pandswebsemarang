import { useState } from 'react';

import MessageBanner from '../../../../../ui/message-banner/message-banner';
import GoProButton from 'madxartwork-app/molecules/go-pro-button';
import Dialog from 'madxartwork-app/ui/dialog/dialog';

import './pro-banner.scss';

export default function ProBanner( { onRefresh } ) {
	const [ showInfoDialog, setShowInfoDialog ] = useState( false ),
		openGoProExternalPage = () => window.open( 'https://go.madxartwork.com/go-pro-import-export/', '_blank' ),
		onDialogDismiss = () => setShowInfoDialog( false ),
		onDialogApprove = () => {
			setShowInfoDialog( false );

			onRefresh();
		},
		handleGoPro = () => {
			setShowInfoDialog( true );

			openGoProExternalPage();
		};

	return (
		<>
			<MessageBanner
				heading={ __( 'Install madxartwork Pro', 'madxartwork' ) }
				description={ __( "Without madxartwork Pro, importing components like templates, widgets and popups won't work.", 'madxartwork' ) }
				button={ <GoProButton onClick={ handleGoPro } /> }
			/>

			{
				showInfoDialog &&
				<Dialog
					title={ __( 'Is your madxartwork Pro ready?', 'madxartwork' ) }
					text={ __( 'If you’ve purchased, installed & activated madxartwork Pro, we can continue importing all the parts of this site.', 'madxartwork' ) }
					approveButtonColor="primary"
					approveButtonText={ __( 'Yes', 'madxartwork' ) }
					approveButtonOnClick={ onDialogApprove }
					dismissButtonText={ __( 'Not yet', 'madxartwork' ) }
					dismissButtonOnClick={ onDialogDismiss }
					onClose={ onDialogDismiss }
				/>
			}
		</>
	);
}

ProBanner.propTypes = {
	status: PropTypes.string,
	onRefresh: PropTypes.func,
};

ProBanner.defaultProps = {
	status: '',
};

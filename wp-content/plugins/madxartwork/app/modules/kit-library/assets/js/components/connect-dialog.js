import { Dialog } from '@madxartwork/app-ui';
import { useSettingsContext } from '../context/settings-context';

const { useEffect, useRef } = React;

export default function ConnectDialog( props ) {
	const { settings } = useSettingsContext();
	const approveButtonRef = useRef();

	useEffect( () => {
		jQuery( approveButtonRef.current ).madxartworkConnect( {
			success: ( e, data ) => props.onSuccess( data ),
			error: () => props.onError( __( 'Unable to connect', 'madxartwork' ) ),
			parseUrl: ( url ) => url.replace( '%%page%%', props.pageId ),
		} );
	}, [] );

	return (
		<Dialog
			title={ __( 'Connect to Template Library', 'madxartwork' ) }
			text={ __( 'Access this template and our entire library by creating a free personal account', 'madxartwork' ) }
			approveButtonText={ __( 'Get Started', 'madxartwork' ) }
			approveButtonUrl={ settings.library_connect_url }
			approveButtonOnClick={ () => props.onClose() }
			approveButtonColor="primary"
			approveButtonRef={ approveButtonRef }
			dismissButtonText={ __( 'Cancel', 'madxartwork-pro' ) }
			dismissButtonOnClick={ () => props.onClose() }
			onClose={ () => props.onClose() }
		/>
	);
}

ConnectDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	onError: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
	pageId: PropTypes.string,
};

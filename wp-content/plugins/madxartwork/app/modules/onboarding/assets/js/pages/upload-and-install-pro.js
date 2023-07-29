import { useCallback, useEffect, useContext, useState } from 'react';
import useAjax from 'madxartwork-app/hooks/use-ajax';
import usePageTitle from 'madxartwork-app/hooks/use-page-title';
import Content from '../../../../../assets/js/layout/content';
import DropZone from '../../../../../assets/js/organisms/drop-zone';
import Notice from '../components/notice';
import { OnboardingContext } from '../context/context';
import madxartworkLoading from 'madxartwork-app/molecules/madxartwork-loading';

export default function UploadAndInstallPro() {
	usePageTitle( { title: __( 'Upload and Install madxartwork Pro', 'madxartwork' ) } );

	const { state } = useContext( OnboardingContext ),
		{ ajaxState: installProZipAjaxState, setAjax: setInstallProZipAjaxState } = useAjax(),
		[ noticeState, setNoticeState ] = useState( null ),
		[ isLoading, setIsLoading ] = useState( false ),
		[ fileSource, setFileSource ] = useState();

	const uploadProZip = useCallback( ( file ) => {
		setIsLoading( true );

		setInstallProZipAjaxState( {
			data: {
				action: 'madxartwork_upload_and_install_pro',
				fileToUpload: file,
			},
		} );
	}, [] );

	const setErrorNotice = ( error = null, step = 'upload' ) => {
		const errorMessage = error?.message || 'That didn\'t work. Try uploading your file again.';

		madxartworkCommon.events.dispatchEvent( {
			event: 'indication prompt',
			version: '',
			details: {
				placement: madxartworkAppConfig.onboarding.eventPlacement,
				step: state.currentStep,
				action_state: 'failure',
				action: step + ' pro',
				source: fileSource,
			},
		} );

		setNoticeState( {
			type: 'error',
			icon: 'eicon-warning',
			message: errorMessage,
		} );
	};

	/**
	 * Ajax Callbacks
	 */
	// Run the callback that runs when the Pro Upload Ajax returns a response.
	useEffect( () => {
		if ( 'initial' !== installProZipAjaxState.status ) {
			setIsLoading( false );

			if ( 'success' === installProZipAjaxState.status && installProZipAjaxState.response?.madxartworkProInstalled ) {
				madxartworkCommon.events.dispatchEvent( {
					event: 'pro uploaded',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						step: state.currentStep,
						source: fileSource,
					},
				} );

				if ( opener && opener !== window ) {
					opener.jQuery( 'body' ).trigger( 'madxartwork/upload-and-install-pro/success' );

					window.close();
					opener.focus();
				}
			} else if ( 'error' === installProZipAjaxState.status ) {
				setErrorNotice( 'install' );
			}
		}
	}, [ installProZipAjaxState.status ] );

	const onProUploadHelpLinkClick = () => {
		madxartworkCommon.events.dispatchEvent( {
			event: 'pro plugin upload help',
			version: '',
			details: {
				placement: madxartworkAppConfig.onboarding.eventPlacement,
				step: state.currentStep,
			},
		} );
	};

	if ( isLoading ) {
		return <madxartworkLoading loadingText={ __( 'Uploading', 'madxartwork' ) } />;
	}

	return (
		<div className="eps-app e-onboarding__upload-pro">
			<Content>
				<DropZone
					className="e-onboarding__upload-pro-drop-zone"
					onFileSelect={ ( file, event, source ) => {
						setFileSource( source );
						uploadProZip( file );
					} }
					onError={ ( error ) => setErrorNotice( error, 'upload' ) }
					filetypes={ [ 'zip' ] }
					buttonColor="cta"
					buttonVariant="contained"
					heading={ __( 'Import your madxartwork Pro plugin file', 'madxartwork' ) }
					text={ __( 'Drag & Drop your .zip file here', 'madxartwork' ) }
					secondaryText={ __( 'or', 'madxartwork' ) }
					buttonText={ __( 'Browse', 'madxartwork' ) }
				/>
				{ noticeState && <Notice noticeState={ noticeState } /> }
				<div className="e-onboarding__upload-pro-get-file">
					{ __( 'Don\'t know where to get the file from?', 'madxartwork' ) + ' ' }
					{ /* eslint-disable-next-line react/jsx-no-target-blank */ }
					<a onClick={ () => onProUploadHelpLinkClick() } href={ 'https://my.madxartwork.com/subscriptions/' + madxartworkAppConfig.onboarding.utms.downloadPro } target="_blank">
						{ __( 'Click here', 'madxartwork' ) }
					</a>
				</div>
			</Content>
		</div>
	);
}

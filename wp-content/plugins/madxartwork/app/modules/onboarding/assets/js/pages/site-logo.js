/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState, useCallback } from 'react';
import { OnboardingContext } from '../context/context';
import { useNavigate } from '@reach/router';
import useAjax from 'madxartwork-app/hooks/use-ajax';
import DropZone from 'madxartwork-app/organisms/drop-zone';
import UnfilteredFilesDialog from 'madxartwork-app/organisms/unfiltered-files-dialog';

import Layout from '../components/layout/layout';
import PageContentLayout from '../components/layout/page-content-layout';

export default function SiteLogo() {
	const { state, updateState, getStateObjectToUpdate } = useContext( OnboardingContext ),
		[ file, setFile ] = useState( state.siteLogo.id ? state.siteLogo : null ),
		[ isUploading, setIsUploading ] = useState( false ),
		[ showUnfilteredFilesDialog, setShowUnfilteredFilesDialog ] = useState( false ),
		[ fileSource, setFileSource ] = useState(),
		[ noticeState, setNoticeState ] = useState( null ),
		{ ajaxState: updateLogoAjaxState, setAjax: setUpdateLogoAjax } = useAjax(),
		{ ajaxState: uploadImageAjaxState, setAjax: setUploadImageAjax } = useAjax(),
		pageId = 'siteLogo',
		nextStep = 'goodToGo',
		navigate = useNavigate(),
		actionButton = {
			role: 'button',
			onClick: () => {
				madxartworkCommon.events.dispatchEvent( {
					event: 'next',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						step: state.currentStep,
					},
				} );

				if ( file.id ) {
					if ( file.id !== state.siteLogo.id ) {
						updateSiteLogo();
					} else {
						// If the currently displayed logo is already set as the site logo, just go to the next screen.
						const stateToUpdate = getStateObjectToUpdate( state, 'steps', pageId, 'completed' );

						updateState( stateToUpdate );

						navigate( 'onboarding/' + nextStep );
					}
				}
			},
		};

	let skipButton;

	if ( 'completed' !== state.steps[ pageId ] ) {
		skipButton = {
			text: __( 'Skip', 'madxartwork' ),
		};
	}

	if ( isUploading ) {
		actionButton.text = (
			<>
				<i className="eicon-loading eicon-animation-spin" aria-hidden="true" />
			</>
		);
	} else {
		actionButton.text = __( 'Next', 'madxartwork' );
	}

	if ( ! file ) {
		actionButton.className = 'e-onboarding__button--disabled';
	}

	const updateSiteLogo = useCallback( () => {
		setIsUploading( true );

		setUpdateLogoAjax( {
			data: {
				action: 'madxartwork_update_site_logo',
				data: JSON.stringify( {
					attachmentId: file.id,
				} ),
			},
		} );
	}, [ file ] );

	const uploadSiteLogo = ( fileToUpload ) => {
		setIsUploading( true );

		setUploadImageAjax( {
			data: {
				action: 'madxartwork_upload_site_logo',
				fileToUpload,
			},
		} );
	};

	const dismissUnfilteredFilesCallback = () => {
		setIsUploading( false );

		setFile( null );

		setShowUnfilteredFilesDialog( false );
	};

	const onFileSelect = ( selectedFile ) => {
		setFileSource( 'drop' );

		if ( 'image/svg+xml' === selectedFile.type && ! madxartworkAppConfig.onboarding.isUnfilteredFilesEnabled ) {
			setFile( selectedFile );

			setIsUploading( true );

			setShowUnfilteredFilesDialog( true );
		} else {
			setFile( selectedFile );

			setNoticeState( null );

			uploadSiteLogo( selectedFile );
		}
	};

	const onImageRemoveClick = () => {
		madxartworkCommon.events.dispatchEvent( {
			event: 'remove selected logo',
			version: '',
			details: {
				placement: madxartworkAppConfig.onboarding.eventPlacement,
			},
		} );

		setFile( null );
	};

	/**
	 * Ajax Callbacks
	 */
	// Run the callback for the new image upload AJAX request.
	useEffect( () => {
		if ( 'initial' !== uploadImageAjaxState.status ) {
			if ( 'success' === uploadImageAjaxState.status && uploadImageAjaxState.response?.imageAttachment?.id ) {
				madxartworkCommon.events.dispatchEvent( {
					event: 'logo image uploaded',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						source: fileSource,
					},
				} );

				setIsUploading( false );

				setFile( uploadImageAjaxState.response.imageAttachment );

				if ( noticeState ) {
					setNoticeState( null );
				}
			} else if ( 'error' === uploadImageAjaxState.status ) {
				setIsUploading( false );

				setFile( null );

				madxartworkCommon.events.dispatchEvent( {
					event: 'indication prompt',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						action_state: 'failure',
						action: 'logo image upload',
					},
				} );

				setNoticeState( {
					type: 'error',
					icon: 'eicon-warning',
					message: 'That didn\'t work. Try uploading your file again.',
				} );
			}
		}
	}, [ uploadImageAjaxState.status ] );

	// Run the callback for the site logo update AJAX request.
	useEffect( () => {
		if ( 'initial' !== updateLogoAjaxState.status ) {
			if ( 'success' === updateLogoAjaxState.status && updateLogoAjaxState.response?.siteLogoUpdated ) {
				madxartworkCommon.events.dispatchEvent( {
					event: 'logo image updated',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						source: fileSource,
					},
				} );

				setIsUploading( false );

				if ( noticeState ) {
					setNoticeState( null );
				}

				const stateToUpdate = getStateObjectToUpdate( state, 'steps', pageId, 'completed' );

				stateToUpdate.siteLogo = {
					id: file.id,
					url: file.url,
				};

				updateState( stateToUpdate );

				navigate( 'onboarding/' + nextStep );
			} else if ( 'error' === updateLogoAjaxState.status ) {
				setIsUploading( false );

				madxartworkCommon.events.dispatchEvent( {
					event: 'indication prompt',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						step: state.currentStep,
						action_state: 'failure',
						action: 'update site logo',
					},
				} );

				setNoticeState( {
					type: 'error',
					icon: 'eicon-warning',
					message: 'That didn\'t work. Try uploading your file again.',
				} );
			}
		}
	}, [ updateLogoAjaxState.status ] );

	return (
		<Layout pageId={ pageId } nextStep={ nextStep }>
			<PageContentLayout
				image={ madxartworkCommon.config.urls.assets + 'images/app/onboarding/Illustration_Setup.svg' }
				title={ __( 'Have a logo? Add it here.', 'madxartwork' ) }
				actionButton={ actionButton }
				skipButton={ skipButton }
				noticeState={ noticeState }
			>
				<span>
					{ __( 'Otherwise, you can skip this and add one later.', 'madxartwork' ) }
				</span>
				{ ( file && ! showUnfilteredFilesDialog )
					? (
						<div className={ 'e-onboarding__logo-container' + ( isUploading ? ' e-onboarding__is-uploading' : '' ) }>
							<div className="e-onboarding__logo-remove" onClick={ () => onImageRemoveClick() }>
								<i className="eicon-trash-o" />
							</div>
							<img src={ file.url } alt={ __( 'Potential Site Logo', 'madxartwork' ) } />
						</div>
					)
					: <>
						<DropZone
							className="e-onboarding__drop-zone"
							heading={ __( 'Drop image here', 'madxartwork' ) }
							secondaryText={ __( 'or', 'madxartwork' ) }
							buttonText={ __( 'Open Media Library', 'madxartwork' ) }
							buttonVariant="outlined"
							buttonColor="cta"
							icon={ '' }
							type="wp-media"
							filetypes={ [ 'jpg', 'jpeg', 'png', 'svg' ] }
							onFileSelect={ ( selectedFile ) => onFileSelect( selectedFile ) }
							onWpMediaSelect={ ( frame ) => {
								// Get media attachment details from the frame state
								var attachment = frame.state().get( 'selection' ).first().toJSON();

								setFileSource( 'browse' );
								setFile( attachment );

								setNoticeState( null );
							} }
							onButtonClick={ () => {
								madxartworkCommon.events.dispatchEvent( {
									event: 'browse file click',
									version: '',
									details: {
										placement: madxartworkAppConfig.onboarding.eventPlacement,
										step: state.currentStep,
									},
								} );
							} }
							// TODO: DEAL WITH ERROR
							onError={ ( error ) => {
								if ( 'file_not_allowed' === error.id ) {
									madxartworkCommon.events.dispatchEvent( {
										event: 'indication prompt',
										version: '',
										details: {
											placement: madxartworkAppConfig.onboarding.eventPlacement,
											step: state.currentStep,
											action_state: 'failure',
											action: 'logo upload format',
										},
									} );

									setNoticeState( {
										type: 'error',
										icon: 'eicon-warning',
										message: __( 'This file type is not supported. Try a different type of file', 'madxartwork' ),
									} );
								}
							} }
						/>
					</>
				}
				{
					<UnfilteredFilesDialog
						show={ showUnfilteredFilesDialog }
						setShow={ setShowUnfilteredFilesDialog }
						confirmModalText={ __( 'This allows madxartwork to scan your SVGs for malicious content. If you do not wish to allow this, use a different image format.', 'madxartwork' ) }
						errorModalText={ __( 'There was a problem with enabling SVG uploads. Try again, or use another image format.', 'madxartwork' ) }
						onReady={ () => {
							setShowUnfilteredFilesDialog( false );

							madxartworkAppConfig.onboarding.isUnfilteredFilesEnabled = true;

							uploadSiteLogo( file );
						} }
						onDismiss={ () => dismissUnfilteredFilesCallback() }
						onCancel={ () => dismissUnfilteredFilesCallback() }
					/>
				}
			</PageContentLayout>
		</Layout>
	);
}

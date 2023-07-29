import { useRef, useContext, useState } from 'react';
import { useNavigate } from '@reach/router';
import { OnboardingContext } from '../context/context';
import Connect from '../utils/connect';
import Layout from '../components/layout/layout';
import PageContentLayout from '../components/layout/page-content-layout';

export default function Account() {
	const { state, updateState, getStateObjectToUpdate } = useContext( OnboardingContext ),
		[ noticeState, setNoticeState ] = useState( null ),
		navigate = useNavigate(),
		pageId = 'account',
		nextStep = state.isHelloThemeActivated ? 'siteName' : 'hello',
		actionButtonRef = useRef(),
		alreadyHaveAccountLinkRef = useRef();

	let skipButton;

	if ( 'completed' !== state.steps[ pageId ] ) {
		skipButton = {
			text: __( 'Skip', 'madxartwork' ),
		};
	}

	let pageTexts = {};

	if ( state.isLibraryConnected ) {
		pageTexts = {
			firstLine: __( 'To get the most out of madxartwork, we\'ll help you take your first steps:', 'madxartwork' ),
			listItems: [
				__( 'Set your site\'s theme', 'madxartwork' ),
				__( 'Give your site a name & logo', 'madxartwork' ),
				__( 'Choose how to start creating', 'madxartwork' ),
			],
		};
	} else {
		pageTexts = {
			firstLine: __( 'To get the most out of madxartwork, we’ll connect your account.', 'madxartwork' ) +
			' ' + __( 'Then you can:', 'madxartwork' ),
			listItems: [
				__( 'Choose from countless professional templates', 'madxartwork' ),
				__( 'Manage your site with our handy dashboard', 'madxartwork' ),
				__( 'Take part in the community forum, share & grow together', 'madxartwork' ),
			],
		};
	}

	// If the user is not connected, the on-click action is handled by the <Connect> component, so there is no onclick
	// property.
	const actionButton = {
		role: 'button',
	};

	if ( state.isLibraryConnected ) {
		actionButton.text = __( 'Let’s do it', 'madxartwork' );

		actionButton.onClick = () => {
			madxartworkCommon.events.dispatchEvent( {
				event: 'next',
				version: '',
				details: {
					placement: madxartworkAppConfig.onboarding.eventPlacement,
					step: state.currentStep,
				},
			} );

			updateState( getStateObjectToUpdate( state, 'steps', pageId, 'completed' ) );

			navigate( 'onboarding/' + nextStep );
		};
	} else {
		actionButton.text = __( 'Create my account', 'madxartwork' );
		actionButton.href = madxartworkAppConfig.onboarding.urls.signUp + madxartworkAppConfig.onboarding.utms.connectCta;
		actionButton.ref = actionButtonRef;
		actionButton.onClick = () => {
			madxartworkCommon.events.dispatchEvent( {
				event: 'create account',
				version: '',
				details: {
					placement: madxartworkAppConfig.onboarding.eventPlacement,
					source: 'cta',
				},
			} );
		};
	}

	const connectSuccessCallback = ( data ) => {
		const stateToUpdate = getStateObjectToUpdate( state, 'steps', pageId, 'completed' );

		stateToUpdate.isLibraryConnected = true;

		madxartworkCommon.config.library_connect.is_connected = true;
		madxartworkCommon.config.library_connect.current_access_level = data.kits_access_level || data.access_level || 0;

		updateState( stateToUpdate );

		madxartworkCommon.events.dispatchEvent( {
			event: 'indication prompt',
			version: '',
			details: {
				placement: madxartworkAppConfig.onboarding.eventPlacement,
				step: state.currentStep,
				action_state: 'success',
				action: 'connect account',
			},
		} );

		setNoticeState( {
			type: 'success',
			icon: 'eicon-check-circle-o',
			message: 'Alrighty - your account is connected.',
		} );

		navigate( 'onboarding/' + nextStep );
	};

	const connectFailureCallback = () => {
		madxartworkCommon.events.dispatchEvent( {
			event: 'indication prompt',
			version: '',
			details: {
				placement: madxartworkAppConfig.onboarding.eventPlacement,
				step: state.currentStep,
				action_state: 'failure',
				action: 'connect account',
			},
		} );

		setNoticeState( {
			type: 'error',
			icon: 'eicon-warning',
			message: __( 'Oops, the connection failed. Try again.', 'madxartwork' ),
		} );

		navigate( 'onboarding/' + nextStep );
	};

	return (
		<Layout pageId={ pageId } nextStep={ nextStep }>
			<PageContentLayout
				image={ madxartworkCommon.config.urls.assets + 'images/app/onboarding/Illustration_Account.svg' }
				title={ __( 'You\'re here! Let\'s set things up.', 'madxartwork' ) }
				actionButton={ actionButton }
				skipButton={ skipButton }
				noticeState={ noticeState }
			>
				{ actionButton.ref && ! state.isLibraryConnected &&
				<Connect
					buttonRef={ actionButton.ref }
					successCallback={ ( data ) => connectSuccessCallback( data ) }
					errorCallback={ connectFailureCallback }
				/> }
				<span>
					{ pageTexts.firstLine }
				</span>
				<ul>
					{ pageTexts.listItems.map( ( listItem, index ) => {
						return <li key={ 'listItem' + index }>{ listItem }</li>;
					} ) }
				</ul>
			</PageContentLayout>
			{
				! state.isLibraryConnected && (
					<div className="e-onboarding__footnote">
						<p>
							{ __( 'Already have one?', 'madxartwork' ) + ' ' }
							<a
								ref={ alreadyHaveAccountLinkRef }
								href={ madxartworkAppConfig.onboarding.urls.connect + madxartworkAppConfig.onboarding.utms.connectCtaLink }
								onClick={ () => {
									madxartworkCommon.events.dispatchEvent( {
										event: 'connect account',
										version: '',
										details: {
											placement: madxartworkAppConfig.onboarding.eventPlacement,
										},
									} );
								} }
							>
								{ __( 'Connect your account', 'madxartwork' ) }
							</a>
						</p>
						<Connect
							buttonRef={ alreadyHaveAccountLinkRef }
							successCallback={ connectSuccessCallback }
							errorCallback={ connectFailureCallback }
						/>
					</div>
				)
			}
		</Layout>
	);
}

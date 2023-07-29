import { useRef, useContext, useEffect } from 'react';
import { OnboardingContext } from '../../context/context';

import Header from './header';
import ProgressBar from '../progress-bar/progress-bar';
import Content from '../../../../../../assets/js/layout/content';
import Connect from '../../utils/connect';

export default function Layout( props ) {
	useEffect( () => {
		// Send modal load event for current step.
		madxartworkCommon.events.dispatchEvent( {
			event: 'modal load',
			version: '',
			details: {
				placement: madxartworkAppConfig.onboarding.eventPlacement,
				step: props.pageId,
				user_state: madxartworkCommon.config.library_connect.is_connected ? 'logged' : 'anon',
			},
		} );

		updateState( {
			currentStep: props.pageId,
			nextStep: props.nextStep || '',
			proNotice: null,
		} );
	}, [ props.pageId ] );

	const { state, updateState } = useContext( OnboardingContext ),
		headerButtons = [],
		goProButtonRef = useRef(),
		createAccountButton = {
			id: 'create-account',
			text: __( 'Create Account', 'madxartwork-pro' ),
			hideText: false,
			elRef: useRef(),
			url: madxartworkAppConfig.onboarding.urls.signUp + madxartworkAppConfig.onboarding.utms.connectTopBar,
			target: '_blank',
			rel: 'opener',
			onClick: () => {
				madxartworkCommon.events.dispatchEvent( {
					event: 'create account',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						step: state.currentStep,
						source: 'header',
					},
				} );
			},
		};

	if ( state.isLibraryConnected ) {
		headerButtons.push( {
			id: 'my-madxartwork',
			text: __( 'My madxartwork', 'madxartwork-pro' ),
			hideText: false,
			icon: 'eicon-user-circle-o',
			url: 'https://my.madxartwork.com/?utm_source=onboarding-wizard&utm_medium=wp-dash&utm_campaign=my-account&utm_content=top-bar&utm_term=' + madxartworkAppConfig.onboarding.onboardingVersion,
			target: '_blank',
			onClick: () => {
				madxartworkCommon.events.dispatchEvent( {
					event: 'my madxartwork click',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						step: state.currentStep,
						source: 'header',
					},
				} );
			},
		} );
	} else {
		headerButtons.push( createAccountButton );
	}

	if ( ! state.hasPro ) {
		headerButtons.push( {
			id: 'go-pro',
			text: __( 'Upgrade', 'madxartwork' ),
			hideText: false,
			className: 'eps-button__go-pro-btn',
			url: 'https://madxartwork.com/pro/?utm_source=onboarding-wizard&utm_campaign=gopro&utm_medium=wp-dash&utm_content=top-bar&utm_term=' + madxartworkAppConfig.onboarding.onboardingVersion,
			target: '_blank',
			elRef: goProButtonRef,
			onClick: () => {
				madxartworkCommon.events.dispatchEvent( {
					event: 'go pro',
					version: '',
					details: {
						placement: madxartworkAppConfig.onboarding.eventPlacement,
						step: state.currentStep,
					},
				} );
			},
		} );
	}

	return (
		<div className="eps-app__lightbox">
			<div className="eps-app e-onboarding">
				{ ! state.isLibraryConnected &&
					<Connect
						buttonRef={ createAccountButton.elRef }
					/>
				}
				<Header
					title={ __( 'Getting Started', 'madxartwork' ) }
					buttons={ headerButtons }
				/>
				<div className={ 'eps-app__main e-onboarding__page-' + props.pageId }>
					<Content className="e-onboarding__content">
						<ProgressBar />
						{ props.children }
					</Content>
				</div>
			</div>
		</div>
	);
}

Layout.propTypes = {
	pageId: PropTypes.string.isRequired,
	nextStep: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.any.isRequired,
};

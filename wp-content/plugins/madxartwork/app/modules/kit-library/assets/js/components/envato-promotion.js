import { Text, Button } from '@madxartwork/app-ui';
import { appsEventTrackingDispatch } from 'madxartwork-app/event-track/apps-event-tracking';

import './envato-promotion.scss';

export default function EnvatoPromotion( props ) {
	const eventTracking = ( command, eventType = 'click' ) => {
		appsEventTrackingDispatch(
			command,
			{
				page_source: 'home page',
				element_position: 'library_bottom_promotion',
				category: props.category && ( '/favorites' === props.category ? 'favorites' : 'all kits' ),
				event_type: eventType,
			},
		);
	};

	return (
		<Text className="e-kit-library-bottom-promotion" variant="xl">
			{ __( 'Looking for more Kits?', 'madxartwork' ) } { ' ' }
			<Button
				variant="underlined"
				color="link"
				url="https://go.madxartwork.com/app-envato-kits/"
				target="_blank"
				rel="noreferrer"
				text={ __( 'Check out madxartwork Template Kits on ThemeForest', 'madxartwork' ) }
				onClick={ () => eventTracking( 'kit-library/check-kits-on-theme-forest' ) }
			/>
		</Text>
	);
}
 EnvatoPromotion.propTypes = {
	category: PropTypes.string,
 };

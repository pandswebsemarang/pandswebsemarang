import { Card, CardHeader, CardBody, Heading, CardImage, CardOverlay, Grid, Button } from '@madxartwork/app-ui';

import '../../../../kit-library/assets/js/components/kit-list-item.scss';

const NewPageKitListItem = () => {
	return (
		<Card className="e-onboarding__kit-library-card e-kit-library__kit-item">
			<CardHeader>
				<Heading
					tag="h3"
					title={ __( 'Blank Canvas', 'madxartwork' ) }
					variant="h5"
					className="eps-card__headline"
				>
					{ __( 'Blank Canvas', 'madxartwork' ) }
				</Heading>
			</CardHeader>
			<CardBody>
				<CardImage alt={ __( 'Blank Canvas', 'madxartwork' ) } src={ madxartworkCommon.config.urls.assets + 'images/app/onboarding/Blank_Preview.jpg' || '' }>
					<CardOverlay>
						<Grid container direction="column" className="e-kit-library__kit-item-overlay">
							<Button
								className="e-kit-library__kit-item-overlay-overview-button"
								text={ __( 'Create New madxartwork Page', 'madxartwork' ) }
								icon="eicon-single-page"
								url={ madxartworkAppConfig.onboarding.urls.createNewPage }
							/>
						</Grid>
					</CardOverlay>
				</CardImage>
			</CardBody>
		</Card>
	);
};

export default React.memo( NewPageKitListItem );

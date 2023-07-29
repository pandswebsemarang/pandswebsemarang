import Grid from 'madxartwork-app/ui/grid/grid';
import Layout from '../components/layout/layout';
import Card from '../components/card';
import FooterButtons from '../components/layout/footer-buttons';

export default function GoodToGo() {
	const pageId = 'goodToGo',
		skipButton = {
			text: __( 'Skip', 'madxartwork' ),
			href: madxartworkAppConfig.onboarding.urls.createNewPage,
		},
		kitLibraryLink = madxartworkAppConfig.onboarding.urls.kitLibrary + '&referrer=onboarding';

	return (
		<Layout pageId={ pageId }>
			<h1 className="e-onboarding__page-content-section-title">
				{ __( 'That\'s a wrap! What\'s next?', 'madxartwork' ) }
			</h1>
			<div className="e-onboarding__page-content-section-text">
				{ __( 'There are two ways to get started with madxartwork:', 'madxartwork' ) }
			</div>
			<Grid container alignItems="center" justify="space-between" className="e-onboarding__cards-grid e-onboarding__page-content">
				<Card
					name="blank"
					image={ madxartworkCommon.config.urls.assets + 'images/app/onboarding/Blank_Canvas.svg' }
					imageAlt={ __( 'Click here to create a new page and open it in madxartwork Editor', 'madxartwork' ) }
					text={ __( 'Edit a blank canvas with the madxartwork Editor', 'madxartwork' ) }
					link={ madxartworkAppConfig.onboarding.urls.createNewPage }
				/>
				<Card
					name="template"
					image={ madxartworkCommon.config.urls.assets + 'images/app/onboarding/Library.svg' }
					imageAlt={ __( 'Click here to go to madxartwork\'s Kit Library', 'madxartwork' ) }
					text={ __( 'Browse from +100 templates or import your own', 'madxartwork' ) }
					link={ kitLibraryLink }
					clickAction={ () => {
						// The location is reloaded to make sure the Kit Library's state is re-created.
						location.href = kitLibraryLink;
						location.reload();
					} }
				/>
			</Grid>
			<FooterButtons skipButton={ skipButton } className="e-onboarding__good-to-go-footer" />
		</Layout>
	);
}

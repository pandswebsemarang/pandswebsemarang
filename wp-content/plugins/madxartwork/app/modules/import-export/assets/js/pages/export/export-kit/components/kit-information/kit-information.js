import { useState } from 'react';

import KitName from './components/kit-name/kit-name';
import KitDescription from './components/kit-description/kit-description';
import KitInfoModal from './components/kit-info-modal/kit-info-modal';

import Panel from 'madxartwork-app/ui/panel/panel';
import Grid from 'madxartwork-app/ui/grid/grid';
import Heading from 'madxartwork-app/ui/atoms/heading';
import Button from 'madxartwork-app/ui/molecules/button';

const kitInfoTitle = __( 'Kit Information', 'madxartwork' );

export default function KitInformation() {
	const [ showKitInfoModal, setShowKitInfoModal ] = useState( false );

	return (
		<>
			<Panel className="e-app-export-kit-information">
				<Panel.Header>
					<Panel.Headline>
						{ kitInfoTitle }

						<Button
							className="e-app-export-kit-info-modal__icon"
							icon="eicon-info-circle"
							color="secondary"
							hideText={ true }
							text={ kitInfoTitle }
							onClick={ ( event ) => {
								event.stopPropagation();

								setShowKitInfoModal( ( prevState ) => ! prevState );
							} }
						/>
					</Panel.Headline>
				</Panel.Header>

				<Panel.Body>
					<Grid container spacing={ 20 }>
						<Grid item md={ 4 }>
							<Grid container direction="column">
								<Grid className="e-app-export-kit-information__field-header" container alignItems="center">
									<Heading className="e-app-export-kit-information__label" variant="h6" tag="h4">
										{ __( 'Kit Name', 'madxartwork' ) }
									</Heading>
								</Grid>

								<Grid item>
									<KitName />
								</Grid>
							</Grid>
						</Grid>

						<Grid item md={ 4 }>
							<Grid className="e-app-export-kit-information__field-header" container alignItems="center">
								<Heading className="e-app-export-kit-information__label" variant="h6" tag="h4">
									{ __( 'Kit Description', 'madxartwork' ) }
								</Heading>
							</Grid>

							<Grid item>
								<KitDescription />
							</Grid>
						</Grid>
					</Grid>
				</Panel.Body>
			</Panel>

			<KitInfoModal show={ showKitInfoModal } setShow={ setShowKitInfoModal } />
		</>
	);
}

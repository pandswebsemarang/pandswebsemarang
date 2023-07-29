import ModalProvider from 'madxartwork-app/ui/modal/modal';
import Heading from 'madxartwork-app/ui/atoms/heading';
import Text from 'madxartwork-app/ui/atoms/text';

export default function KitInfoModal( props ) {
	return (
		<ModalProvider { ...props } className="e-app-export-kit-info-modal" title={ __( 'Website Kit Information', 'madxartwork' ) }>
			<ModalProvider.Section>
				<Heading className="e-app-export-kit-info-modal__heading" variant="h2" tag="h3">
					{ __( 'What is kit information?', 'madxartwork' ) }
				</Heading>
				<Text>
					{ __( 'These are the details you’ll use to quickly find and apply this kit in the future, even as your collection grows.', 'madxartwork' ) }
				</Text>
			</ModalProvider.Section>
		</ModalProvider>
	);
}

import Dialog from 'madxartwork-app/ui/dialog/dialog';

export default function NotFound() {
	const url = React.useMemo( () => ( madxartworkAppConfig.menu_url.split( '#' )?.[ 1 ] || '/site-editor' ), [] );

	return (
		<Dialog
			title={ __( 'Theme Builder could not be loaded', 'madxartwork' ) }
			text={ __( 'We’re sorry, but something went wrong. Click on ‘Learn more’ and follow each of the steps to quickly solve it.', 'madxartwork' ) }
			approveButtonUrl="https://go.madxartwork.com/app-theme-builder-load-issue/"
			approveButtonColor="link"
			approveButtonTarget="_blank"
			approveButtonText={ __( 'Learn More', 'madxartwork' ) }
			dismissButtonText={ __( 'Go Back', 'madxartwork' ) }
			dismissButtonUrl={ url }
		/>
	);
}

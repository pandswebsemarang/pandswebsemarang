import Notice from 'madxartwork-app/ui/molecules/notice';
import Button from 'madxartwork-app/ui/molecules/button';

import './failed-plugins-notice.scss';

export default function FailedPluginsNotice( { failedPlugins } ) {
	const getButton = () => (
		<Button
			text={ __( 'Learn more', 'madxartwork' ) }
			variant="outlined"
			color="secondary"
			size="sm"
			target="_blank"
			url="https://go.madxartwork.com/app-import-plugin-installation-failed/"
		/>
	);

	return (
		<Notice className="e-app-import-failed-plugins-notice" label={ __( 'Important:', 'madxartwork' ) } color="warning" button={ getButton() }>
			{
				__( "There are few plugins that we couldn't install:", 'madxartwork' ) + ' ' +
				failedPlugins.map( ( { name } ) => name ).join( ' | ' )
			}
		</Notice>
	);
}

FailedPluginsNotice.propTypes = {
	failedPlugins: PropTypes.array,
};

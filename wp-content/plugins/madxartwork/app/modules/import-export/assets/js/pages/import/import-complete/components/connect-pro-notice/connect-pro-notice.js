import Notice from 'madxartwork-app/ui/molecules/notice';
import Button from 'madxartwork-app/ui/molecules/button';

import './connect-pro-notice.scss';

export default function ConnectProNotice() {
	const getButton = () => (
		<Button
			text={ __( 'Let’s do it', 'madxartwork' ) }
			variant="outlined"
			color="secondary"
			size="sm"
			target="_blank"
			url={ madxartworkAppConfig.admin_url + 'admin.php?page=madxartwork-license' }
		/>
	);

	return (
		<Notice className="e-app-import-connect-pro-notice" label={ __( 'Tip:', 'madxartwork' ) } color="info" button={ getButton() }>
			{ __( 'Make sure your madxartwork Pro account is connected', 'madxartwork' ) }
		</Notice>
	);
}

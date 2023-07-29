import Page from 'madxartwork-app/layout/page';

export default function NotFound() {
	const config = {
		title: __( 'Not Found', 'madxartwork' ),
		className: 'eps-app__not-found',
		content: <h1> { __( 'Not Found', 'madxartwork' ) } </h1>,
		sidebar: <></>,
	};

	return (
		<Page { ...config } />
	);
}

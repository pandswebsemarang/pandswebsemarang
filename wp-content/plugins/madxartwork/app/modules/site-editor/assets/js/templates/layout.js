import Page from 'madxartwork-app/layout/page';
import Menu from '../organisms/menu';
import TemplateTypesContext from '../context/template-types';

import './site-editor.scss';

export default function Layout( props ) {
	const config = {
		title: __( 'Theme Builder', 'madxartwork' ),
		titleRedirectRoute: props.titleRedirectRoute ?? null,
		headerButtons: props.headerButtons,
		sidebar: <Menu allPartsButton={ props.allPartsButton } promotion={ props.promotion } />,
		content: props.children,
	};

	return (
		<TemplateTypesContext>
			<Page { ...config } />
		</TemplateTypesContext>
	);
}

Layout.propTypes = {
	headerButtons: PropTypes.arrayOf( PropTypes.object ),
	allPartsButton: PropTypes.element.isRequired,
	children: PropTypes.object.isRequired,
	promotion: PropTypes.bool,
	titleRedirectRoute: PropTypes.string,
};

Layout.defaultProps = {
	headerButtons: [],
};

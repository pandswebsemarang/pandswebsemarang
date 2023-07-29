import { arrayToClassName } from 'madxartwork-app/utils/utils.js';

import Card from 'madxartwork-app/ui/card/card';
import Collapse from 'madxartwork-app/molecules/collapse';

export default function PanelBody( props ) {
	return (
		<Collapse.Content>
			<Card.Body padding={ props.padding } className={ arrayToClassName( [ 'eps-panel__body', props.className ] ) }>
				{ props.children }
			</Card.Body>
		</Collapse.Content>
	);
}

PanelBody.propTypes = {
	className: PropTypes.string,
	padding: PropTypes.string,
	children: PropTypes.any.isRequired,
};

PanelBody.defaultProps = {
	className: '',
	padding: '0',
};

import React, { useRef, useEffect } from 'react';
import { Button } from '@madxartwork/app-ui';
import { arrayToClassName } from '../utils.js';

const ConnectButton = ( props ) => {
	const className = arrayToClassName( [
		'e-app-connect-button',
		props.className,
	] );

	const buttonRef = useRef( null );

	useEffect( () => {
		if ( ! buttonRef.current ) {
			return;
		}

		jQuery( buttonRef.current ).madxartworkConnect();
	}, [] );

	return (
		<Button
			{ ...props }
			elRef={ buttonRef }
			className={ className }
		/>
	);
};

ConnectButton.propTypes = {
	...Button.propTypes,
	text: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	className: PropTypes.string,
};

ConnectButton.defaultProps = {
	className: '',
	variant: 'contained',
	size: 'sm',
	color: 'cta',
	target: '_blank',
	rel: 'noopener noreferrer',
	text: __( 'Connect & Activate', 'madxartwork' ),
};

export default React.memo( ConnectButton );

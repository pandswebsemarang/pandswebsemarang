import { useEffect } from 'react';

export default function usePageTitle( { title, prefix } ) {
	useEffect( () => {
		if ( ! prefix ) {
			prefix = __( 'madxartwork', 'madxartwork' );
		}

		document.title = `${ prefix } | ${ title }`;
	}, [ title, prefix ] );
}

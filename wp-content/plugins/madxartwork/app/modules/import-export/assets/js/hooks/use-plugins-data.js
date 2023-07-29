import { useMemo } from 'react';

export const PLUGINS_KEYS = Object.freeze( {
	madxartwork: 'madxartwork',
	madxartwork_PRO: 'madxartwork Pro',
} );

export default function usePluginsData( plugins ) {
	const getPluginsData = () => {
		if ( ! plugins ) {
			return [];
		}

		const madxartworkPlugins = [],
			generalPlugins = [];

		plugins.forEach( ( plugin ) => {
			switch ( plugin.name ) {
				case PLUGINS_KEYS.madxartwork:
					// Making sure that the core plugin is always first.
					madxartworkPlugins.unshift( plugin );
					break;
				case PLUGINS_KEYS.madxartwork_PRO:
					// Making sure that the pro plugin is always second.
					madxartworkPlugins.push( plugin );
					break;
				default:
					generalPlugins.push( plugin );
			}
		} );

		// Making sure that the madxartwork plugins are always first.
		return madxartworkPlugins.concat( generalPlugins );
	};

	return {
		pluginsData: useMemo( () => getPluginsData(), [ plugins ] ),
	};
}

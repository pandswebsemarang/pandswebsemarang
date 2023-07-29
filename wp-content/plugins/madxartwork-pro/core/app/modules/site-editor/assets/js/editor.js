import Component from './data/component';
import { Templates } from './data/commands';

export default class Module extends madxartworkModules.editor.utils.Module {
	onmadxartworkInit() {
		const config = madxartwork.documents.getCurrent().config;

		if ( config.support_site_editor ) {
			$e.components.register( new Component() );

			$e.data.deleteCache( $e.components.get( Component.namespace ), Templates.signature );
		}
	}
}

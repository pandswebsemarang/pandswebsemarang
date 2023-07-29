export default class Module extends madxartworkModules.Module {
	onInit() {
		this.assignRenewMenuItemAction();
	}

	assignRenewMenuItemAction() {
		window.addEventListener( 'DOMContentLoaded', () => {
			const link = document.querySelector( 'a[href="madxartwork_pro_renew_license_menu_link"]' );

			if ( ! link ) {
				return;
			}

			link.addEventListener( 'click', ( e ) => {
				e.preventDefault();

				window.open( 'https://go.madxartwork.com/wp-menu-renew/', '_blank' );
			} );
		} );
	}
}

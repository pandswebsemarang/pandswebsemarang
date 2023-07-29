const karmaCoreConfig = require( '../madxartwork/karma.conf' );

module.exports = function( config ) {
	karmaCoreConfig( config );

	// Set base path.
	config.basePath = __dirname + '/../madxartwork/';

	// Change qunit-tests to pro.
	Object.entries( config.files ).some( ( [ key, path ] ) => {
		if ( 'assets/js/qunit-tests.js' === path ) {
			config.files[ key ] = __dirname + '/' + path;
			return true;
		}
		return false;
	} );
};

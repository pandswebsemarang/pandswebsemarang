/**
 * Script for madxseo OpenGraph
 *
 * @summary For madxseo OpenGraph settings on madxseo screens & edit post screen (possibly more others).
 *
 * @author Michael Torbert.
 * @author Semper Fi Web Design.
 * @copyright https://semperplugins.com
 * @version 2.9.2
 */

jQuery(document).ready(function () {
	var snippet = jQuery("#madxseo_snippet_link");
	if (snippet.length === 0) {
		jQuery("#madxseo_opengraph_settings_facebook_debug_wrapper").hide();
	} else {
		snippet = snippet.html();
		jQuery("#madxseo_opengraph_settings_facebook_debug")
			.attr("href", "https://developers.facebook.com/tools/debug/sharing/?q=" + snippet);
	}
});

jQuery(document).ready(function( $ ) {

	$('.pafe-wrap').closest('body').find('#footer-left').hide();

	$('[data-pafe-features-save]').click( function() {
	    $('[data-pafe-features]').submit();
	});

	$('input[name="piotnet-addons-for-madxartwork-pro-remove-license"]').click( function() {
	    if( $(this).is(':checked') ) {
	    	$('input[name="piotnet-addons-for-madxartwork-pro-username"]').val('').prop('disabled', true);
	    	$('input[name="piotnet-addons-for-madxartwork-pro-password"]').val('').prop('disabled', true);
	    } else {
	    	$('input[name="piotnet-addons-for-madxartwork-pro-username"]').prop('disabled', false);
	    	$('input[name="piotnet-addons-for-madxartwork-pro-password"]').prop('disabled', false);
	    }
	});

});
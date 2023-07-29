jQuery(window).on('madxartwork:init', function() {
	madxartwork.on('frontend:init', () => {
		madxartworkFrontend.on('components:init', () => {
			visibilityNavigatorToggle();
			setVisibilityBorder();
		})
	});
});

jQuery(window).on('madxartwork:init', function() {
	madxartwork.hooks.addAction( 'panel/open_editor/section', function( panel, model, view ) {
		var cid = model.cid;
		dce_model_cid = cid;
		temporary_disable_visibility(cid);
	} );
	madxartwork.hooks.addAction( 'panel/open_editor/column', function( panel, model, view ) {
		var cid = model.cid;
		dce_model_cid = cid;
		temporary_disable_visibility(cid);
	} );
	madxartwork.hooks.addAction( 'panel/open_editor/widget', function( panel, model, view ) {
		var cid = model.cid;
		dce_model_cid = cid;
		temporary_disable_visibility(cid);
	} );

    madxartwork.channels.editor.on( 'change', ( childView, editedElement ) => {
		if (childView.model.attributes.name !== "enabled_visibility") {
			return;
		}
		visibilityNavigatorToggle();
		setVisibilityBorder();
	});

	// Add Visibility in Context Menu
	madxartwork.hooks.addFilter( 'elements/widget/contextMenuGroups', function( groups, element ) {
		groups.push(
			{
				name: 'dce_visibility_frontend',
				actions: [
					{
						name: 'toggle_visibility',
						title: 'Toggle Visibility in Frontend',
						icon: 'fa fa-eye',
						callback: function() {
							if (element.model.getSetting('enabled_visibility') == 'yes') {
								element.model.setSetting('enabled_visibility', 'no');
							} else {
								element.model.setSetting('enabled_visibility', 'yes');
							}
						}
					}
				]
			}
		);
		return groups;
	} );

	// Visibility Toggle
    jQuery(document).on('click', '.dce-madxartwork-navigator__element__toggle', function() {
        var element = jQuery(this).closest('.madxartwork-navigator__element');
        var cid = element.data('model-cid');
        var eid = jQuery(this).data('eid');
        if (jQuery('.madxartwork-control-enabled_visibility').is(':visible')) {
            jQuery('.madxartwork-switch-input[data-setting=enabled_visibility]').click();
        } else {
            dce_visibility_toggle(cid, true);
        }
        return false;
    });
    jQuery(document).on('click', '.madxartwork-context-menu-list__item-visibility', function() {
        var cid = dce_model_cid;
        dce_visibility_toggle(cid, true);
        return false;
    });
    jQuery(document).on('change', '.madxartwork-switch-input[data-setting=enabled_visibility]', function() {
        var cid = dce_model_cid;
        dce_visibility_toggle(cid, false);
    });
});

function temporary_disable_visibility(cid) {
    var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
    iFrameDOM.find('.dce-visibility-hidden').removeClass('dce-visibility-no-opacity');
    var eid = dce_get_element_id_from_cid(cid);
    iFrameDOM.find('.madxartwork-element[data-id='+eid+'].dce-visibility-hidden').addClass('dce-visibility-no-opacity');
}

function dce_visibility_is_debug(cid) {
    var settings = madxartworkFrontend.config.elements.data[cid].attributes;
    if (settings['dce_visibility_debug']) {
      return true;
    }
    return false;
}
function dce_visibility_is_hidden(cid) {
    if (cid && madxartworkFrontend.config.elements.data[cid]) {
        var settings = madxartworkFrontend.config.elements.data[cid].attributes;
        if (settings['enabled_visibility']) {
        	return true;
        }
    }
    return false;
}
function dce_visibility_toggle(cid, change_data) {
    var settings = madxartworkFrontend.config.elements.data[cid].attributes;
    if (change_data) {
        if (settings['enabled_visibility']) {
            madxartworkFrontend.config.elements.data[cid].attributes['enabled_visibility'] = '';
        } else {
            madxartworkFrontend.config.elements.data[cid].attributes['enabled_visibility'] = 'yes';
            madxartworkFrontend.config.elements.data[cid].attributes['dce_visibility_hidden'] = 'yes';
        }
    }

    dce_navigator_element_toggle(cid);

    // color element hidden
    var eid = dce_get_element_id_from_cid(cid);
    var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
    if (settings['enabled_visibility']) {
        iFrameDOM.find('.madxartwork-element[data-id='+eid+']').addClass('dce-visibility-hidden');
    } else {
        iFrameDOM.find('.madxartwork-element[data-id='+eid+']').removeClass('dce-visibility-hidden');
    }

    return true;
}

function dce_navigator_element_toggle(cid) {
  if (dce_visibility_is_hidden(cid)) {
    jQuery('.madxartwork-navigator__element[data-model-cid='+cid+'] > .madxartwork-navigator__item > .dce-madxartwork-navigator__element__toggle > .dce-icon-visibility').addClass('dce-icon-visibility-hidden').removeClass('fa-eye').addClass('fa-eye-slash');
    jQuery('.madxartwork-navigator__element[data-model-cid='+cid+']').addClass('dce-visibility-hidden');
  } else {
    jQuery('.madxartwork-navigator__element[data-model-cid='+cid+'] > .madxartwork-navigator__item > .dce-madxartwork-navigator__element__toggle > .dce-icon-visibility').removeClass('dce-icon-visibility-hidden').addClass('fa-eye').removeClass('fa-eye-slash');
    jQuery('.madxartwork-navigator__element[data-model-cid='+cid+']').removeClass('dce-visibility-hidden');
    }
}

function update_visibility_trigger(cid, eid) {
    if (!eid) {
        var eid = dce_get_element_id_from_cid(cid);
    }
    var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
    if (dce_visibility_is_hidden(cid) && dce_visibility_is_debug(cid)) {
        if (!iFrameDOM.find('.madxartwork-element[data-id='+eid+'] > .madxartwork-dce-visibility').length) {
            iFrameDOM.find('.madxartwork-element[data-id='+eid+']').append('<div class="madxartwork-dce-visibility"><ul></ul></div>');
            var edv = iFrameDOM.find('.madxartwork-element[data-id='+eid+'] > .madxartwork-dce-visibility > ul').first();
            edv.html('');
            jQuery.each(madxartworkFrontend.config.elements.data[cid].attributes, function(index, element){
                if (element && index.startsWith('dce_visibility_') && !index.endsWith('_selected') && !index.startsWith('dce_visibility_fallback_') ) {
                    if (element.length === 0) {
                        return;
                    }
                    if (index == 'dce_visibility_text_fallback' || index == 'dce_visibility_mode' || index == 'dce_visibility_debug' || index == 'dce_visibility_custom_condition_secure') {
                        return;
                    }
                    if (index == 'dce_visibility_custom_condition_php') {
                        if ('return true;' == element.trim()) {
                            return;
                        }
                    }
                    var subcond = index.split('_');
                            subcond.pop();
                                    subcond = subcond.join('_');
                    if (typeof madxartworkFrontend.config.elements.data[cid].attributes[subcond] != 'undefined') {
                        return;
                    }
                    var eleval = element;
                    if (typeof eleval === 'object') {
                        if (!eleval.size) {
                            return;
                        }
                        eleval = eleval.size;
                    }
                    edv.html(edv.html() + '<li><b>'+index.substr(15)+':</b> '+eleval+'</li>');
                }
            });
        }
    } else {
        iFrameDOM.find('.madxartwork-element[data-id='+eid+'] > .madxartwork-dce-visibility').remove();
    }
}

function visibilityNavigatorToggle() {
	jQuery('.madxartwork-navigator__item').each(function(){
		if (!jQuery(this).hasClass('dce-visibility__item' )) {
			var element = jQuery(this).closest('.madxartwork-navigator__element');
			var cid = element.data('model-cid');
			var eid = dce_get_element_id_from_cid(cid);
			if (eid) {
				// add button to force visibility
				jQuery(this).children('.madxartwork-navigator__element__toggle').after(
						'<div class="dce-madxartwork-navigator__element__toggle" data-cid="'+cid+' data-eid="'+eid+'"><i class="dce-icon-visibility fa fa-eye" aria-hidden="true"></i></div>'
					);
				jQuery(this).addClass('dce-visibility__item');
			}
		}
	});
}

function setVisibilityBorder() {
	var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();
	if ( window.madxartworkFrontend ) {
		jQuery.each(madxartworkFrontend.config.elements.data, function(cid, element){
			var eid = dce_get_element_id_from_cid(cid);
			if (eid) {
				// check if element is just hidden
				if (dce_visibility_is_hidden(cid)) {
					dce_navigator_element_toggle(cid);
					iFrameDOM.find('.madxartwork-element[data-id='+eid+']').addClass('dce-visibility-hidden');
				}
				update_visibility_trigger(cid, eid);
			}
		});
	}
}

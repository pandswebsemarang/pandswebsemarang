
// Code for adding Add Attribute & Remove Attribute in Batch Update


jQuery(document).on('smart_manager_post_load_grid','#sm_editor_grid', function() {
	if( window.smart_manager.current_selected_dashboard == 'product' && typeof(window.smart_manager.column_names_batch_update) != 'undefined' ) {

		//Code for handling Product Attribute
		if( typeof(window.smart_manager.column_names_batch_update['custom/product_attributes']) != 'undefined' && Object.keys(window.smart_manager.column_names_batch_update['custom/product_attributes']['values']).length > 0 ) {

			let attrObj = window.smart_manager.column_names_batch_update['custom/product_attributes'];

			window.smart_manager.column_names_batch_update['custom/product_attributes_add'] = JSON.parse( JSON.stringify( attrObj ) );
			window.smart_manager.column_names_batch_update['custom/product_attributes_add']['name'] = 'Add Attribute';
			window.smart_manager.column_names_batch_update['custom/product_attributes_add']['type'] = 'dropdown';

			if( !window.smart_manager.column_names_batch_update['custom/product_attributes_add']['values'].hasOwnProperty('custom') ) {
				window.smart_manager.column_names_batch_update['custom/product_attributes_add']['values'].custom = { 'lbl': 'Custom',
																													'type': 'text',
																													'val': new Array() };
			}

			window.smart_manager.column_names_batch_update['custom/product_attributes_remove'] = JSON.parse( JSON.stringify( attrObj ) );
			window.smart_manager.column_names_batch_update['custom/product_attributes_remove']['name'] = 'Remove Attribute';
			window.smart_manager.column_names_batch_update['custom/product_attributes_remove']['type'] = 'dropdown';

			delete window.smart_manager.column_names_batch_update['custom/product_attributes'];
		}

		//Code for handling Product Category
		if( typeof(window.smart_manager.column_names_batch_update['terms/product_cat']) != 'undefined' && Object.keys(window.smart_manager.column_names_batch_update['terms/product_cat']['values']).length > 0 ) {

			let attrObj = window.smart_manager.column_names_batch_update['terms/product_cat'],
				categories = window.smart_manager.column_names_batch_update['terms/product_cat']['values'],
				parentCategories = {},
				childCategories = {};

			Object.entries(categories).forEach(([key, obj]) => {
				parentCategories[key] = obj.term;

				if( typeof(obj.parent) != 'undefined' && obj.parent > 0 ) {
					if( typeof(childCategories[obj.parent]) == 'undefined' ) {
						childCategories[obj.parent] = {};
					}
					childCategories[obj.parent][key] = obj.term;
				}
			});

			//Code for parent categories
			if( Object.keys(parentCategories).length > 0 ) {
				window.smart_manager.column_names_batch_update['custom/product_cat_parent'] = JSON.parse( JSON.stringify( attrObj ) );
				window.smart_manager.column_names_batch_update['custom/product_cat_parent']['name'] = 'Categories';
				window.smart_manager.column_names_batch_update['custom/product_cat_parent']['type'] = 'dropdown';
				window.smart_manager.column_names_batch_update['custom/product_cat_parent']['values'] = parentCategories;
			}
			
			//Code for child categories 
			if( Object.keys(childCategories).length > 0 ) {

				Object.entries(childCategories).forEach(([key, obj]) => {

					let parentCatName = categories[key].term,
						pkey = 'custom/product_cat_'+window.smart_manager.convert_to_slug(parentCatName);

					window.smart_manager.column_names_batch_update[pkey] = JSON.parse( JSON.stringify( attrObj ) );
					window.smart_manager.column_names_batch_update[pkey]['name'] = 'Categories: '+parentCatName;
					window.smart_manager.column_names_batch_update[pkey]['type'] = 'dropdown';
					window.smart_manager.column_names_batch_update[pkey]['values'] = obj;

				});
			}

			delete window.smart_manager.column_names_batch_update['terms/product_cat'];
		}	
	}
})

//Code to handle after change of batch update field in case of product attributes and categories
.on('sm_batch_update_field_on_change', function(e, rowId, selectedField, type, colVal) {

	if( jQuery("#"+rowId+" #batch_update_value_td_2").length ) { //handling for removing custom attribute td
		jQuery("#"+rowId+" #batch_update_value_td_2").remove();
	}

	if( jQuery('#batchmod_sm_editor_grid #batch_update_value_td_2').length == 0 ) { //handling for restoring the batch update dialog size
		jQuery("#batchmod_sm_editor_grid").css('width','640px');
	}

	if( selectedField == 'custom/product_attributes_add' || selectedField == 'custom/product_attributes_remove' ) {
		window.smart_manager.batch_update_action_options_default = '<option value="" disabled selected>Select Attribute</option>';

		if( Object.keys(colVal).length > 0 ) {
			for( attr_nm in colVal ) {
				window.smart_manager.batch_update_action_options_default += '<option value="'+ attr_nm +'">'+ colVal[attr_nm].lbl +'</option>';
			}
		}

	} else if( selectedField.indexOf('custom/product_cat') != -1 ) {
		window.smart_manager.batch_update_action_options_default = '<option value="" disabled selected>Select Action</option>'+
																	'<option value="set_to">set to</option>'+
																	'<option value="add_to">add to</option>'+
																	'<option value="remove_from">remove from</option>';
	}
})

//Code to handle after specific attribute has been selected in case of add or remove attribute
.on('change','#batch_update_action',function(){
	let rowId = jQuery(this).closest('tr').attr('id'),
		selectedField = jQuery( "#"+rowId+" #batch_update_field option:selected" ).val(),
        selectedAction = jQuery( "#"+rowId+" #batch_update_action option:selected" ).val(),
        type = window.smart_manager.column_names_batch_update[selectedField].type,
        colVal = window.smart_manager.column_names_batch_update[selectedField].values;

    if( jQuery("#"+rowId+" #batch_update_value_td_2").length ) { //handling for removing custom attribute td
		jQuery("#"+rowId+" #batch_update_value_td_2").remove();
	}

	if( jQuery('#batchmod_sm_editor_grid #batch_update_value_td_2').length == 0 ) { //handling for restoring the batch update dialog size
		jQuery("#batchmod_sm_editor_grid").css('width','640px');
	}

    if( selectedField == 'custom/product_attributes_add' || selectedField == 'custom/product_attributes_remove' ) {

    	if( selectedAction != 'custom' ) { //code for handling action for non-custom attribute

    		let batchUpdateValueOptions = '',
    			batchUpdateValueSelectOptions = '',
	    		valueOptionsEmpty = true;

	    	if( typeof (colVal[selectedAction]) != 'undefined' && typeof (colVal[selectedAction].val) != 'undefined' ) {

	    		colVal = colVal[selectedAction].val;

	    		for (var key in colVal) {
		            if( typeof (colVal[key]) != 'object' && typeof (colVal[key]) != 'Array' ) {
		                valueOptionsEmpty = false;
		                batchUpdateValueSelectOptions += '<option value="'+key+'">'+ colVal[key] + '</option>';
		            }
		        }
	    	}

	        if( valueOptionsEmpty === false ) {
	        	batchUpdateValueOptions = '<select class="batch_update_value" style="min-width:130px !important;">'+
	        									'<option value="all">All</option>'+
	        									batchUpdateValueSelectOptions +
	        									'</select>';
	            jQuery("#"+rowId+" #batch_update_value_td").empty().append(batchUpdateValueOptions)
	            jQuery("#"+rowId+" #batch_update_value_td").find('.batch_update_value').select2({ width: '15em', dropdownCssClass: 'sm_beta_batch_update_field', dropdownParent: jQuery('[aria-describedby="sm_inline_dialog"]') });
	        }

    	} else { //code for handling action for custom attribute

    		jQuery("#"+rowId+" #batch_update_value_td").html("<input type='text' class='batch_update_value' placeholder='Enter Attribute name...' class='FormElement ui-widget-content'>");
    		jQuery("<td id='batch_update_value_td_2' style='white-space: pre;'><input type='text' class='batch_update_value_2' placeholder='Enter values...' title='For more than one values, use pipe (|) as delimiter' class='FormElement ui-widget-content'></td>").insertAfter("#"+rowId+" #batch_update_value_td");
    		jQuery("#batchmod_sm_editor_grid").css('width','760px');
    	}
    	
    }

})

//Code to make changes to batch_update_actons on batch update form submit for custom attribute handling
.off('sm_batch_update_on_submit').on('sm_batch_update_on_submit',function(){

	let index = 0;

	jQuery('tr[id^=batch_update_action_row_]').each(function() {
		let value2 = jQuery(this).find('.batch_update_value_2').val();

		if( typeof (value2) != 'undefined' ) {
			window.smart_manager.batch_update_actions[index].value2 = value2; 
		}

		index++;
	});
});


// jQuery(function(jQuery) {
var sm = {dashboard_model:'', dashboard_key: '', dashboard_display_title: '', dashboard_select_options: '',sm_nonce: '', column_names: [], search_query: [], post_data_params:'', month_names_short:'', search_count:0, state_apply: false, dashboard_states: {}, skip_default_action: false, current_selected_dashboard : ''},
    page = 1,
    hideDialog = '',
    inline_edit_dlg = '',
    multiselect_chkbox_list = '',
    limit = sm_beta_params.record_per_page,
    sm_dashboards_combo = '', // variable to store the dashboard names
    column_names_batch_update = new Array(), // array for storing the batch update fields
    sm_column_names_src = new Array(), // array for storing the column src for current dashboard
    sm_store_table_model = new Array(), // array for storing store table model
    lastrow = '1',
    lastcell = '1',
    grid_width = '750',
    grid_height = '600',
    sm_ajax_url = (ajaxurl.indexOf('?') !== -1) ? ajaxurl + '&action=sm_beta_include_file' : ajaxurl + '?action=sm_beta_include_file',
    //defining default actions for batch update
    batch_update_action_string = {set_to:'set to', prepend:'prepend', append:'append'};
    batch_update_action_number = {set_to:'set to', increase_by_per:'increase by %', decrease_by_per:'decrease by %', increase_by_num:'increase by number', decrease_by_num:'decrease by number'};
    sm_qtags_btn_init = 1,
    sm_grid_nm = 'sm_editor_grid', //name of div containing jqgrid
    sm_wp_editor_html = '', //variable for storing the html of the wp editor
    sm_last_edited_row_id = sm_last_edited_col = '',
    sm_updated_msg = sm_beta_params.updated_msg,
    sm_dashboards = sm_beta_params.sm_dashboards,
    sm_lite_dashboards = sm_beta_params.lite_dashboards,
    sm_admin_email = sm_beta_params.sm_admin_email,
    SM_IS_madx30 = sm_beta_params.SM_IS_madx30,
    SM_IS_madx22 = sm_beta_params.SM_IS_madx22,
    SM_IS_madx21 = sm_beta_params.SM_IS_madx21,
    SM_BETA_PRO = sm_beta_params.SM_BETA_PRO,
    batch_background_process = sm_beta_params.batch_background_process,
    sm_success_msg = sm_beta_params.success_msg
    background_process_name = sm_beta_params.background_process_name,
    sm_updated_sucessfull = parseInt(sm_beta_params.updated_sucessfull),
    window_width = jQuery(window).width(),
    window_height = jQuery(window).height(),
    col_model_search = '';

    sm.month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var convert_to_slug = function(text) {
        return text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'');
    }

    hide_inline_dialog = function(edited_col) {

        var grid = jQuery("#sm_editor_grid"),
            gID = grid[0].id,
            IDs = {
                themodal:gID+'_inlinemod',
                modalhead:gID+'_inlinehd',
                modalcontent:gID+'_inlinecnt',
                scrollelm:gID+'_inlineTbl'
            };

        // jQuery(document).trigger("sm_inline_edit_dlg_hide",edited_col); //event for adding custom elements to jqgrid titlebar
        jQuery.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:true, onClose: null});
        index = 0;
    }

    //function for inline edit dialog
    inline_edit_dlg = function (dialog_content, title, dlg_width, dlg_height, edited_col) {            
        modal_width = '';
        modal_height = '';

        if (dlg_width == '' || dlg_width == undefined) {
            modal_width = 350;
        } else {
            modal_width = dlg_width;
        }

        if (dlg_height == '' || dlg_height == undefined) {
            modal_height = 390;
        } else {
            modal_height = dlg_height;
        }

        var grid = jQuery("#sm_editor_grid"),
            gID = grid[0].id,
            IDs = {
                themodal:gID+'_inlinemod',
                modalhead:gID+'_inlinehd',
                modalcontent:gID+'_inlinecnt',
                scrollelm:gID+'_inlineTbl'
            },
            dlgContent = dialog_content,

            hideDialog = function() {
                jQuery(document).trigger("sm_inline_edit_dlg_hide",edited_col); //event for adding custom elements to jqgrid titlebar
                jQuery.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:true, onClose: null});
                index = 0;
            }

                if (jQuery('#'+IDs.themodal).length===0) {
                    // dialog not yet exist. we need create it.
                    jQuery.jgrid.createModal(
                        IDs,
                        dlgContent,
                        {
                            gbox: "#gbox_"+gID,
                            caption: title,
                            jqModal: true,
                            left: ((window_width - modal_width)/2),
                            top: ((window_height - modal_height)/2),
                            overlay: 10,
                            width: modal_width,
                            height: modal_height,
                            zIndex: 950,
                            drag: true,
                            reloadAfterSubmit: true,
                            // resize: true,
                            closeOnEscape: true,
                            closeicon: [false,'left','ui-icon-close'],
                            onClose:hideDialog
                            
                        },
                        "#gview_"+gID,
                        jQuery("#gview_"+gID)[0]);
                        jQuery("#"+gID+"_inlinemod").css({'overflow-x': 'hidden', 'overflow-y': 'scroll'});
                } else {
                    jQuery("#"+gID+"_inlinemod").css({'width': modal_width, 'height': modal_height, 'overflow-x': 'hidden', 'overflow-y': 'scroll', 'left': ((window_width - modal_width)/2), 'top':((window_height - modal_height)/2)});
                    // jQuery("#edit_product_attributes").html(dialog_content);

                    jQuery("#"+gID+"_inlinecnt").html(dialog_content);
                }

                jQuery.jgrid.viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:true, overlay: 10, modal:false});


                jQuery("#"+gID+"_inlinehd").find('.ui-jqdialog-titlebar-close').hide();

    }


    //Function to handle the state apply at regular intervals
    var sm_beta_state_update =  function() {
            
        if (sm.state_apply === true) {

            sm_refresh_dashboard_states();

            var params = {
                            cmd: 'save_state',
                            security: sm.sm_nonce,
                            active_module: sm.dashboard_key
                        };

            params['dashboard_states'] = sm.dashboard_states;

            jQuery.ajax({

                type : 'POST',
                url : sm_ajax_url,
                dataType:"text",
                async: false,
                data: params,
                success: function() {
                    sm.state_apply = false;
                }
            });
        }
        
    }

    // Function to format the column name
    // sm.format_column_name = function( col_nm ) {

    //     if( typeof(col_nm) != 'undefined' && col_nm != '' ) {
    //         var col_nm_split = col_nm.split("/");

    //         if( col_nm_split instanceof Array ){
    //             if( col_nm_split.length > 2 ) {
    //                 var col_meta = col_nm_split[1].split("=");
    //                 col_nm = col_meta[1];
    //             } else {
    //                 col_nm = col_nm_split[1];
    //             }
    //         }
    //     }

    //     return col_nm;

    // }

jQuery(document).ready(function() {

    sm_dashboards_combo = sm_dashboards = jQuery.parseJSON(sm_dashboards);

    sm_lite_dashboards = jQuery.parseJSON(sm_lite_dashboards);

    sm.current_selected_dashboard = sm_dashboards['default'];

    sm.dashboard_key = sm_dashboards['default'];
    sm.dashboard_display_title = sm_dashboards['default_dashboard_title'];    

    sm.sm_nonce = sm_dashboards['sm_nonce'];

    delete sm_dashboards['sm_nonce'];

    var current_url = document.URL;

    if ( !jQuery(document.body).hasClass('folded') && current_url.indexOf("page=smart-manager") != -1 ) {
        jQuery(document.body).addClass('folded');
    }

    //Function to set all the states on unload
    window.onbeforeunload = function (evt) { 
        sm_beta_state_update();
    }
        
    grid_width  = document.documentElement.offsetWidth - 80;
    grid_height  = document.documentElement.offsetHeight - 190;

    jQuery('#collapse-menu').live('click', function() {

        var current_url = document.URL;

        if ( current_url.indexOf("page=smart-manager") == -1 ) {
            return;
        }

        if ( !jQuery(document.body).hasClass('folded') ) {
            grid_width  = document.documentElement.offsetWidth - 205;
        }
        else {
            grid_width  = document.documentElement.offsetWidth - 80;
        }
        
        // grid_width  = document.documentElement.offsetWidth - 100;

        jQuery('#sm_editor_grid').jqGrid("setGridWidth", grid_width);
        jQuery('#sm_editor_grid').trigger( 'reloadGrid' );

    });

    sm_qtags_btn_init = 0;

    sm_wp_editor_html = jQuery('#sm_wp_editor').html();

    jqgrid_custom_func();
    load_dashboard ();

});

//Function to handle the loading of the dashboard
var load_dashboard = function () {


    // jQuery('#sm_editor_grid').jqGrid('GridUnload');
    // jQuery('#sm_editor_grid').jqGrid('gridUnload');
    jQuery.jgrid.gridUnload('sm_editor_grid');


    if ( typeof(sm.dashboard_model) == 'undefined' || sm.dashboard_model == '' ) {
        sm.column_names = new Array();
        column_names_batch_update = new Array();
        get_dashboard_model();    
    }

    load_grid();

    //Code for enabling the batch update button
    jQuery( "input[id^='jqg_sm_editor_grid_'], #jqgh_sm_editor_grid_cb input" ).live('change', function() {

        var selected_row_count = jQuery("input[id^='jqg_sm_editor_grid_']:checked").length,
            cb_header_selected = jQuery("#jqgh_sm_editor_grid_cb input").is(':checked');
        if ((selected_row_count > 0 || (cb_header_selected && jQuery(this).parent().attr('id') == 'jqgh_sm_editor_grid_cb' )) && batch_background_process != 1 ) {
            if( sm.dashboard_key == 'user' ) {
                jQuery('#batch_update_sm_editor_grid').removeClass('ui-state-disabled');
            } else {
                jQuery('#batch_update_sm_editor_grid, .sm_beta_dropdown, #print_invoice_sm_editor_grid').removeClass('ui-state-disabled');    
            }
        } else if(selected_row_count <= 0 ) {
            jQuery('#batch_update_sm_editor_grid, .sm_beta_dropdown, #print_invoice_sm_editor_grid').addClass('ui-state-disabled');
        }

        if (jQuery(this).parent().attr('id') == 'jqgh_sm_editor_grid_cb' && cb_header_selected === false) {
            jQuery('#batch_update_sm_editor_grid, .sm_beta_dropdown, #print_invoice_sm_editor_grid').addClass('ui-state-disabled');
        }

    })

    //code for inline editing dirty cell highlighting
    jQuery('#sm_editor_grid td input, #sm_editor_grid td select').live('change',function() {
        if (jQuery(this).parent().attr('aria-describedby') == 'sm_editor_grid_cb' ) return;
        jQuery(this).parent().addClass('sm-jqgrid-dirty-cell');
        jQuery(this).parent().parent().addClass('edited'); // for adding class to the td element
        jQuery('#save_sm_editor_grid').removeClass('ui-state-disabled');

    });

    var grid = jQuery("#sm_editor_grid"),
        gID = grid[0].id,
        rowId;

    //Code to create the dashboard combobox
    var selected = '';
    sm.dashboard_select_options = '';


    for (var key in sm_dashboards) {

        if (key == 'default') continue;

        selected = '';

        if (key == sm.dashboard_key) {
            selected = "selected";
        }
        sm.dashboard_select_options += '<option value="'+key+'" '+selected+'>'+sm_dashboards[key]+'</option>'
    }

    if( SM_BETA_PRO == 0 ) { 
        sm_beta_smart_date_filter = '<div class="sm_date_range_container">'+
                                        '<div>'+
                                            '<input placeholder="Created Start Date" class="sm_date_selector start-date" id="sm_date_selector_start_date" title="Click to edit created start date" readonly>'+
                                        '</div>'+
                                        '<div class="date-separator">-</div>'+
                                        '<div>'+
                                            '<input placeholder="Created End Date" class="sm_date_selector end-date" id="sm_date_selector_end_date" title="Click to edit created end date" readonly>'+
                                        '</div>'+
                                        '<div class="dropdown">'+
                                            '<span class="dashicons dashicons-arrow-down-alt2 smart-date-icon dropdown-toggle" id="smartDatesDropdown" title="Click to select a pre-defined created date range"></span>'+
                                        '</div>'+
                                    '</div>';

        jQuery(document).on('click', '.sm_date_range_container', function() {
            inline_edit_dlg('This feature is available only in Pro version','Warning',250,50);
        })
    }

    var sm_top_bar = "<div id='sm_top_bar' style='font-weight:400 !important;'>"+
                        "<div id='sm_top_bar_left'>"+
                            "<label id=sm_dashboard_select_lbl style='float:left'> <select id='sm_dashboard_select' style='height:23px!important;'> </select> </label>"+
                            "<div id='sm_advanced_search_content' style='float:left; width:50%; margin-top:0.2em; margin-right:1em;'>"+
                            "<div style='width: 100%;'> <div id='sm_advanced_search_box' style='float:left;width:75%' > <div id='sm_advanced_search_box_0' style='width:100%;margin-left:0.8em;margin-bottom:0.5em;'> </div>"+
                            "<input type='text' id='sm_advanced_search_box_value_0' name='sm_advanced_search_box_value_0' hidden> </div>"+ 
                            "<input type='text' id='sm_advanced_search_query' hidden>"+
                            "<div id='sm_advanced_search_or' style='float: left;margin-top: 0.15em;margin-left: 1em;opacity: 0.75;cursor: pointer;color: #3892D3;' class='dashicons dashicons-plus' title='Add Another Condition'> </div>"+
                            "<div style='float: left;margin-left: 2em;cursor: pointer;line-height:0em;'><button id='sm_advanced_search_submit' style='height:2em;border: 1px solid #3892D3;background-color: white;border-radius: 3px;cursor: pointer;line-height: 17px;'><span class='dashicons dashicons-search' style='color:#3892D3;font-size: 18px;margin-left: -5px;'></span> Search </button> </div>"+
                            "</div> </div>"+
                            sm_beta_smart_date_filter+
                        "</div>"+
                        "<div id='sm_top_bar_right'>"+
                            "<span id='add_sm_editor_grid' title='Add Row' class='dashicons dashicons-plus' style='margin-top: 3px;margin-right: 2px;font-size: 2em;'></span>"+
                            "<span id='save_sm_editor_grid' title='Save' class='ui-icon' style='margin-top:8px;padding:0px !important;'></span>"+
                            "<span id='del_sm_editor_grid' title='Delete Selected Row' class='dashicons dashicons-trash sm_error_icon' style='font-size:2em;'></span>"+
                            "<span class='ui-separator sm_top_bar_right_separator' style='width=4px;padding:0px;margin-top:3px;margin-left:0px;'></span>"+
                            "<div class='sm_beta_dropdown' style='float:left;cursor:pointer;padding:0;padding-top:1px;'> <span class='dashicons dashicons-admin-page sm_beta_dup_btn' title='Duplicate'></span><div class='sm_beta_dropdown_content'><a id='sm_beta_dup_selected' href='#'>Selected Records</a><a id='sm_beta_dup_entire_store' href='#'>Entire Store</a></div></div>"+
                            "<span id='batch_update_sm_editor_grid' class='dashicons dashicons-images-alt2' style='cursor:pointer;padding-top:4px;' title='Batch Update'></span>"+
                            "<span id='export_csv_sm_editor_grid' class='dashicons dashicons-download' style='cursor:pointer;padding-top:4px;' title='Export CSV'></span>"+
                            "<span id='print_invoice_sm_editor_grid' class='ui-icon' style='margin-top:5px; display: none;' title='Print Invoice'></span>"+
                            "<span class='ui-separator sm_top_bar_right_separator' style='width=4px;padding:0px;margin-top:4px;margin-right:1px;'></span>"+
                            "<span id='refresh_sm_editor_grid' title='Refresh' class='dashicons dashicons-update' style='font-size: 2em;margin-right: 1px;'></span>"+
                            "<span id='show_hide_cols_sm_editor_grid' title='Show / Hide Columns' class='dashicons dashicons-admin-generic' style='font-size:1.8em;padding-top:3px;'></span>"+
                        "</div>"+
                    "</div>";

    jQuery(".ui-jqgrid-titlebar").append(sm_top_bar);
    jQuery('#sm_dashboard_select').append(sm.dashboard_select_options);

    jQuery('#sm_dashboard_select').width(jQuery('#sm_dashboard_select').width()+16); //Code for dynamically increasing the width of the select-box

    col_model_search = Object.keys(col_model).map(function(k) { if(col_model[k].hasOwnProperty('searchable') && col_model[k]['searchable'] == 1 ) { 

        if(col_model[k].type == 'datetime') {
            col_model[k].type = 'date';
        }
        
        return col_model[k]; 

    } });

    col_model_search = col_model_search.filter(function( element ) {
       return element !== undefined;
    });

    var visualsearch_params = {},
        search_count = 1;

    var visualsearch_params  = {
                                el      : jQuery("#sm_advanced_search_box_0"),
                                placeholder: "Enter your search conditions here!",
                                strict: false,
                                search: function(json){
                                    sm.search_query[0] = json;
                                    jQuery("#sm_advanced_search_box_value_0").val(json);
                                },
                                parameters: col_model_search
                            };

    if( sm.search_query[0] != '' && typeof(sm.search_query[0]) != 'undefined'  ) {
        visualsearch_params.defaultquery = JSON.parse(sm.search_query[0]);
        jQuery("#sm_advanced_search_box_value_0").val(sm.search_query[0]);
    }                            

    window.visualSearch = new VisualSearch(visualsearch_params);

    if( SM_BETA_PRO == 1 ) { //handling multiple search conditions for pro
        if( sm.search_query[0] != '' && typeof(sm.search_query[0]) != 'undefined' && sm.search_query.length > 1 ) { //for search

            for(var i=0; i<sm.search_query.length-1; i++) {
                sm.search_count = i;
                if ( typeof smAddAdvancedSearchCondition !== "undefined" && typeof smAddAdvancedSearchCondition === "function" ) {
                    smAddAdvancedSearchCondition();
                }
            }    
        }    
    }
    

    

    // Code for handling all the click events

    // Code for handling the delete row functionality
    jQuery(document).on('click','#del_sm_editor_grid',function(){

        // "Delete" button is clicked
        // var rowId = grid.jqGrid('getGridParam', 'selrow');
        var row_ids = grid.jqGrid('getGridParam', 'selarrrow');

        if( typeof row_ids == "undefined" || row_ids.length == 0) {
            inline_edit_dlg('Please, select row','Warning',150,50);
            return;
        }

        var gID = grid[0].id,
            IDs = {
                    themodal:gID+'_inlinemod',
                    modalhead:gID+'_inlinehd',
                    modalcontent:gID+'_inlinecnt',
                    scrollelm:gID+'_inlineTbl'
                },
            msg_text = ( row_ids.length > 1 ) ? 'records' : 'record';
            dlg_content = '<div style="font-size:1.3em;text-align:center;"> <p>Are you sure you want to delete the selected '+msg_text+'?</p> '+
                        '<div><button class="sm_beta_delete_confirm_button fm-button ui-state-default ui-corner-all" value="yes">Yes</button> <button class="sm_beta_delete_confirm_button fm-button ui-state-default ui-corner-all" value="no">No</button></div></div>';
        inline_edit_dlg(dlg_content,'Confirm Delete Records',400,125);

        jQuery(document).on('click','#'+gID+'_inlinecnt .sm_beta_delete_confirm_button', function() {

            var row_ids = grid.jqGrid('getGridParam', 'selarrrow');
            var selected_rows = Array();

            var id_key = ( sm.dashboard_key == 'user' ) ? 'users_id' : 'posts_id';

            if( typeof row_ids != 'undefined' ) {
                selected_rows = JSON.parse(JSON.stringify(row_ids));
            }
            row_ids = new Array();

            for( var i in selected_rows ) {
                rowData = grid.getRowData(selected_rows[i]);
                if( rowData.hasOwnProperty(id_key) ) {
                    row_ids[i] = rowData[id_key];
                }
            }

            jQuery.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:true, onClose: null});
            if( jQuery(this).val() == 'yes' && row_ids.length > 0 ) {
                jQuery.ajax({
                        type : 'POST',
                        url : sm_ajax_url,
                        dataType:"text",
                        async: false,
                        data: {
                                    cmd: 'delete',
                                    active_module: sm.dashboard_key,
                                    security: sm.sm_nonce,
                                    ids: JSON.stringify(row_ids)
                        },
                        success: function(response) { 
                            if ( response != 0 ) {
                                inline_edit_dlg(response,'Success',150,50);    
                                jQuery('#sm_editor_grid').trigger( 'reloadGrid' );
                            }
                        }
                });
            }
        });
    });

    // Code for handling the add row functionality
    jQuery("#add_sm_editor_grid").click(function(){
        var add_row_data = {},
        length = jQuery( "tr[id^='jqg_sm_add_row_']" ).length;

          jQuery("#sm_editor_grid").jqGrid('addRowData','jqg_sm_add_row_'+length ,add_row_data,'first');
            
          // Code for aligning the checkbox
          var chkbox = jQuery("#jqg_sm_add_row_"+length).find('[aria-describedby="sm_editor_grid_cb"]').html();

          var updated_html = '<div class="tree-wrap tree-wrap-ltr" style="width:18px;"></div>'+
                                '<span class="cell-wrapperleaf">'+chkbox+'</span>';


          jQuery("#jqg_sm_add_row_"+length).find('[aria-describedby="sm_editor_grid_cb"]').html(updated_html);
          
          // Code for udpating the post type
          jQuery("#jqg_sm_add_row_"+length).find('[aria-describedby="sm_editor_grid_posts_post_type"]').html(sm.dashboard_key);
          jQuery("#jqg_sm_add_row_"+length).find('[aria-describedby="sm_editor_grid_posts_post_type"]').addClass('sm-jqgrid-dirty-cell').addClass('dirty-cell');

          jQuery(document).trigger("sm_add_row",['jqg_sm_add_row_'+length]);

          jQuery(this).attr("disabled",false);
    });

    // Code for handling the save row functionality
    jQuery("#save_sm_editor_grid").click(function(){
        jQuery("#sm_editor_grid").jqGrid("saveCell",lastrow,lastcell);

        var edited_ids = jQuery('.edited').toArray(),
            rowdata = {},
            edited_item_ids = [],
            children = '';

        for (var edited_id in edited_ids) {

            id = edited_ids[edited_id].id;
            children = jQuery('#'+id).children(".sm-jqgrid-dirty-cell");

            //Code to get the edited item ids
            jQuery(children).each(function(index, item){
                item_id = jQuery(item).attr('aria-describedby');
                edited_field_nm = item_id.substr(15);
                if ( edited_item_ids.indexOf(edited_field_nm) == '-1' ) {
                    edited_item_ids.push(edited_field_nm); //strlen() for 'sm_editor_grid' is 15    
                }
                
            });
        }

        //Code for making the final edited data array
        for (var edited_id in edited_ids) {

            var formatted_row_data = {};

            id = edited_ids[edited_id].id;
            edited_rowData = jQuery('#sm_editor_grid').jqGrid('getRowData', id);

            var id_key = ( sm.dashboard_key == 'user' ) ? 'users_id' : 'posts_id';

            for (var row_data_key in edited_rowData) {

                if ( row_data_key == id_key ) {
                    id = edited_rowData[row_data_key];
                }

                if ( edited_item_ids.indexOf(row_data_key) == '-1')
                    continue;

                key = sm_column_names_src[row_data_key];
                formatted_row_data [key] = edited_rowData[row_data_key];
            }

            rowdata[id] = formatted_row_data;
        }

        //Ajax request to save the edited data
        jQuery.ajax({
                type : 'POST',
                url : sm_ajax_url,
                dataType:"text",
                async: false,
                data: {
                            cmd: 'inline_update',
                            active_module: sm.dashboard_key,
                            edited_data: JSON.stringify(rowdata),
                            security: sm.sm_nonce,
                            table_model: JSON.stringify(sm_store_table_model)
                },
                success: function(response) {
                    inline_edit_dlg(response,'Success',150,50);
                    jQuery('#sm_editor_grid').trigger( 'reloadGrid' );
                    jQuery('#save_sm_editor_grid').addClass('ui-state-disabled');
                }
            });
    });

    // Code for handling the refresh grid functionality
    jQuery("#refresh_sm_editor_grid").click(function(){
        jQuery('#sm_editor_grid').trigger( 'reloadGrid' );
    });

    // Code for handling the show/hide columns functionality
    jQuery("#show_hide_cols_sm_editor_grid").click(function(){

        setTimeout(function() {
            jQuery("div.ui-widget-overlay.ui-front").hide();
        },10);
        
        jQuery('#sm_editor_grid').jqGrid('columnChooser', {
                                                        modal: true,
                                                        done : function (perm) {
                                                            if (perm) {
                                                                sm.state_apply = true;
                                                                jQuery("#sm_editor_grid").jqGrid("remapColumns", perm, true);
                                                                sm_beta_state_update();
                                                                
                                                                setTimeout(function() {
                                                                    jQuery("#sm_editor_grid").jqGrid("setGridWidth", grid_width);
                                                                    jQuery("#sm_editor_grid").clearGridData().trigger("reloadGrid");    
                                                                },100);
                                                            }
                                                        }
        });
    });

    // Column Chooser CSS
    jQuery('body').live('DOMNodeInserted', '#colchooser_sm_editor_grid', function(e) {
        if ( jQuery(e.target).attr('id') == 'colchooser_sm_editor_grid' ) {
            setTimeout(function(){
                var count  = jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('.selected').find('.count').text();
                jQuery('#colchooser_sm_editor_grid').parent().find('.ui-dialog-titlebar').text('Show / Hide Columns ['+count+']');
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('.selected').find('.count').text();
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').css({"max-height":"250px","overflow-y":"scroll"});
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('.selected').css('width','50%');
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('.available').css('width','50%');
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('ul').css('width','100%');
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('input.search').attr('placeholder','Search...');
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('input.search').css({"height":"20px","opacity":"1","margin":"6px","width":"150px","font-weight":"400"});
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('li').css({"color":"#444","font-weight":"400"});
                jQuery('#colchooser_sm_editor_grid').find('.ui-multiselect').find('input.search').on('focus',function(){
                    // jQuery(this).css({"border":"1px solid #0073ea","background":"transparent","color":"#444"});
                    jQuery(this).css({"background":"transparent","color":"#444"});
                });                
            },100);
        }
    })
    
    // Code for handling the batch update & duplicate records functionality
    jQuery("#batch_update_sm_editor_grid, .sm_beta_dropdown_content a").click(function(){
        
        if( SM_BETA_PRO == 1 ) {

            var row_ids = grid.jqGrid('getGridParam', 'selarrrow'),
                btn_id = jQuery(this).attr('id');
                btn_text = jQuery(this).text(),
                addln_msg = (sm.dashboard_key != 'product') ? '<p>This will duplicate only the records in posts, postmeta and related taxonomies.</p>' : '';


            if( typeof row_ids == "undefined" || row_ids.length == 0) {
                inline_edit_dlg('Please select atleast 1 record','Warning',250,50);
            } else {
                if( typeof btn_id !== "undefined" && btn_id == 'batch_update_sm_editor_grid' ) {
                    if ( typeof createBatchUpdateDialog !== "undefined" && typeof createBatchUpdateDialog === "function" ) {
                        createBatchUpdateDialog();    
                    }
                } else {
                    if ( typeof processDuplicateRecords !== "undefined" && typeof processDuplicateRecords === "function" ) {
                        
                        var gID = grid[0].id,
                            IDs = {
                                    themodal:gID+'_inlinemod',
                                    modalhead:gID+'_inlinehd',
                                    modalcontent:gID+'_inlinecnt',
                                    scrollelm:gID+'_inlineTbl'
                                },
                            dlg_content = '<div style="font-size:1.3em;text-align:center;"> '+ addln_msg +'<p>Are you sure you want to duplicate the '+ btn_text +'?</p> '+
                                        '<div><button class="sm_beta_duplicate_confirm_button fm-button ui-state-default ui-corner-all" value="yes">Yes</button> <button class="sm_beta_duplicate_confirm_button fm-button ui-state-default ui-corner-all" value="no">No</button></div></div>';
                        inline_edit_dlg(dlg_content,'Confirm Duplicate Records',500,150);

                        jQuery(document).on('click','#'+gID+'_inlinecnt .sm_beta_duplicate_confirm_button', function() {
                            jQuery.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:true, onClose: null});
                            if( jQuery(this).val() == 'yes' ) {
                                setTimeout(function(){ processDuplicateRecords( btn_id )}, 1);
                            }
                        });
                    }
                }
            }
            
        } else {
            inline_edit_dlg('This feature is available only in Pro version','Warning',250,50);
        }

        return false;
    });

    // Code for handling the export CSV functionality
    jQuery("#export_csv_sm_editor_grid").click(function(){
        
        if( SM_BETA_PRO == 1 ) {
            if ( typeof generateCsvExport !== "undefined" && typeof generateCsvExport === "function" ) {
                generateCsvExport();    
            };
        } else {
            inline_edit_dlg('This feature is available only in Pro version','Warning',250,50);
        }

        return false;
    });

    // Code for handling the print invoice functionaliy
    jQuery("#print_invoice_sm_editor_grid").click(function(){
        
        if( SM_BETA_PRO == 1 ) {

            var row_ids = grid.jqGrid('getGridParam', 'selarrrow');

            if( typeof row_ids == "undefined" || row_ids.length == 0) {
                inline_edit_dlg('Please select atleast 1 order','Warning',250,50);
            } else {
                if ( typeof printInvoice !== "undefined" && typeof printInvoice === "function" ) {
                    printInvoice();
                };    
            }
            
        } else {
            inline_edit_dlg('This feature is available only in Pro version','Warning',250,50);
        }

        return false;
    });

    setTimeout(function(){jQuery(document).trigger("sm_jqgrid_titlebar_load")}, 1); //event for adding custom elements to jqgrid titlebar

     jQuery("#sm_editor_grid").jqGrid('navGrid','#sm_pagging_bar',{
                          edit:false,
                          add:false,
                          search:false,
                          addParams: {
                            position: "last",
                          },
                          del:true,
                          refresh:true});

    jQuery("#sm_dashboard_select").click(function(){
        sm.current_selected_dashboard = jQuery("#sm_dashboard_select option:selected").val();
    });

    jQuery("#sm_dashboard_select").on('change',function(){
        

        var sm_dashboard_valid = 0,
            sm_selected_dashboard_key = jQuery(this).val(),
            sm_selected_dashboard_title = jQuery( "#sm_dashboard_select option:selected" ).text();

        if( SM_BETA_PRO == 0 ) {
            sm_dashboard_valid = 0;
            if( sm_lite_dashboards.indexOf(sm_selected_dashboard_key) >= 0 ) {
                sm_dashboard_valid = 1;    
            }
        } else {
            sm_dashboard_valid = 1;
        }

        if( sm_dashboard_valid == 1 ) {

            sm.state_apply = true;
            sm_refresh_dashboard_states(); //function to save the state
            
            sm.dashboard_key = sm_selected_dashboard_key;
            sm.dashboard_display_title = sm_selected_dashboard_title;
            sm.dashboard_model = '';
            sm.search_query = [];
            sm.current_selected_dashboard = sm_selected_dashboard_key;

            jQuery('#sm_editor_grid').trigger( 'sm_dashboard_change' );

            load_dashboard ();
            jQuery('#sm_editor_grid').trigger( 'reloadGrid' );    
        } else {
            jQuery("#sm_dashboard_select").val(sm.current_selected_dashboard);
            inline_edit_dlg( 'For managing '+ sm_selected_dashboard_title +', '+ sm_success_msg + ' <a href="https://www.storeapps.org/product/smart-manager" target="_storeapps">Pro</a>', 'Note', 250,50 );
        }
        
    });

    jQuery(document).on('sm_jqgrid_titlebar_load', function(){

        if( typeof sm.dashboard_key == 'undefined' ) {
            sm.dashboard_key = jQuery( "#sm_dashboard_select" ).val();    
        }

        if ( sm.dashboard_key == 'shop_order' ) {
            jQuery('#print_invoice_sm_editor_grid').show();
        } else {
            jQuery('#print_invoice_sm_editor_grid').hide();
        }
    });

    jQuery('#save_sm_editor_grid,#batch_update_sm_editor_grid, .sm_beta_dropdown, #print_invoice_sm_editor_grid').addClass('ui-state-disabled');

    jQuery(document).off('hover').on('hover','.sm_beta_dropdown', function(){

        if( jQuery(this).hasClass('ui-state-disabled') ) {
            if( jQuery(this).find('.sm_beta_dropdown_content').is(":visible") ) {
                jQuery(this).find('.sm_beta_dropdown_content').hide();
            }
        }else {
            if( jQuery(this).find('.sm_beta_dropdown_content').is(":visible") ) {
                jQuery(this).find('.sm_beta_dropdown_content').hide();
            } else {
                jQuery(this).find('.sm_beta_dropdown_content').show();
            }
        }
    });

    if( SM_BETA_PRO == 0 ) {
        jQuery('#export_csv_sm_editor_grid, #print_invoice_sm_editor_grid').addClass('ui-state-disabled');
    }

    jQuery('#add_sm_editor_grid div, #save_sm_editor_grid div, #batch_sm_editor_grid div').css('padding-right','5px');

    // jQuery('#gbox_sm_editor_grid').css({border:'1px solid #3892D3'}); // for main grid

    //Code for handling the cell edit view part
    jQuery(document).on('focus','td[role="gridcell"]', function(){
        var parent = jQuery(this).parent(),
            parent_id = parent[0].id,
            attr_val = jQuery(this).attr('aria-describedby'),
            cell_nm_const = 'sm_editor_grid_';
            cell_nm = attr_val.substr(cell_nm_const.length,attr_val.length);
            grid_cell = jQuery("#"+parent_id+" td[aria-describedby='"+attr_val+"']"),
            input_el = grid_cell[0].children[0],
            input_el_id = grid_cell[0].children[0].id,
            columns = sm.dashboard_model[sm.dashboard_key].columns,
            field_datetime = false;

        for (var i in columns) {
            if (columns[i].hasOwnProperty('name') === false) continue;
            if (columns[i].name == cell_nm) {
                if (columns[i].hasOwnProperty('type') !== false && columns[i].type == 'datetime') {
                    field_datetime = true;
                }
            }
        }

        if ( attr_val != 'sm_editor_grid_cb' && field_datetime !== true ) {
            jQuery(document).on('focusout','#'+input_el_id, function(){
                var grid_cell = jQuery(this).parent();
                jQuery(this).hide();
                jQuery(this).parent().attr('tabindex','-1');
                jQuery(this).parent().removeClass('edit-cell ui-state-highlight');
                jQuery(this).parent().html(grid_cell[0].children[0]).append(jQuery(this).val());
            });
        }

        if (input_el.style.display == 'none') { 
            
            jQuery(this).attr('tabindex','0');
            jQuery(this).addClass('edit-cell ui-state-highlight');

            if ( field_datetime === true ) {
                jQuery(this).children().each(function() {
                    jQuery(this).show();
                });
            } else {
                jQuery(this).html(input_el);
                jQuery('#'+input_el_id).show().focus();
            }
        }
    });

    jQuery("#sm_advanced_search_or").on('click', function () {

        if( SM_BETA_PRO == 1 ) {
            jQuery("#sm_advanced_search_or").removeAttr('disabled');
            if ( typeof smAddAdvancedSearchCondition !== "undefined" && typeof smAddAdvancedSearchCondition === "function" ) {
                smAddAdvancedSearchCondition();    
            }
            
        } else {
            jQuery("#sm_advanced_search_or").attr('disabled','disabled');
            inline_edit_dlg('This feature is available only in Pro version','Warning',250,50);
        }
    });

    //request for handling advanced search
    jQuery('#sm_advanced_search_submit').on('click',function(){ //listen for submit event

        jQuery('input[id^="sm_advanced_search_box_"]').each(function() {

            var val = jQuery(this).val();

            if( val.length == 0 ) {
                var id = jQuery(this).attr('id'),
                    index = id.lastIndexOf("_"),
                    key = id.substr(index+1);    

                delete(sm.search_query[key]);
            }
            
        });

        load_dashboard();
        jQuery('#sm_editor_grid').trigger( 'reloadGrid' );
        
    });

    setTimeout(function(){jQuery(document).trigger("sm_load_dashboard_complete")}, 1); //event for adding custom code on load dashboard

}

//function to refresh the dashboard states whenever needed
var sm_refresh_dashboard_states = function() {

    var new_col_model = jQuery("#sm_editor_grid").jqGrid("getGridParam", "colModel");
    var updated_col_model = new Array();

    sm.column_names = new Array();
    var index = 0;

    for( var i in new_col_model ) {
        
        if( new_col_model[i].hasOwnProperty('src') ) {
            updated_col_model.push(new_col_model[i]);
        }

        var name = (new_col_model[i].hasOwnProperty('name')) ? new_col_model[i].name.trim() : ''

        if(new_col_model[i].hasOwnProperty('name_display') === false) {// added for state management
            new_col_model[i].name_display = name;
        }

        if( new_col_model[i].hasOwnProperty('src') ) {
            sm.column_names[index] = new_col_model[i].name_display; //Array for column headers START FROM HERE
            index++;
        }
    }

    sm.dashboard_model[sm.dashboard_key].columns = updated_col_model;
    sm.dashboard_states[sm.dashboard_key] = JSON.stringify(sm.dashboard_model[sm.dashboard_key]);
}

var smInitDateWithButton = function (elem) {

        jQuery(elem).datepicker({
            dateFormat: 'yy-mm-dd',
            showOn: 'button',
            changeYear: true,
            changeMonth: true,
            showWeek: true,
            showButtonPanel: true,
            onSelect: function(datetext){

            },
            onClose: function (dateText, inst) {

                var d = new Date(); // for now
                dateText=dateText+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                
                inst.input.text(dateText);
                inst.input[0].value = dateText;
                inst.input.focus();

                var grid_cell = jQuery(this).parent(),
                    id = jQuery(this).attr('id');

                jQuery(this).hide();
                jQuery(this).parent().find('button').hide();
                jQuery(this).parent().attr('tabindex','-1');
                jQuery(this).parent().removeClass('edit-cell ui-state-highlight');
                jQuery(this).parent().find('#'+id+'_span').remove();
                
                jQuery(this).parent().addClass('sm-jqgrid-dirty-cell');
                jQuery(this).parent().parent().addClass('edited'); // for adding class to the td element
                jQuery('#save_sm_editor_grid').removeClass('ui-state-disabled');

                jQuery(this).parent().append('<span id="'+id+'_span">'+jQuery(this).text()+'</span>');
                
            }
        });
        jQuery(elem).next('button.ui-datepicker-trigger').button({
            text: false,
            icons: {primary: 'ui-icon-calculator'}
        }).find('span.ui-button-text').css('padding', '0.1em');
};

//function to format the column model
var format_dashboard_column_model = function (column_model) {

    if (column_model == '') return;

    sm.column_names = new Array();

    for (i = 0; i < column_model.length; i++) {

            column_values = (typeof(column_model[i].values) != 'undefined') ? column_model[i].values : '';

            var name = (column_model[i].hasOwnProperty('name')) ? column_model[i].name.trim() : ''

            if(column_model[i].hasOwnProperty('name_display') === false) {// added for state management
                column_model[i].name_display = name;
            }

            sm.column_names[i] = column_model[i].name_display; //Array for column headers
            sm_column_names_src[column_model[i].index] = column_model[i].src;

            var batch_enabled_flag = false;

            if (column_model[i].hasOwnProperty('batch_editable')) {
                batch_enabled_flag = column_model[i].batch_editable;
            }

            if (batch_enabled_flag === true) {
                column_names_batch_update[column_model[i].src] = {name: column_model[i].name_display, type:column_model[i].type, values:column_values, src:column_model[i].index};
            }

            if ( typeof(column_model[i].allow_showhide) != 'undefined' && column_model[i].allow_showhide === false ) {
                column_model[i].hidedlg = true;
            }
            
            column_model[i].name = column_model[i].index;

             //setting the default width
            if (typeof(column_model[i].width) == 'undefined') {
                column_model[i].width = 80;
            }

            //setting the edtiting options
            if ( typeof(column_model[i].type) != 'undefined' ) {
                if (column_model[i].type == 'toggle_yesno') {
                    column_model[i].edittype = 'checkbox';
                    column_model[i].editoptions = {value:'yes:no'}; 
                } else if (column_model[i].type == 'toggle_boolean') {
                    column_model[i].edittype = 'checkbox';
                    column_model[i].editoptions = {value:'true:false'}; 
                } else if (column_model[i].type == 'toggle_numeric') {
                    column_model[i].edittype = 'checkbox';
                    column_model[i].editoptions = {value:'1:0'}; 
                } else if (column_model[i].type == 'longstring') {
                    column_model[i].editable = false;
                    // column_model[i].edittype = 'textarea';
                    // column_model[i].editoptions = {rows:"2",cols:"10"};

                    column_model[i].formatter = function(v) {
                        v = (typeof(v) != 'undefined') ? v : '';
                        return '<div id="sm_formatter" style="max-height: 20px !important; overflow:hidden;">' + v + '</div>';
                    }

                    column_model[i].unformat = function(cellvalue, options, rowObject) {
                        var edited_val = jQuery(rowObject).find('#sm_formatter').html();
                        return edited_val;
                    }

                } else if (column_model[i].type == 'datetime') {
                    // column_model[i].editoptions= { dataInit: function(el) { jQuery(el).datepicker(); } };
                    column_model[i].editoptions= { dataInit: smInitDateWithButton, size: 11};
                } else if ( column_model[i].type == 'serialized' ) {
                    column_model[i].formatter = function(v) {
                        v = (typeof(v) != 'undefined') ? v : '';
                        return '<div style="max-height: 20px">' + v + '</div>';
                    }
                    column_model[i].unformat = function(v) {
                        return v;
                    }
                } else if ( column_model[i].type == 'list' ) { 
                    
                } else if ( column_model[i].type == 'multilist' ) {
                    column_model[i].formatter = function(v) {
                        v = (typeof(v) != 'undefined') ? v : '';
                        return '<div style="max-height: 20px">' + v + '</div>';
                    }
                    column_model[i].unformat = function(v) {
                        return v;
                    }
                }
            }

            //Code for formatting the values
            var formatted_values = '';

            if (column_values && Object.keys(column_model[i].values).length > 0) {
                var values = column_model[i].values;
                for (var key in values) {
                  if (values.hasOwnProperty(key)) {
                    formatted_values += key + ":" + values[key] + ";";
                  }
                }

                formatted_values = formatted_values.substr(0,(formatted_values.length-1));

                column_model[i].edittype = 'select';
                column_model[i].editoptions = {'value':formatted_values};

                //for displaying selected text instead of values
                // column_model[i].formatter = SelectFormatter;
            }
    };
    return column_model;
}

//function to get the dashboard model for the selected dashboard
var get_dashboard_model = function () {

    sm.dashboard_model = '';

    //Ajax request to get the dashboard model
    jQuery.ajax({
            type : 'POST',
            url : sm_ajax_url,
            dataType:"json",
            async: false,
            data: {
                        cmd: 'get_dashboard_model',
                        security: sm.sm_nonce,
                        active_module: sm.dashboard_key,
                        active_module_title: sm.dashboard_display_title
                },
            success: function(response) {
                if (response != '') {
                    sm_store_table_model = response[sm.dashboard_key].tables;
                    col_model = format_dashboard_column_model(response[sm.dashboard_key].columns);
                    response[sm.dashboard_key].columns = col_model;
                }
                sm.dashboard_model = response;
            }
        });
}

var load_grid = function () {

    var params = {
                      cmd: 'get_data_model',
                      active_module: sm.dashboard_key,
                      security: sm.sm_nonce,
                      start: 0,
                      page: page,
                      limit: limit,
                      SM_IS_madx30: SM_IS_madx30,
                      sort_params: (sm.dashboard_model.hasOwnProperty(sm.dashboard_key) && sm.dashboard_model[sm.dashboard_key].hasOwnProperty('sort_params') ) ? sm.dashboard_model[sm.dashboard_key].sort_params : '',
                      table_model: (sm.dashboard_model.hasOwnProperty(sm.dashboard_key) && sm.dashboard_model[sm.dashboard_key].hasOwnProperty('tables') ) ? sm.dashboard_model[sm.dashboard_key].tables : ''
                  };

    sm.post_data_params = Object.assign(sm.post_data_params, params);

    sm.post_data_params['search_query[]'] = sm.search_query;

    var jqgrid_params = { 
                            url:sm_ajax_url,
                            // editurl:sm_ajax_url,
                            datatype: "json",
                            mtype: 'POST',

                            // ajaxGridOptions: {
                            //   type    : 'post',
                            //   async   : false,
                            postData: sm.post_data_params,
                            jsonReader: {
                                      root: "items",
                                      page: "page",
                                      start: "start",
                                      records: "total_count",
                                      total: "total_pages",
                                      repeatitems: false,
                                      // id: "5"  ,
                                      // cell: ""  ,
                                      // userdata: "userdata"
                                  },
                            // }, 
                            colNames:sm.column_names,
                            colModel: (sm.dashboard_model.hasOwnProperty(sm.dashboard_key) && sm.dashboard_model[sm.dashboard_key].hasOwnProperty('columns') ) ? sm.dashboard_model[sm.dashboard_key].columns : '',
                            rowNum:limit,
                            // rowList:[10,20,30],
                            pager: '#sm_pagging_bar', // for rendering the paging bottom bar
                            multiselect: true, // for left checkbox column and multi-selection
                            height: grid_height,
                            width: grid_width,
                            hidegrid: false, //option for removing the grid show/hide option
                            // autowidth: true,
                            // forceFit: true,
                            shrinkToFit: false, // for remap columns
                            scroll:1, // for infinite scrolling
                            viewrecords: true, // for viewing the total no. of records
                            // sortorder: "desc",
                            // sortname: 'invid',
                            // sortorder: 'desc',
                            sortable: true, // for enabling sorting of columns
                            // onselectrow: true,
                            // multiSort: true, // for multiple sorting
                            // ExpandColumn : 'post_title',
                            'cellEdit': true, // for cell editing
                            'cellsubmit' : 'clientArray',
                            onSelectCell: function (rowid, celname, value, iRow, iCol) {

                                if( SM_BETA_PRO == 0 ) {
                                    var edited_ids = new Array;

                                    jQuery('.edited').each( function() {
                                        edited_ids.push( jQuery(this).attr('id') );
                                    });

                                    if( edited_ids.length >= sm_updated_sucessfull ) {
                                        if( edited_ids.indexOf(rowid) >= 0 ) {
                                            jQuery(document).trigger("sm_on_cell_click",[rowid, celname, value, iRow, iCol]);
                                        } else {
                                            inline_edit_dlg( 'For '+ sm_updated_msg +' records '+ sm_success_msg + ' <a href="https://www.storeapps.org/product/smart-manager" target="_storeapps">Pro</a>', 'Note', 250,50 );
                                        }
                                    } else {
                                        jQuery(document).trigger("sm_on_cell_click",[rowid, celname, value, iRow, iCol]);
                                    }
                                } else {
                                    jQuery(document).trigger("sm_on_cell_click",[rowid, celname, value, iRow, iCol]);
                                }

                                
                            },
                            beforeSelectRow: function (rowid, e) {

                                if( SM_BETA_PRO == 0 ) {

                                    var edited_ids = new Array;

                                    jQuery('.edited').each( function() {
                                        edited_ids.push( jQuery(this).attr('id') );
                                    });

                                    if( edited_ids.length >= sm_updated_sucessfull ) {
                                        var grid = jQuery('#sm_editor_grid');
                                            rowids = grid.getDataIDs(),
                                            columnModels = grid.getGridParam().colModel;

                                      // check each visible row
                                      for (var i = 0; i < rowids.length; i++) {
                                        var rowid = rowids[i];
                                        var data = grid.getRowData(rowid);

                                        if( edited_ids.indexOf(rowid) == -1 ) {
                                          // check each column
                                          for (var j = 0; j < columnModels.length; j++) {
                                            var model = columnModels[j];
                                            if (model.editable) {
                                              grid.setCell(rowid, model.name, '', 'not-editable-cell', {editable: false});
                                            }
                                          }
                                        }
                                      }    
                                    }
                                }
                            },
                            beforeEditCell:function(rowid,cellname,v,iRow,iCol){
                                lastrow = iRow;
                                lastcell = iCol;
                            },
                            afterEditCell : function(rowid, cellname, value, iRow, iCol) {
                                jQuery(document).trigger("sm_after_edit_cell",[rowid, celname, value, iRow, iCol]);
                            },
                            gridComplete: function() {

                                pimpHeader(jQuery("#sm_editor_grid"));

                                //Code for changing the tree grid icons
                                jQuery('.ui-icon.ui-icon-radio-off.tree-leaf.treeclick').replaceWith('<div style="margin-left: 20px;height: 18px;width: 18px;color: #469BDD;font-size: 1em;" class="">•••</div>');

                                if ( sm.dashboard_model.hasOwnProperty(sm.dashboard_key) && sm.dashboard_model[sm.dashboard_key].hasOwnProperty('treegrid') && sm.dashboard_model[sm.dashboard_key].treegrid === true ) {
                                    jQuery('#cb_sm_editor_grid').css('margin-right','8px');
                                } else {
                                    jQuery('#cb_sm_editor_grid').css('margin-right','0px');
                                }

                                jQuery('#sm_pagging_bar').hide();
                                var records_view = jQuery('#sm_pagging_bar_right').find('.ui-paging-info').html();

                                var records_view_html = '<div id="sm_records_view" style="float:right;color:#3892D3;margin-right:1em;font-weight:bold;margin-top: 0.2em;">'+records_view+'</div>';

                                jQuery('#sm_records_view').remove(); //Code for refreshing the sm_records_view
                                // jQuery("#gbox_sm_editor_grid").after(records_view_html);
                                jQuery("#sm_top_bar_left").append(records_view_html);


                                jQuery("#gbox_sm_editor_grid").find('input[type=checkbox]').each(function() {
                                    jQuery(this).live('change',function(){

                                        if ( jQuery(this).attr('id') == 'cb_sm_editor_grid' ) {
                                            if( jQuery(this).is(':checked')) {
                                                setTimeout(function() {
                                                    jQuery('input[id^=jqg_sm_editor_grid_]').each(function() {
                                                        jQuery(this).parents('tr:last').removeClass('ui-state-highlight').addClass('selected-row').addClass('ui-state-hover').css({"color":"#444","font-weight":"400"});
                                                    });
                                                });
                                            } else {
                                                setTimeout(function() {
                                                    jQuery('input[id^=jqg_sm_editor_grid_]').each(function() {
                                                        jQuery(this).parents('tr:last').removeClass('selected-row').removeClass('ui-state-hover');
                                                    });
                                                });
                                            }
                                            
                                            return;
                                        }

                                        var colid = jQuery(this).parents('tr:last').attr('id');

                                        jQuery("#sm_editor_grid").jqGrid('setSelection', colid );

                                        if( jQuery(this).is(':checked')) {
                                           jQuery(this).prop('checked',true);
                                           setTimeout(function() {
                                                jQuery('#'+colid).removeClass('ui-state-highlight').addClass('selected-row').addClass('ui-state-hover').css({"color":"#444","font-weight":"400"}); 
                                           },10);
                                        } else {                                            
                                           jQuery(this).prop('checked',false);
                                           setTimeout(function() {
                                                jQuery('#'+colid).removeClass('selected-row').removeClass('ui-state-hover');
                                           },10);
                                        }
                                        return true;
                                    });
                                });


                                jQuery(document).trigger("sm_grid_complete");

                            },
                            // recordpos: 'left', // for position of the view records label ... left, center, right
                            // footerrow:true, // for insertng blnk row in footer
                            // toppager: true, // for having the same pager bar at top
                            // toolbar: [true,"top"],
                            // headertitles: true,
                            caption:" "
                      };

    //Code for adding tree-grid params
    if ( sm.dashboard_model.hasOwnProperty(sm.dashboard_key) && sm.dashboard_model[sm.dashboard_key].hasOwnProperty('treegrid') && sm.dashboard_model[sm.dashboard_key].treegrid === true ) {
        jqgrid_params = jQuery.extend(jqgrid_params, {
                                                    treeGrid: true,
                                                    treeGridModel: 'adjacency',
                                                    treedatatype: 'json',
                                                    ExpandColumn: 'tree_grid_col',
                                                });
    }    

    jQuery("#sm_editor_grid").jqGrid(jqgrid_params);
}

//Code for handling cell click for multiselect
jQuery(document).on('sm_on_cell_click',function(e,rowid, celname, value, iRow, iCol){
    var columns = sm.dashboard_model[sm.dashboard_key].columns,
        multiselect_edit_html = '',
        current_value = '',
        actual_value = '',
        grid_rowid = rowid;

    multiselect_chkbox_list = '';

    if (value != '') {
        current_value = value.split(', <br>');
        var rex = /(<([^>]+)>)/ig;

        for(var i in current_value) {
            current_value[i] = current_value[i].replace(rex , "");
        }
    }

    for (var i in columns) {

        if (columns[i].hasOwnProperty('name') === false) continue;

        if (columns[i].name == celname) {

            if (columns[i].hasOwnProperty('type') !== false && columns[i].type == 'longstring') {

                //Code for unformatting the 'longstring' type values
                var unformatted_val = jQuery('#'+sm_grid_nm).find('#'+rowid).find('[aria-describedby="sm_editor_grid_'+celname+'"]').find('#sm_formatter').html();

                if ( sm_last_edited_row_id != rowid || sm_last_edited_col != iCol ) {

                    // jQuery('#sm_wp_editor').html(sm_wp_editor_html);
                    // sm_qtags_btn_init = 0;
                }

                jQuery('#sm_wp_editor').find('.quicktags-toolbar').hide(); 

                if (unformatted_val != '') {
                    jQuery('#sm_wp_editor').find('.wp-editor-area').text(unformatted_val);    
                } else {
                    jQuery('#sm_wp_editor').find('.wp-editor-area').text('');
                }

                if ( jQuery('#sm_wp_editor').find('#sm_inline_wp_editor_ifr').length != 0 ) {
                    jQuery('#sm_wp_editor').find('#sm_inline_wp_editor_ifr').contents().find('body').html(unformatted_val);
                }

                var wp_editor_html = jQuery('#sm_wp_editor').html();

                // if ( sm_last_edited_row_id == '' && sm_last_edited_col == '' ) {
                // if ( !document.getElementById('inline_edit_longstring_ok') ) { //code to show the OK button
                   wp_editor_html += '<span id="edit_attributes_toolbar">'+
                                        '<button type="button" id="inline_edit_longstring_ok" class="button button-primary" style="float:right;">OK</button>'+
                                    '</span>';
                // }

                    
                inline_edit_dlg(wp_editor_html, sm.column_names[iCol-1],500,300,columns[i]);

                sm_last_edited_row_id = rowid;
                sm_last_edited_col = iCol;

                tinyMCE.init({ id : tinyMCEPreInit.mceInit[ 'sm_inline_wp_editor' ]});
                quicktags({id : 'sm_inline_wp_editor'});
                QTags._buttonsInit();
                sm_qtags_btn_init = 1;


                jQuery(document).on('click','#sm_inline_wp_editor-tmce', function() {
                    jQuery('#qt_sm_inline_wp_editor_toolbar').hide();
                    jQuery('#wp-sm_inline_wp_editor-editor-container').find('.mce-panel').show();
                    
                    setTimeout(function(){
                        jQuery('#sm_wp_editor').html(jQuery('#sm_editor_grid_inlinecnt').html());
                        jQuery('#sm_wp_editor').find('#sm_inline_wp_editor_ifr').contents().find('html').html(jQuery('#sm_editor_grid_inlinecnt').find('#sm_inline_wp_editor_ifr').contents().find('html').html());

                    }, 1000);

                });

                jQuery(document).on('click','#sm_inline_wp_editor-html', function() {
                    jQuery('#qt_sm_inline_wp_editor_toolbar').show();
                    jQuery('#wp-sm_inline_wp_editor-editor-container').find('.mce-panel').hide();
                });

                jQuery('#qt_sm_inline_wp_editor_toolbar').show();
                jQuery('#sm_inline_wp_editor-html').click();
                
                jQuery(document).on("sm_inline_edit_dlg_hide", function(e,edited_col) {
                    
                    if (edited_col.hasOwnProperty('type') !== false && edited_col.type == 'longstring')
                        return;
                    
                    jQuery('#sm_wp_editor').html( jQuery('#sm_editor_grid_inlinecnt').html() );
                    jQuery('#sm_wp_editor').find('#sm_inline_wp_editor_ifr').contents().find('head').html( jQuery('#sm_editor_grid_inlinecnt').find('#sm_inline_wp_editor_ifr').contents().find('head').html() );
                    jQuery('#sm_wp_editor').find('#sm_inline_wp_editor_ifr').contents().find('body').html( jQuery('#sm_editor_grid_inlinecnt').find('#sm_inline_wp_editor_ifr').contents().find('body').html() );
                });
                
                //Code for click event of 'ok' btn
                jQuery("#inline_edit_longstring_ok").on('click',function(){

                    var edit_val,
                        longstring_col_index = '',
                        columns = sm.dashboard_model[sm.dashboard_key].columns;

                    for (var i in columns) {
                        if (columns[i].name == celname) {
                            longstring_col_index = columns[i].index;
                        }
                    }

                    tinyMCE.triggerSave();
                    
                    var rowData = jQuery('#sm_editor_grid').jqGrid('getRowData', grid_rowid);

                    // rowData[longstring_col_index] = '<div id="sm_formatter" style="max-height: 20px"> ' + jQuery('#sm_inline_wp_editor').val() + ' </div>';
                    rowData[longstring_col_index] = jQuery('#sm_inline_wp_editor').val();

                    jQuery('#sm_editor_grid').jqGrid('smsetCell',grid_rowid, longstring_col_index, '', 'sm-jqgrid-dirty-cell', false, true, true);
                    jQuery('#sm_editor_grid').jqGrid('setRowData', grid_rowid, rowData);

                    hide_inline_dialog();

                });

                return;
            }

            if (columns[i].hasOwnProperty('type') !== false && columns[i].type == 'image') {
                var file_frame;
                                
                // If the media frame already exists, reopen it.
                if ( file_frame ) {
                  file_frame.open();
                  return;
                }
                
                // Create the media frame.
                file_frame = wp.media.frames.file_frame = wp.media({
                  title: jQuery( this ).data( 'uploader_title' ),
                  button: {
                    text: jQuery( this ).data( 'uploader_button_text' )
                  },
                  multiple: false  // Set to true to allow multiple files to be selected
                });
                
                // When an image is selected, run a callback.
                file_frame.on( 'select', function() {
                  // We set multiple to false so only get one image from the uploader
                    attachment = file_frame.state().get('selection').first().toJSON();

                    if ( 'postmeta_meta_key__thumbnail_id_meta_value__thumbnail_id' === celname ) {

                        var grid = jQuery("#sm_editor_grid");
                        var id_key = ( sm.dashboard_key == 'user' ) ? 'users_id' : 'posts_id';
                        var rowData = grid.getRowData(rowid);
                        var product_id = rowData[id_key];
                        
                        jQuery.ajax({
                            type : 'POST',
                            url : sm_ajax_url,
                            dataType:"text",
                            async: false,
                            data: {
                                cmd: 'inline_update_product_featured_image',
                                active_module: sm.dashboard_key,
                                product_id: product_id,
                                update_field: celname,
                                selected_attachment_id: attachment['id'],
                                security: sm.sm_nonce
                            },
                            success: function(response) {
                                inline_edit_dlg(response,'Success',150,50);
                                if ( 'failed' !== response ) {
                                    jQuery('#'+rowid).find('td:nth-child('+(iCol+1)+')').html('');
                                    jQuery('#'+rowid).find('td:nth-child('+(iCol+1)+')').html('<img title="Change" src="'+attachment['url']+'" width="20" height="20">');
                                }
                            }
                        });
                    }

                });
                
                file_frame.open();
            }

            if (columns[i].hasOwnProperty('type') === false || columns[i].type != 'multilist' || columns[i].hasOwnProperty('values') === false) return;

            actual_value = columns[i].values;

            var multiselect_data = [];

            for (var index in actual_value) {

                if (actual_value[index]['parent'] == "0") {

                    if (multiselect_data[index] !== undefined) {
                        if ( multiselect_data[index].hasOwnProperty('child') !== false ) {
                            multiselect_data[index].term = actual_value[index].term;    
                        }
                        
                    } else {
                        multiselect_data[index] = {'term' : actual_value[index].term};    
                    }

                    
                } else {

                    if( multiselect_data[actual_value[index]['parent']] === undefined ) {

                        //For hirecheal categories
                        for (var mindex in multiselect_data) {
                            if (multiselect_data[mindex].hasOwnProperty('child') === false) {
                                continue;
                            }

                            for (var cindex in multiselect_data[mindex].child) {

                            }

                        }

                        multiselect_data[actual_value[index]['parent']] = {};
                    }

                    if (multiselect_data[actual_value[index]['parent']].hasOwnProperty('child') === false) {
                        multiselect_data[actual_value[index]['parent']].child = {};
                    }
                    multiselect_data[actual_value[index]['parent']].term = actual_value[actual_value[index]['parent']].term;
                    multiselect_data[actual_value[index]['parent']].child[index] = actual_value[index].term;
                }

            }

            multiselect_chkbox_list += '<ul>';

            for (var index in multiselect_data) {

                var checked = '';

                if (current_value != '' && current_value.indexOf(multiselect_data[index].term) != -1) {
                    checked = 'checked';                        
                } 

                multiselect_chkbox_list += '<li> <input type="checkbox" name="chk_multiselect" value="'+ index +'" '+ checked +'>  '+ multiselect_data[index].term +'</li>';
                
                if (multiselect_data[index].hasOwnProperty('child') === false) continue;

                var child_val = multiselect_data[index].child;
                multiselect_chkbox_list += '<ul class="children">';

                for (var child_id in child_val) {

                    var child_checked = '';

                    if (current_value != '' && current_value.indexOf(child_val[child_id]) != -1) {
                        child_checked = 'checked';                        
                    } 

                    multiselect_chkbox_list += '<li> <input type="checkbox" name="chk_multiselect" value="'+ child_id +'" '+ child_checked +'>  '+ child_val[child_id] +'</li>';
                }
                multiselect_chkbox_list += '</ul>';
            }               

            multiselect_chkbox_list += '</ul>';
        }
    }

    // multiselect_chkbox_list = jQuery(document).trigger("oncell_multiselect_click",[actual_value, current_value, multiselect_chkbox_list ,dashboard_model]);
    jQuery(document).trigger("oncell_multiselect_click",[multiselect_chkbox_list]);

    multiselect_edit_html = '<div id="edit_product_attributes">'+ multiselect_chkbox_list + 
                            '<span id="edit_attributes_toolbar">'+
                            '<button type="button" id="inline_edit_multiselect_ok" class="button button-primary">OK</button>'+
                            '</span> </div>';

    //Code for creating the edit dialog for multiselect columns
    inline_edit_dlg(multiselect_edit_html, sm.column_names[iCol-1]);

    //Code for click event of 'ok' btn
    jQuery("#inline_edit_multiselect_ok").on('click',function(){

            var mutiselect_edited_text = '',
                mutiselect_col_val = '',
                mutiselect_col_index = '',
                columns = sm.dashboard_model[sm.dashboard_key].columns;

            for (var i in columns) {
                if (columns[i].name == celname) {
                    mutiselect_col_val = columns[i].values;
                    mutiselect_col_index = columns[i].index;
                }
            }

            selected_val = jQuery("input[name='chk_multiselect']:checked" ).map(function () {
                                    return jQuery(this).val();
                                }).get();

            for (var index in mutiselect_col_val) {
                if (selected_val.indexOf(index) != -1) {
                    if (mutiselect_edited_text != '') {
                        mutiselect_edited_text += ', <br>';
                    }
                    mutiselect_edited_text += mutiselect_col_val[index]['term'];
                }
            }

            var rowData = jQuery('#sm_editor_grid').jqGrid('getRowData', grid_rowid);

            rowData[mutiselect_col_index] = mutiselect_edited_text;

            jQuery('#sm_editor_grid').jqGrid('smsetCell',grid_rowid, mutiselect_col_index, '', 'sm-jqgrid-dirty-cell', false, true, true);
            jQuery('#sm_editor_grid').jqGrid('setRowData', grid_rowid, rowData);

            hide_inline_dialog();

    });


});

function pimpHeader(gridObj) {
    var cm = gridObj.jqGrid("getGridParam", "colModel");
    for (var i=1;i<cm.length;i++) {
        gridObj.jqGrid('setLabel', cm[i].name, '', 
            {'text-align': (cm[i].align || 'left')}, 
            (cm[i].titletext ? {'title': cm[i].titletext} : {}));
    }
}

//Code for adding custom functions for the jqgrid
var jqgrid_custom_func = function() {

    jQuery.jgrid.extend({
        smsetCell : function(rowid,colname,nData,cssp,attrp, forceupd,removeClass) {
            return this.each(function(){
                var jQueryt = this, pos =-1,v, title;
                if(!jQueryt.grid) {return;}
                if(isNaN(colname)) {
                    jQuery(jQueryt.p.colModel).each(function(i){
                        if (this.name === colname) {
                            pos = i;return false;
                        }
                    });
                } else {pos = parseInt(colname,10);}
                if(pos>=0) {
                    var ind = jQuery(jQueryt).jqGrid('getGridRowById', rowid); 
                    if (ind){
                        var tcell = jQuery("td:eq("+pos+")",ind);
                        if(nData !== "" || forceupd === true) {
                            v = jQueryt.formatter(rowid, nData, pos,ind,'edit');

                            title = jQueryt.p.colModel[pos].title ? {"title":jQuery.jgrid.stripHtml(v)} : {};

                            if(jQueryt.p.treeGrid && jQuery(".tree-wrap",jQuery(tcell)).length>0) {
                                jQuery("span",jQuery(tcell)).html(v).attr(title);
                            } else {
                                jQuery(tcell).html(v).attr(title);
                            }
                            if(jQueryt.p.datatype === "local") {
                                var cm = jQueryt.p.colModel[pos], index;
                                nData = cm.formatter && typeof cm.formatter === 'string' && cm.formatter === 'date' ? jQuery.unformat.date.call(jQueryt,nData,cm) : nData;
                                index = jQueryt.p._index[jQuery.jgrid.stripPref(jQueryt.p.idPrefix, rowid)];
                                if(index !== undefined) {
                                    jQueryt.p.data[index][cm.name] = nData;
                                }
                            }
                        }
                        if(typeof cssp === 'string'){
                            if (removeClass === true) {
                                jQuery(tcell).removeClass('edit-cell ui-state-highlight').addClass(cssp);
                            } else {
                                jQuery(tcell).addClass(cssp);
                            }
                            
                        } else if(cssp) {
                            jQuery(tcell).css(cssp);
                        }

                        jQuery(tcell).parent().addClass('edited'); // for adding class to the td element
                        jQuery('#save_sm_editor_grid').removeClass('ui-state-disabled');

                        if(typeof attrp === 'object') {jQuery(tcell).attr(attrp);}
                    }
                }
            });
        },

    });

    jQuery('a#sm_beta_pro_feedback').on('click', function() {
        jQuery('#sa_smart_manager_beta_post_query_table').find('#subject').val('Smart Manager Beta Feedback');
        jQuery('#sa_smart_manager_beta_post_query_table').find('input[name="include_data"]').closest('tr').hide();
        jQuery('#sa_smart_manager_beta_post_query_table').find('label[for="message"]').text('Feedback*');
    });
}

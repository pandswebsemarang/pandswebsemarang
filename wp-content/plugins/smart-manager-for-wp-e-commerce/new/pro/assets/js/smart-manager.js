
function Smart_Manager_Pro() {
    Smart_Manager.apply();
}

Smart_Manager_Pro.prototype = Object.create(Smart_Manager.prototype);
Smart_Manager_Pro.prototype.constructor = Smart_Manager_Pro;
    
Smart_Manager_Pro.prototype.getDataDefaultParams = function(params) {
    Smart_Manager.prototype.getDataDefaultParams.apply(this, [params]);

    if ( typeof window.smart_manager.date_params.date_filter_params != 'undefined' ) {
        window.smart_manager.currentGetDataParams.data['date_filter_params'] = window.smart_manager.date_params.date_filter_params;
    }
    if ( typeof window.smart_manager.date_params.date_filter_query != 'undefined' ) {
        window.smart_manager.currentGetDataParams.data['date_filter_query'] = window.smart_manager.date_params.date_filter_query;
    }
}


if(typeof window.smart_manager_pro === 'undefined'){
    window.smart_manager = new Smart_Manager_Pro();
}

jQuery(document).on('smart_manager_init','#sm_editor_grid', function() {
    window.smart_manager.date_params = {}; //params for date filter
    window.smart_manager.sm_beta_smart_date_filter = '<div class="sm_date_range_container">'+
                                                            '<div>'+
                                                                '<input placeholder="Created Start Date" class="sm_date_selector start-date" id="sm_date_selector_start_date" title="Click to edit created start date">'+
                                                            '</div>'+
                                                            '<div class="date-separator">-</div>'+
                                                            '<div>'+
                                                                '<input placeholder="Created End Date" class="sm_date_selector end-date" id="sm_date_selector_end_date" title="Click to edit created end date">'+
                                                            '</div>'+
                                                            '<div class="dropdown">'+
                                                                '<span class="dashicons dashicons-arrow-down-alt2 smart-date-icon dropdown-toggle" id="smartDatesDropdown" title="Click to select a pre-defined date range"></span>'+
                                                                '<ul class="dropdown-menu pull-right" aria-labelledby="smartDatesDropdown">'+
                                                                    '<li><a href="" data-key="today">Today</a></li>'+
                                                                    '<li><a href="" data-key="yesterday">Yesterday</a></li>'+
                                                                    '<li role="separator" class="divider"></li>'+
                                                                    '<li><a href="" data-key="this_week">This Week</a></li>'+
                                                                    '<li><a href="" data-key="last_week">Last Week</a></li>'+
                                                                    '<li><a href="" data-key="last_4_week">Last 4 Weeks</a></li>'+
                                                                    '<li role="separator" class="divider"></li>'+
                                                                    '<li><a href="" data-key="this_month">This Month</a></li>'+
                                                                    '<li><a href="" data-key="last_month"">Last Month</a></li>'+
                                                                    '<li role="separator" class="divider"></li>'+
                                                                    '<li><a href="" data-key="3_months">3 Months</a></li>'+
                                                                    '<li><a href="" data-key="6_months">6 Months</a></li>'+
                                                                    '<li role="separator" class="divider"></li>'+
                                                                    '<li><a href="" data-key="this_year">This Year</a></li>'+
                                                                    '<li><a href="" data-key="last_year">Last Year</a></li>'+
                                                                    '<li role="separator" class="divider"></li>'+
                                                                    '<li><a href="" data-key="all">All</a></li>'+
                                                                    '<li role="separator" class="divider"></li>'+
                                                                    '<li><a href="" data-key="custom">Custom</a></li>'+
                                                                '</ul>'+
                                                            '</div>'+
                                                        '</div>';
})
.on('sm_top_bar_loaded', '#sm_top_bar', function() {

        jQuery(document).off('click', '.sm_date_range_container .smart-date-icon').on('click', '.sm_date_range_container .smart-date-icon', function() {

            if( jQuery('.sm_date_range_container .dropdown-menu').is(':visible') === false ){
                jQuery('.sm_date_range_container .dropdown-menu').show();
            } else {
                jQuery('.sm_date_range_container .dropdown-menu').hide();
            }

            // jQuery('.sm_date_range_container .dropdown-menu').toggle();
        });

        jQuery(document).off('click', ':not(.sm_date_range_container .dropdown-menu)').on('click', ':not(.sm_date_range_container .dropdown-menu)', function( e ){
            if ( jQuery(e.target).hasClass('smart-date-icon') === false && jQuery('.sm_date_range_container .dropdown-menu').is(':visible') === true ) {
                jQuery('.sm_date_range_container .dropdown-menu').hide();
            }
        });

        jQuery(document).off('click', '.sm_date_range_container .dropdown-menu li a').on('click', '.sm_date_range_container .dropdown-menu li a', function(e) {
            e.preventDefault();

            jQuery('.sm_date_range_container .dropdown-menu').hide();
            window.smart_manager.proSelectDate(jQuery(this).attr('data-key'));
        });

        //Code for initializing the date picker
        jQuery('.sm_date_range_container input.sm_date_selector').Zebra_DatePicker({
                                                                                                    format: 'd M y H:i:s',
                                                                                                    // format: 'dd-mm-yy H:i:s',
                                                                                                    show_icon: false,
                                                                                                    show_select_today: false,
                                                                                                    default_position: 'below',
                                                                                                    lang_clear_date: 'Clear dates',
                                                                                                    onClear: window.smart_manager.clearDateFilter,
                                                                                                    onSelect: function(fdate, jsdate) {
                                                                                                        $(this).change();
                                                                                                        let id = jQuery(this).attr('id'),
                                                                                                            selected_date_obj = new Date(fdate),
                                                                                                            params = {'start_date_formatted':'',
                                                                                                                        'start_date_default_format':'',
                                                                                                                        'end_date_formatted':'',
                                                                                                                        'end_date_default_format':''};

                                                                                                        if( id == 'sm_date_selector_start_date' ) { //if end_date is not set

                                                                                                            params.start_date_formatted = fdate;
                                                                                                            params.start_date_default_format = jsdate;

                                                                                                            var end_date = jQuery('#sm_date_selector_end_date').val(),
                                                                                                                end_time = '';

                                                                                                            if( end_date == '' ) {
                                                                                                                end_date_obj = new Date( selected_date_obj.getFullYear(), selected_date_obj.getMonth(), ( selected_date_obj.getDate() + 29 ) );
                                                                                                                end_time =  '23:59:59';
                                                                                                            } else {
                                                                                                                end_date_obj = new Date(end_date);
                                                                                                                end_time =  window.smart_manager.strPad(end_date_obj.getHours(), 2) + ':' + window.smart_manager.strPad(end_date_obj.getMinutes(), 2) + ':' + window.smart_manager.strPad(end_date_obj.getSeconds(), 2);
                                                                                                            }
                                                                                                            var y = end_date_obj.getFullYear() + '',
                                                                                                                m = end_date_obj.getMonth(),
                                                                                                                d = window.smart_manager.strPad(end_date_obj.getDate(), 2);
                                                                                                            
                                                                                                            params.end_date_formatted = d + ' ' + window.smart_manager.month_names_short[m] + ' ' + y.substring(2) + ' ' + end_time;
                                                                                                            params.end_date_default_format = y + '-' + window.smart_manager.strPad((m+1), 2) + '-' + d + ' ' + end_time;

                                                                                                            if( end_date == '' ) {
                                                                                                                end_date_datepicker = jQuery('.sm_date_range_container input.end-date').data('Zebra_DatePicker');
                                                                                                                end_date_datepicker.set_date(params.end_date_formatted);
                                                                                                                end_date_datepicker.update({'current_date': new Date(params.end_date_default_format)});
                                                                                                            }
                                                                                                            

                                                                                                        } else if( id == 'sm_date_selector_end_date' ) { //if start_date is not set

                                                                                                            params.end_date_formatted = fdate;
                                                                                                            params.end_date_default_format = jsdate;

                                                                                                            var start_date = jQuery('#sm_date_selector_start_date').val(),
                                                                                                                start_time = '';

                                                                                                            if( start_date == '' ) {
                                                                                                                start_date_obj = new Date( selected_date_obj.getFullYear(), selected_date_obj.getMonth(), ( selected_date_obj.getDate() - 29 ) );
                                                                                                                start_time = '23:59:59';
                                                                                                            } else {
                                                                                                                start_date_obj = new Date(start_date);
                                                                                                                start_time = window.smart_manager.strPad(start_date_obj.getHours(), 2) + ':' + window.smart_manager.strPad(start_date_obj.getMinutes(), 2) + ':' + window.smart_manager.strPad(start_date_obj.getSeconds(), 2);
                                                                                                            }
                                                                                                            var y = start_date_obj.getFullYear() + '',
                                                                                                                m = start_date_obj.getMonth(),
                                                                                                                d = window.smart_manager.strPad(start_date_obj.getDate(), 2);

                                                                                                            params.start_date_formatted = d + ' ' + window.smart_manager.month_names_short[m] + ' ' + y.substring(2) + ' ' + start_time;
                                                                                                            params.start_date_default_format = y + '-' + window.smart_manager.strPad((m+1), 2) + '-' + d + ' ' + start_time;

                                                                                                            if( start_date == '' ) {
                                                                                                                start_date_datepicker = jQuery('.sm_date_range_container input.start-date').data('Zebra_DatePicker');
                                                                                                                start_date_datepicker.set_date(params.start_date_formatted);
                                                                                                                start_date_datepicker.update({'current_date': new Date(params.start_date_default_format)});
                                                                                                            }
                                                                                                        }

                                                                                                        window.smart_manager.sm_handle_date_filter(params);
                                                                                                    }
                                                                                                });

        if( typeof(window.smart_manager.date_params.date_filter_params) != 'undefined' ) {

            selected_dates = JSON.parse(window.smart_manager.date_params.date_filter_params);

            start_date_datepicker = jQuery('.sm_date_range_container input.start-date').data('Zebra_DatePicker');
            start_date_datepicker.set_date(selected_dates.start_date_formatted);
            start_date_datepicker.update({'current_date': new Date(selected_dates.start_date_default_format)});

            end_date_datepicker = jQuery('.sm_date_range_container input.end-date').data('Zebra_DatePicker');
            end_date_datepicker.set_date(selected_dates.end_date_formatted);
            end_date_datepicker.update({'current_date': new Date(selected_dates.end_date_default_format)});

        }

    })
.on('sm_dashboard_change', function() {

    var params = {'start_date_formatted':'',
                'start_date_default_format':'',
                'end_date_formatted':'',
                'end_date_default_format':''};

    start_date_datepicker = jQuery('.sm_date_range_container input.start-date').data('Zebra_DatePicker');
    start_date_datepicker.set_date(params.start_date_formatted);
    start_date_datepicker.update({'current_date': new Date(params.start_date_default_format)});

    end_date_datepicker = jQuery('.sm_date_range_container input.end-date').data('Zebra_DatePicker');
    end_date_datepicker.set_date(params.end_date_formatted);
    end_date_datepicker.update({'current_date': new Date(params.end_date_default_format)});

    if( window.smart_manager.date_params.hasOwnProperty('date_filter_params') ) {
        delete window.smart_manager.date_params['date_filter_params'];
    }

    if( window.smart_manager.date_params.hasOwnProperty('date_filter_query') ) {
        delete window.smart_manager.date_params['date_filter_query'];
    }

    if ( typeof (window.smart_manager.clearDateFilter) !== "undefined" && typeof (window.smart_manager.clearDateFilter) === "function" ) {
        window.smart_manager.clearDateFilter();
    }

});



//Global Varibales for Pro
jQuery(document).on('ready', function() {

    // if( typeof(sm) != 'undefined' ) {
    //     sm.batch_update_action_options_default = '';
    //     // sm.batch_update_actions = new Array();    
    // }

    // if( batch_background_process == 1 ) { //if batch process is running

    //     var msg_txt = ( background_process_name == 'Batch Update' ) ? 'updated' : 'duplicated';  


    //     if( jQuery("#wpbody .sm_beta_pro_background_update_notice").length == 0 ) {
    //         jQuery('<div id="sm_beta_pro_background_update_notice" class="notice notice-info sm_beta_pro_background_update_notice"><p><strong>Smart Manager Beta '+ background_process_name +'</strong> – Your records are being '+msg_txt+' in the background and you will be notified on your email<strong> <code>'+sm_admin_email+'</code> </strong>once the batch process is completed.</p></div>').insertBefore('#wpbody .wrap');
    //     }

    //     var params = { 'func_nm': background_process_name };
    //     background_process_hearbeat(params);
    // }
    
});

//function to clear the datepicker filter
Smart_Manager.prototype.clearDateFilter = function() {
    let startDate = jQuery('#sm_date_selector_start_date').val(),
        endDate = jQuery('#sm_date_selector_end_date').val(),
        refresh = 0;

    if( startDate != '' ) {
        let startDateDatepicker = jQuery('.sm_date_range_container input.start-date').data('Zebra_DatePicker');
        jQuery('#sm_date_selector_start_date').val('');
        refresh = 1;
    } 
    if( endDate != '' ) {
        let endDateDatepicker = jQuery('.sm_date_range_container input.end-date').data('Zebra_DatePicker');
        jQuery('#sm_date_selector_end_date').val('');
        refresh = 1;
    }

    if( typeof(window.smart_manager.currentGetDataParams.date_filter_params) != 'undefined' && typeof(window.smart_manager.currentGetDataParams.date_filter_query) != 'undefined'  ) {
        delete window.smart_manager.currentGetDataParams.date_filter_params;
        delete window.smart_manager.currentGetDataParams.date_filter_query;
    }

    if( window.smart_manager.date_params.hasOwnProperty('date_filter_params') ) {
        delete window.smart_manager.date_params['date_filter_params'];
    }

    if( window.smart_manager.date_params.hasOwnProperty('date_filter_query') ) {
        delete window.smart_manager.date_params['date_filter_query'];
    }

    if( refresh == 1 ) {
        window.smart_manager.refresh();
    }
}

//function to process the datepicker filter
Smart_Manager.prototype.sm_handle_date_filter = function(params) {

    let date_search_array = new Array(),
        dataParams = {};

    if( window.smart_manager.dashboard_key == 'user' ) {
        date_search_array = new Array({"key":"User Registered","value":params.start_date_default_format,"type":"date","operator":">=","table_name":window.smart_manager.wpDbPrefix+"users","col_name":"user_registered","date_filter":1},
                                    {"key":"User Registered","value":params.end_date_default_format,"type":"date","operator":"<=","table_name":window.smart_manager.wpDbPrefix+"users","col_name":"user_registered","date_filter":1});
    } else {
        date_search_array = new Array({"key":"Post Date","value":params.start_date_default_format,"type":"date","operator":">=","table_name":window.smart_manager.wpDbPrefix+"posts","col_name":"post_date","date_filter":1},
                                    {"key":"Post Date","value":params.end_date_default_format,"type":"date","operator":"<=","table_name":window.smart_manager.wpDbPrefix+"posts","col_name":"post_date","date_filter":1});
    }

    window.smart_manager.date_params['date_filter_params'] = JSON.stringify(params);
    window.smart_manager.date_params['date_filter_query'] = JSON.stringify(date_search_array);


    if( Object.getOwnPropertyNames(window.smart_manager.date_params).length > 0 ) {
        dataParams.data = window.smart_manager.date_params;
    }
    
    window.smart_manager.refresh(dataParams);
}

//function to append 0's to str
Smart_Manager.prototype.strPad = function(str, len) {

    str += '';
    while (str.length < len) str = '0' + str;
    return str;

},

Smart_Manager.prototype.proSelectDate = function (dateValue){
        
    if( dateValue == 'all' ) {
        if ( typeof (window.smart_manager.clearDateFilter) !== "undefined" && typeof (window.smart_manager.clearDateFilter) === "function" ) {
            window.smart_manager.clearDateFilter();
        }
        return;
    }

    let fromDate,
        toDate,
        from_time,
        to_time,
        from_date_formatted,
        from_date_default_format,
        to_date_formatted,
        to_date_default_format,
        now = new Date(),
        params = {'start_date_formatted':'',
                'start_date_default_format':'',
                'end_date_formatted':'',
                'end_date_default_format':''};

    switch (dateValue){

        case 'today':
        fromDate = now;
        toDate   = now;
        break;

        case 'yesterday':
        fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        toDate   = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        break;

        case 'this_week':
        fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() - 1));
        toDate   = now;
        break;

        case 'last_week':
        fromDate = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - (now.getDay() - 1) - 7));
        toDate   = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - (now.getDay() - 1) - 1));
        break;

        case 'last_4_week':
        fromDate = new Date( now.getFullYear(), now.getMonth(), ( now.getDate() - 29 ) ); //for exactly 30 days limit
        toDate   = now;
        break;

        case 'this_month':
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
        toDate   = now;
        break;

        case 'last_month':
        fromDate = new Date(now.getFullYear(), now.getMonth()-1, 1);
        toDate   = new Date(now.getFullYear(), now.getMonth(), 0);
        break;

        case '3_months':
        fromDate = new Date(now.getFullYear(), now.getMonth()-2, 1);
        toDate   = now;
        break;

        case '6_months':
        fromDate = new Date(now.getFullYear(), now.getMonth()-5, 1);
        toDate   = now;
        break;

        case 'this_year':
        fromDate = new Date(now.getFullYear(), 0, 1);
        toDate   = now;
        break;

        case 'last_year':
        fromDate = new Date(now.getFullYear() - 1, 0, 1);
        toDate   = new Date(now.getFullYear(), 0, 0);
        break;

        default:
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
        toDate   = now;
        break;
    }

    //Code for format
    if( typeof fromDate === 'object' && fromDate instanceof Date ) {
        var y = fromDate.getFullYear() + '',
            m = fromDate.getMonth(),
            d = window.smart_manager.strPad(fromDate.getDate(), 2);

        from_time =  '00:00:00';
        params.start_date_formatted = d + ' ' + window.smart_manager.month_names_short[m] + ' ' + y.substring(2) + ' ' + from_time;
        params.start_date_default_format = y + '-' + window.smart_manager.strPad((m+1), 2) + '-' + d + ' ' + from_time;
    }

    if( typeof toDate === 'object' && toDate instanceof Date ) {
        var y = toDate.getFullYear() + '',
            m = toDate.getMonth(),
            d = window.smart_manager.strPad(toDate.getDate(), 2);

        to_time =  '23:59:59';
        params.end_date_formatted = d + ' ' + window.smart_manager.month_names_short[m] + ' ' + y.substring(2) + ' ' + to_time;
        params.end_date_default_format = y + '-' + window.smart_manager.strPad((m+1), 2) + '-' + d + ' ' + to_time;
    }

    var start_date = jQuery('.sm_date_range_container input.start-date').data('Zebra_DatePicker'),
        end_date = jQuery('.sm_date_range_container input.end-date').data('Zebra_DatePicker');

    if( typeof(start_date) != 'undefined') {
        start_date.set_date(params.start_date_formatted);
        start_date.update({'current_date': new Date(params.start_date_default_format)});    
    }

    if( typeof(end_date) != 'undefined') {
        end_date.set_date(params.end_date_formatted);
        end_date.update({'current_date': new Date(params.end_date_default_format)});
    }

    window.smart_manager.sm_handle_date_filter( params );

};

var sm_beta_hide_dialog = function(IDs, gID) {
    jQuery.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:true, onClose: null});
    index = 0;
}

// Function to update background update progress
Smart_Manager.prototype.background_process_hearbeat = function( params ) {

    let background_process = (jQuery("#wpbody .sm_beta_pro_background_update_notice").length > 0) ? true : false; //for background process

    let ajaxParams = {};
        ajaxParams.data = {
                    cmd: 'background_updater_heartbeat',
                    active_module: window.smart_manager.dashboard_key,
                    security: window.smart_manager.sm_nonce,
                    func_nm: params.func_nm,
                    background_process: background_process,
                    pro: true,
                    SM_IS_WOO30: window.smart_manager.sm_is_woo30
                };

    window.smart_manager.send_request(ajaxParams, function(response) {

        response = JSON.parse(response);

        if( response.ack == 'Success' ) {
            //Code for updating the progressbar

            var per = parseInt(response.per);


            if( background_process === false ) {
                if( jQuery('.sm_beta_background_update_progressbar').html() == 'Initializing...' ) {
                    jQuery('.sm_beta_background_update_progressbar').html('');
                }
                jQuery('.sm_beta_background_update_progressbar').progressbar({ value: parseInt(per) }).children('.ui-progressbar-value').css({"background": "#BCBCBC", "height":"2.5em"});
                jQuery('.sm_beta_background_update_progressbar_text').html(Math.round(parseInt(per)) + '% Completed');
            }

            if( per < 100 ) {
                setTimeout(function(){
                    window.smart_manager.background_process_hearbeat(params);
                }, 1000);
            } else {

                if( jQuery('#sm_top_bar #batch_update_sm_editor_grid, #sm_top_bar .sm_beta_dropdown_content').hasClass('sm-ui-state-disabled') === false ) {
                    jQuery('#sm_top_bar #batch_update_sm_editor_grid, #sm_top_bar .sm_beta_dropdown_content').addClass('sm-ui-state-disabled');
                }
                window.smart_manager.refresh();
                window.smart_manager.hideNotification();
            }
        }
    });

    jQuery(document).off('click','.sm_beta_batch_update_background_link').on('click','.sm_beta_batch_update_background_link',function() {
        window.smart_manager.hideNotification();
        window.smart_manager.refresh();

        if( jQuery('#sm_top_bar #batch_update_sm_editor_grid, #sm_top_bar .sm_beta_dropdown_content').hasClass('sm-ui-state-disabled') === false ) {
            jQuery('#sm_top_bar #batch_update_sm_editor_grid, #sm_top_bar .sm_beta_dropdown_content').addClass('sm-ui-state-disabled');
        }

        if( jQuery("#wpbody .sm_beta_pro_background_update_notice").length == 0 ) {
            jQuery('<div id="sm_beta_pro_background_update_notice" class="notice notice-info sm_beta_pro_background_update_notice"><p><strong>Success!</strong> '+ params.title +' initiated – Your records are being updated in the background. You will be notified on your email address <strong><code>'+window.smart_manager.sm_admin_email+'</code></strong> once the process is completed.</p></div>').insertBefore('#wpbody .wrap');
            // To go to start of the SM page so users can see above notice.
            window.scrollTo(0,0);
        }
    });
}

//function to handle multiple search conditions
Smart_Manager.prototype.addAdvancedSearchCondition = function() { 

    window.smart_manager.search_count++;

    let searchBoxOldId = "sm_advanced_search_box_0",
        searchBoxOldValue = "sm_advanced_search_box_value_0",
        searchBoxNewId = "sm_advanced_search_box_" + window.smart_manager.search_count,
        SearchBoxNewValue = "sm_advanced_search_box_value_" + window.smart_manager.search_count;


    $("#sm_advanced_search_box").append(jQuery("#" + searchBoxOldId).clone().attr('id', searchBoxNewId));
    $("#sm_advanced_search_box").append(jQuery("#" + searchBoxOldValue).clone().attr({'id': SearchBoxNewValue, 'name': SearchBoxNewValue}));

    $("#" + searchBoxNewId).empty();
    $("#" + SearchBoxNewValue).val('');

    var visualsearch_params  = {
                                el      : jQuery("#"+searchBoxNewId),
                                placeholder: "Enter your search conditions here!",
                                strict: false,
                                search: function(json){
                                    window.smart_manager.advancedSearchQuery[window.smart_manager.search_count] = json;
                                    jQuery("#"+SearchBoxNewValue).val(json);
                                },
                                parameters: window.smart_manager.col_model_search
                            };

    if( window.smart_manager.advancedSearchQuery[window.smart_manager.search_count] != '' && typeof(window.smart_manager.advancedSearchQuery[window.smart_manager.search_count]) != 'undefined' ) {
        visualsearch_params.defaultquery = JSON.parse(window.smart_manager.advancedSearchQuery[window.smart_manager.search_count]);
        jQuery("#"+SearchBoxNewValue).val(window.smart_manager.advancedSearchQuery[window.smart_manager.search_count]);
    }                            

    window.visualSearch = new VisualSearch(visualsearch_params);
}



// ========================================================================
// EXPORT CSV
// ========================================================================

Smart_Manager.prototype.generateCsvExport = function() {

    let params = {
                              cmd: 'get_export_csv',
                              active_module: window.smart_manager.dashboard_key,
                              security: window.smart_manager.sm_nonce,
                              pro: true,
                              SM_IS_WOO30: window.smart_manager.sm_is_woo30,
                              sort_params: (window.smart_manager.currentDashboardModel.hasOwnProperty('sort_params') ) ? window.smart_manager.currentDashboardModel.sort_params : '',
                              table_model: (window.smart_manager.currentDashboardModel.hasOwnProperty('tables') ) ? window.smart_manager.currentDashboardModel.tables : '',
                              search_text: window.smart_manager.simpleSearchText
                          };

    params['search_query[]'] = window.smart_manager.advancedSearchQuery;



    let export_url = window.smart_manager.sm_ajax_url + '&cmd='+ params['cmd'] +'&active_module='+ params['active_module'] +'&security='+ params['security'] +'&pro='+ params['pro'] +'&SM_IS_WOO30='+ params['SM_IS_WOO30'] +'&SM_IS_WOO30='+ params['SM_IS_WOO30'] +'&sort_params='+ encodeURIComponent(JSON.stringify(params['sort_params'])) +'&table_model='+ encodeURIComponent(JSON.stringify(params['table_model'])) +'&search_query[]='+ encodeURIComponent(window.smart_manager.advancedSearchQuery)+'&search_text='+ params['search_text'];
    export_url += ( window.smart_manager.date_params.hasOwnProperty('date_filter_params') ) ? '&date_filter_params='+ window.smart_manager.date_params['date_filter_params'] : '';
    export_url += ( window.smart_manager.date_params.hasOwnProperty('date_filter_query') ) ? '&date_filter_query='+ window.smart_manager.date_params['date_filter_query'] : '';
    window.location = export_url;


}

// ========================================================================
// PRINT INVOICE
// ========================================================================

Smart_Manager.prototype.printInvoice = function() {

    if( window.smart_manager.duplicateStore === false && window.smart_manager.selectedIds.length <= 0 ) {
        return;
    }

    let params = {};
        params.data = {
                        cmd: 'get_print_invoice',
                        active_module: window.smart_manager.dashboard_key,
                        security: window.smart_manager.sm_nonce,
                        pro: true,
                        selected_ids: JSON.stringify(window.smart_manager.selectedIds),
                        sort_params: (window.smart_manager.currentDashboardModel.hasOwnProperty('sort_params') ) ? window.smart_manager.currentDashboardModel.sort_params : '',
                        table_model: (window.smart_manager.currentDashboardModel.hasOwnProperty('tables') ) ? window.smart_manager.currentDashboardModel.tables : '',
                        SM_IS_WOO30: window.smart_manager.sm_is_woo30,
                        SM_IS_WOO22: window.smart_manager.sm_id_woo22,
                        SM_IS_WOO21: window.smart_manager.sm_is_woo21,
                        search_text: window.smart_manager.simpleSearchText
                    };

    let url = window.smart_manager.sm_ajax_url + '&cmd='+ params.data['cmd'] +'&active_module='+ params.data['active_module'] +'&security='+ params.data['security'] +'&pro='+ params.data['pro'] +'&SM_IS_WOO30='+ params.data['SM_IS_WOO30'] +'&SM_IS_WOO30='+ params.data['SM_IS_WOO30'] +'&sort_params='+ encodeURIComponent(JSON.stringify(params.data['sort_params'])) +'&table_model='+ encodeURIComponent(JSON.stringify(params.data['table_model'])) +'&search_query[]='+ encodeURIComponent(window.smart_manager.advancedSearchQuery) +'&search_text='+ params.data['search_text'] + '&selected_ids=' + params.data['selected_ids'];
    params.call_url = url;
    params.data_type = 'html';

    url += ( window.smart_manager.date_params.hasOwnProperty('date_filter_params') ) ? '&date_filter_params='+ window.smart_manager.date_params['date_filter_params'] : '';
    url += ( window.smart_manager.date_params.hasOwnProperty('date_filter_query') ) ? '&date_filter_query='+ window.smart_manager.date_params['date_filter_query'] : '';

    window.smart_manager.send_request(params, function(response) {
        let win = window.open('', 'Invoice');
        win.document.write(response);
        win.document.close();
        win.print();
    });
}

// ========================================================================
// DUPLICATE RECORDS
// ========================================================================

Smart_Manager.prototype.duplicateRecords = function() {

    if( window.smart_manager.duplicateStore === false && window.smart_manager.selectedIds.length <= 0 ) {
        return;
    }

    setTimeout( function() { window.smart_manager.showProgressDialog('Duplicate Records'); } ,1);
    
    let params = {};
        params.data = {
                        cmd: 'duplicate_records',
                        active_module: window.smart_manager.dashboard_key,
                        security: window.smart_manager.sm_nonce,
                        pro: true,
                        storewide_option: ( window.smart_manager.duplicateStore === true ) ? 'entire_store' : '',
                        selected_ids: JSON.stringify(window.smart_manager.selectedIds),
                        table_model: (window.smart_manager.currentDashboardModel.hasOwnProperty('tables') ) ? window.smart_manager.currentDashboardModel.tables : '',
                        SM_IS_WOO30: window.smart_manager.sm_is_woo30,
                        SM_IS_WOO22: window.smart_manager.sm_id_woo22,
                        SM_IS_WOO21: window.smart_manager.sm_is_woo21
                    };

    window.smart_manager.send_request(params, function(response) {

    });

    setTimeout(function() {
        params = { 'func_nm' : 'duplicate_records', 'title' : 'Duplicate Records' }
        window.smart_manager.background_process_hearbeat( params );
    }, 1000);
    
};


// ========================================================================
// BATCH UPDATE
// ========================================================================


Smart_Manager.prototype.processBatchUpdate = function() {

    if( window.smart_manager.selectedIds.length <= 0 ) {
        return;
    }
    setTimeout( function() { window.smart_manager.showProgressDialog('Batch Update'); } ,1);

    //getting the batch update form data
    jQuery('#sm_inline_dialog tr[id^=batch_update_action_row_]').each(function() {

        let row_id = jQuery(this).attr('id'),
            field_nm = jQuery(this).find('#batch_update_field').val(),
            field_type = jQuery(this).find('option:selected','#batch_update_field').attr('data-type'),
            field_display_text = jQuery("option:selected","#"+row_id+" #batch_update_field").text(),
            action_display_text = jQuery("option:selected","#"+row_id+" #batch_update_action").text(),
            value_display_text = jQuery("option:selected","#"+row_id+" .batch_update_value").text(),
            action = jQuery(this).find('#batch_update_action').val(),
            value = jQuery(this).find('.batch_update_value').val(),
            table_nm = '',
            col_nm = '';
            if( typeof (field_nm) != 'undefined' ) {
                field_params = field_nm.split("/");
                if( field_params.length > 0 ) {

                    table_nm = field_params[0];

                    if( field_params.length > 2 ) {
                        field_meta = field_params[1].split("=");
                        col_nm = field_meta[1];
                    } else {
                        col_nm = field_params[1];
                    }
                }    
            }

            if( typeof (field_type) != 'undefined' && field_type == 'sm.image' ) {
                value = jQuery(this).find('.batch_update_image').attr('data-imageId');
            }

        window.smart_manager.batch_update_actions.push({'table_nm' : table_nm, 'col_nm' : col_nm, 'action' : action, 'value' : value, 'type' : field_type, 'field_display_text' : field_display_text, 'action_display_text' : action_display_text, 'value_display_text' : value_display_text });
    });

    jQuery(document).trigger("sm_batch_update_on_submit"); //trigger to make changes in batch_update_actions

    let storewide_option = jQuery('input[name=batch_update_storewide]:checked').val();

    //Ajax request to batch update the selected records
    let params = {};
        params.data = {
                        cmd: 'batch_update',
                        active_module: window.smart_manager.dashboard_key,
                        security: window.smart_manager.sm_nonce,
                        pro: true,
                        storewide_option: ( storewide_option == 'entire_store' ) ? 'entire_store' : '',
                        selected_ids: JSON.stringify(window.smart_manager.selectedIds),
                        batch_update_actions: JSON.stringify(window.smart_manager.batch_update_actions),
                        table_model: (window.smart_manager.currentDashboardModel.hasOwnProperty('tables') ) ? window.smart_manager.currentDashboardModel.tables : '',
                        SM_IS_WOO30: window.smart_manager.sm_is_woo30,
                        SM_IS_WOO22: window.smart_manager.sm_id_woo22,
                        SM_IS_WOO21: window.smart_manager.sm_is_woo21
                    };

    window.smart_manager.send_request(params, function(response) {

    });

    setTimeout(function() {
        params = { 'func_nm' : 'batch_update', 'title' : 'Batch Update' }
        window.smart_manager.background_process_hearbeat( params );    
    }, 1000);
}

Smart_Manager.prototype.resetBatchUpdate = function() {
    
}

Smart_Manager.prototype.createBatchUpdateDialog = function() {

    if( window.smart_manager.selectedIds.length <= 0 && window.smart_manager.selectAll === false ) {
        return;
    }

    let entire_store_batch_update_html = "<tr>"+
                                            ( ( window.smart_manager.selectAll === false ) ? "<td style='white-space: pre;'><input type='radio' name='batch_update_storewide' value='selected_ids' checked/>Selected Items</td>" : '' )+
                                            "<td style='white-space: pre;'><input type='radio' name='batch_update_storewide' value='entire_store' "+ (( window.smart_manager.selectAll === true ) ? 'checked' : '') +" />All Items In Store</td>"+
                                        "</tr>",
        batch_update_field_options = '',
        batch_update_action_options_string = '',
        batch_update_action_options_number = '',
        batch_update_action_options_datetime = '',
        batch_update_actions_row = '',
        batch_update_dlg_content = '',
        dlgParams = {};

        if( Object.getOwnPropertyNames(window.smart_manager.column_names_batch_update).length > 0 ) {
            for (let key in window.smart_manager.column_names_batch_update) {
                batch_update_field_options += '<option value="'+key+'" data-type="'+window.smart_manager.column_names_batch_update[key].type+'">'+ window.smart_manager.column_names_batch_update[key].name +'</option>';
            };
        }
        
        //Formating options for default actions
        window.smart_manager.batch_update_action_options_default = '<option value="" disabled selected>Select Action</option>';
        window.smart_manager.batch_update_action_options_default += '<option value="set_to">set to</option>';

        //Formating options for number actions
        batch_update_action_options_string = '<option value="" disabled selected>Select Action</option>';
        let selected = '';
        for (let key in window.smart_manager.batch_update_action_string) {
            selected = '';
            if( key == 'set_to' ) {
                selected = 'selected';
            }

            batch_update_action_options_string += '<option value="'+key+'" '+ selected +'>'+ window.smart_manager.batch_update_action_string[key] +'</option>';
        }

        //Formating options for datetime actions
        batch_update_action_options_datetime = '<option value="" disabled selected>Select Action</option>';
        for (let key in window.smart_manager.batch_update_action_datetime) {
            selected = '';
            if( key == 'set_datetime_to' ) {
                selected = 'selected';
            }
            batch_update_action_options_datetime += '<option value="'+key+'" '+selected+'>'+ window.smart_manager.batch_update_action_datetime[key] +'</option>';
        }

        //Formating options for string actions
        batch_update_action_options_number = '<option value="" disabled selected>Select Action</option>';
        for (let key in window.smart_manager.batch_update_action_number) {
            selected = '';
            if( key == 'set_to' ) {
                selected = 'selected';
            }
            batch_update_action_options_number += '<option value="'+key+'" '+selected+'>'+ window.smart_manager.batch_update_action_number[key] +'</option>';
        }


        batch_update_actions_row = "<td style='white-space: pre;'><select required id='batch_update_field' style='min-width:130px;width:auto !important;'>"+batch_update_field_options+"</select></td>"+
                                        "<td style='white-space: pre;'><select required id='batch_update_action' style='min-width:130px !important;'>"+window.smart_manager.batch_update_action_options_default+"</select></td>"+
                                        "<td id='batch_update_value_td' style='white-space: pre;'><input type='text' class='batch_update_value' placeholder='Enter a value...' class='FormElement ui-widget-content'></td>"+
                                        "<td id='batch_update_add_delete_row' style='float:right;'><div class='dashicons dashicons-plus' style='color:#0073aa;cursor:pointer;line-height:1.7em;'></div><div class='dashicons dashicons-trash' style='color:#FF5B5E;cursor:pointer;line-height:1.5em;'></div></td>";



        batch_update_dlg_content = "<div id='batchUpdateform' class='formdata' style='width: 100%; overflow: auto; position: relative; height: auto;'>"+
                                        "<table class='batch_update_table' width='100%'>"+
                                            "<tbody>"+
                                                entire_store_batch_update_html +
                                                "<tr id='batch_update_action_row_0'>"+
                                                    batch_update_actions_row+
                                                "</tr>"+
                                                "<tr>"+
                                                    "<td>&#160;</td>"+
                                                "</tr>"+
                                            "</tbody>"+
                                        "</table>"+
                                    "</div>";

        dlgParams.btnParams = {};
        dlgParams.btnParams.yesText = 'Update';
        if ( typeof (window.smart_manager.processBatchUpdate) !== "undefined" && typeof (window.smart_manager.processBatchUpdate) === "function" ) {
            dlgParams.btnParams.yesCallback = window.smart_manager.processBatchUpdate;
        }

        dlgParams.btnParams.noText = 'Reset';
        if ( typeof (window.smart_manager.resetBatchUpdate) !== "undefined" && typeof (window.smart_manager.resetBatchUpdate) === "function" ) {
            dlgParams.btnParams.noCallback = window.smart_manager.resetBatchUpdate;
        }

        dlgParams.title = 'Batch Update';
        dlgParams.content = batch_update_dlg_content;
        dlgParams.height = 250;
        dlgParams.width = 700;

        window.smart_manager.showConfirmDialog(dlgParams);

        jQuery('#batch_update_field, #batch_update_action').each(function() {
            jQuery(this).select2({ width: '15em', dropdownCssClass: 'sm_beta_batch_update_field', dropdownParent: jQuery('[aria-describedby="sm_inline_dialog"]') });
        })

        jQuery("#batch_update_action_row_0").find('#batch_update_add_delete_row .dashicons-trash').hide(); //for hiding the delete icon for the first row

        //function for handling add row in batch update dialog
        jQuery(document).off('click','#batch_update_add_delete_row .dashicons-plus').on('click','#batch_update_add_delete_row .dashicons-plus', function() {
            let count = jQuery('tr[id^=batch_update_action_row_]').length,
                current_id = 'batch_update_action_row_'+count;
            jQuery('.batch_update_table tr:last').before("<tr id="+current_id+">"+ batch_update_actions_row +"</tr>");

            jQuery("#"+current_id).find('#batch_update_field, #batch_update_action').select2({ width: '15em', dropdownCssClass: 'sm_beta_batch_update_field', dropdownParent: jQuery('[aria-describedby="sm_inline_dialog"]') });

            jQuery(this).hide();

        });

        //function for handling delete row in batch update dialog
        jQuery(document).off('click','#batch_update_add_delete_row .dashicons-trash').on('click','#batch_update_add_delete_row .dashicons-trash', function() {

            let add_row_visible = jQuery(this).closest('td').find('.dashicons-plus').is(":visible");
            jQuery(this).closest('tr').remove();

            if( add_row_visible === true ) { //condition for removing plus icon only if visible
                jQuery('tr[id^=batch_update_action_row_]:last()').find('.dashicons-plus').show();
            }

        });

        // For the time now
        Date.prototype.timeNow = function () {
             return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
        }

        jQuery(document).on('change','#batch_update_field',function(){

            let row_id = jQuery(this).closest('tr').attr('id');

            let selected_field = jQuery( "#"+row_id+" #batch_update_field option:selected" ).val(),
                type = window.smart_manager.column_names_batch_update[selected_field].type,
                col_val = window.smart_manager.column_names_batch_update[selected_field].values,
                skip_default_action = false;

            let checkedVal = '',
                uncheckedVal = '',
                checkedDisplayVal = '',
                uncheckedDisplayVal = '';

            if( type == 'checkbox' ) {
                checkedVal = window.smart_manager.column_names_batch_update[selected_field].checkedTemplate;
                uncheckedVal = window.smart_manager.column_names_batch_update[selected_field].uncheckedTemplate;
                
                checkedDisplayVal = checkedVal.substr(0,1).toUpperCase() + checkedVal.substr(1,checkedVal.length);
                uncheckedDisplayVal = checkedVal.substr(0,1).toUpperCase() + checkedVal.substr(1,checkedVal.length);
            }

            // Formating options for default actions
            window.smart_manager.batch_update_action_options_default = '<option value="" disabled selected>Select Action</option>';
            window.smart_manager.batch_update_action_options_default += '<option value="set_to">set to</option>';

            jQuery(document).trigger("sm_batch_update_field_on_change",[row_id, selected_field, type, col_val]);

            if( type == 'numeric' ) {
                jQuery("#"+row_id+" #batch_update_action").empty().append(batch_update_action_options_number);
            } else if (type == 'text' || type == 'sm.longstring') {
                jQuery("#"+row_id+" #batch_update_action").empty().append(batch_update_action_options_string);
            } else if ( type == 'sm.datetime' ) {
                jQuery("#"+row_id+" #batch_update_action").empty().append(batch_update_action_options_datetime);
            } else {
                jQuery("#"+row_id+" #batch_update_action").empty().append(window.smart_manager.batch_update_action_options_default);
                jQuery("#"+row_id+" #batch_update_action").find('[value="set_to"]').attr('selected','selected');
            }

            jQuery("#"+row_id+" .batch_update_value").val('');

            jQuery("#"+row_id+" #batch_update_value_td").empty().append('<input type="text" class="batch_update_value" placeholder="Enter a value..." class="FormElement ui-widget-content" >');

            if( skip_default_action === true ) {
                return;
            }

            if (type == 'date' || type == 'sm.datetime') {
                let placeholder = 'YYYY-MM-DD' + ((type == 'sm.datetime') ? ' HH:MM:SS' : '');
                jQuery("#"+row_id+" .batch_update_value").attr('placeholder',placeholder);

                let format = 'Y-m-d'+ ((type == 'sm.datetime') ? ' H:i:s' : '');
                jQuery("#"+row_id+" .batch_update_value").Zebra_DatePicker({ format: format,
                                                                            show_icon: false,
                                                                            show_select_today: false,
                                                                            default_position: 'below',
                                                                        });
            } else {
                 jQuery("#"+row_id+" .batch_update_value").attr('placeholder','Enter a value...');
                let datepicker = jQuery("#"+row_id+" .batch_update_value").data('Zebra_DatePicker');
            }

            if(type == 'checkbox') {
                jQuery("#"+row_id+" #batch_update_value_td").empty().append('<select class="batch_update_value" style="min-width:130px !important;">'+
                                                            '<option value="'+checkedVal+'"> '+ checkedDisplayVal +' </option>'+
                                                            '<option value="'+uncheckedVal+'"> '+ uncheckedDisplayVal +' </option>'+
                                                        '</select>')
                jQuery("#"+row_id+" #batch_update_value_td").find(".batch_update_value").select2({ width: '15em', dropdownCssClass: 'sm_beta_batch_update_field', dropdownParent: jQuery('[aria-describedby="sm_inline_dialog"]') });
            } else if (col_val != '' && type == 'dropdown') {
                
                var batch_update_value_options = '<select class="batch_update_value" style="min-width:130px !important;">',
                    value_options_empty = true;

                for (var key in col_val) {
                    if( typeof (col_val[key]) != 'object' && typeof (col_val[key]) != 'Array' ) {
                        value_options_empty = false;
                        batch_update_value_options += '<option value="'+key+'">'+ col_val[key] + '</option>';
                    }
                }

                batch_update_value_options += '</select>';

                if( value_options_empty === false ) {
                    jQuery("#"+row_id+" #batch_update_value_td").empty().append(batch_update_value_options)
                    jQuery("#"+row_id+" #batch_update_value_td").find('.batch_update_value').select2({ width: '15em', dropdownCssClass: 'sm_beta_batch_update_field', dropdownParent: jQuery('[aria-describedby="sm_inline_dialog"]') });
                }

            } else if (type == 'sm.longstring') {
                jQuery("#"+row_id+" #batch_update_value_td").empty().append('<textarea class="batch_update_value" placeholder="Enter a value..." class="FormElement ui-widget-content"> </textarea>');
            } else if (type == 'sm.image') {
                jQuery("#"+row_id+" #batch_update_value_td").empty().append('<div class="batch_update_image" style="width:15em;"><span style="color:#0073aa;cursor:pointer;font-size: 2.25em;line-height: 1;" class="dashicons dashicons-camera"></span></div>');
            } else if (type == 'numeric') {
                jQuery("#"+row_id+" #batch_update_value_td").empty().append('<input type="number" class="batch_update_value" placeholder="Enter a value..." class="FormElement ui-widget-content" />');
            }

        });

        //Handling action change event only for 'datetime' type fields
        jQuery(document).on('change','#batch_update_action',function(){

            let row_id = jQuery(this).closest('tr').attr('id');

            let selected_field = jQuery( "#"+row_id+" #batch_update_field option:selected" ).val(),
                selected_action = jQuery( "#"+row_id+" #batch_update_action option:selected" ).val(),
                type = window.smart_manager.column_names_batch_update[selected_field].type;

            if( type != 'sm.datetime' ) {
                return;
            }

            let placeholder = ( selected_action == 'set_datetime_to' ) ? 'YYYY-MM-DD HH:MM:SS' : ( ( selected_action == 'set_date_to' ) ? 'YYYY-MM-DD' : 'HH:MM:SS' );

            jQuery("#"+row_id+" .batch_update_value").attr('placeholder',placeholder);

            let format = ( selected_action == 'set_datetime_to' ) ? 'Y-m-d H:i:s' : ( ( selected_action == 'set_date_to' ) ? 'Y-m-d' : 'H:i:s' );
            jQuery("#"+row_id+" .batch_update_value").Zebra_DatePicker({ format: format,
                                                                            show_icon: false,
                                                                            show_select_today: false,
                                                                            default_position: 'below',
                                                                        });
        });

        jQuery(document).off('click', ".batch_update_image").on('click', ".batch_update_image", function(event){

            let row_id = jQuery(this).closest('tr').attr('id');

            let file_frame;
                                        
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

                jQuery('#'+row_id+' .batch_update_image').attr('data-imageId',attachment['id']);
                jQuery('#'+row_id+' .batch_update_image').html('<img style="cursor:pointer;" src="'+attachment['url']+'" width="32" height="32">');
            });
            
            file_frame.open();
        });
    };

// ========================================================================

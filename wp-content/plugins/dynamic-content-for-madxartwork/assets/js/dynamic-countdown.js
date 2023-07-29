(function ($) {
    var WidgetElements_DynamicCountdownHandler = function ($scope, $) {
        var elementSettings = get_Dyncontel_ElementSettings($scope);
        var id_scope = $scope.attr('data-id');
		var target = '.madxartwork-element-' + id_scope + ' .madxartwork-countdown-wrapper';

        if ( elementSettings.dynamic_due_date ) {
			var dynamic_due_date = elementSettings.dynamic_due_date;
            $( target ).attr( "data-date", dayjs(dynamic_due_date).unix() ); // Convert datetime to timestamp
        }
    };

    // Make sure you run this code under madxartwork..
    $(window).on('madxartwork/frontend/init', function () {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/countdown.default', WidgetElements_DynamicCountdownHandler);
    });
})(jQuery);

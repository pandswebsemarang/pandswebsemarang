window.WP_Grid_Builder && WP_Grid_Builder.on('init', function (wpgb) {

    wpgb.facets.on( 'refresh', function() {
        jQuery('.ae-post-collection').css({ 'opacity': '0.6', 'pointer-events': 'none' });

    } );
    wpgb.facets.on('loaded', function () {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/ae-post-blocks-adv.grid', PostBlocksAdvHandler);
        jQuery('.ae-post-collection').css({ 'opacity': '1', 'pointer-events': 'all' });
    });

});
const PostBlocksAdvHandler = ($scope, jQuery) => {
   
    $scope.find('.madxartwork-section').each(function(){
        madxartworkFrontend.elementsHandler.runReadyTrigger(jQuery(this));
    });

    $scope.find('.madxartwork-column').each(function(){
        madxartworkFrontend.elementsHandler.runReadyTrigger(jQuery(this));
    });
  
}

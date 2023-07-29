jQuery(document).ready(function($){

	$( '.pciwgas-cat-slider-main' ).each(function( index ) {
		
		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).closest('.pciwgas-cat-wrap').find('.pciwgas-slider-conf').attr('data-conf') );
		
		jQuery('#'+slider_id).slick({
			dots			: (slider_conf.dots) == "true" ? true : false,
			infinite		: (slider_conf.loop) == "true" ? true : false,
			arrows			: (slider_conf.arrows) == "true" ? true : false,
			speed			: parseInt(slider_conf.speed),
			autoplay		: (slider_conf.autoplay) == "true" ? true : false,
			autoplaySpeed	: parseInt(slider_conf.autoplay_interval),
			slidesToShow	: parseInt(slider_conf.slidestoshow),
			slidesToScroll	: parseInt(slider_conf.slidestoscroll),
			mobileFirst     : (Pciwgas.is_mobile == 1) ? true : false,
			rtl             : (slider_conf.rtl) == "true" ? true : false,
			responsive: [{
				breakpoint: 1023,
				settings: {
					slidesToShow: (parseInt(slider_conf.slidestoshow) > 3) ? 3 : (parseInt(slider_conf.slidestoshow)),
					slidesToScroll: 1,
				}
			},{
				breakpoint: 767,	  			
				settings: {
					slidesToShow: (parseInt(slider_conf.slidestoshow) > 2) ? 2 : (parseInt(slider_conf.slidestoshow)),
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 479,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			},
			{
				breakpoint: 319,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			}]
		});
	});	
});
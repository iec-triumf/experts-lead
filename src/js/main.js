(function($){
	$('.block-expert-full').each(function(){
		var $this = $(this);
		$('.slick', $this).on('init reinit', function(){
			$this.addClass('init');
			//$('.slick-dots button', $(this)).empty();
		}).slick({
			dots: false,
			arrows: false,
			infinite: true,
			autoplay: true,
			dots: true,
			autoplaySpeed: 6000,
			speed: 2000,
			slidesToShow: 3,
			slidesToScroll: 3,
			customPaging: function(slider, i){
				return $('<span>', {
					'role': 'button',
					'class': 'slick-dot'
				}).text(" ");
			},
			appendDots: $('.content-expert', $this),
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	});
}(jQuery));
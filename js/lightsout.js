$(window).load(function() {
	if(($('#content').height()- $(window).height()) > 100) {
	/*If the hight of the story minus the hight of the aticle is greater than 100 pixels, then implement show on scroll to bottom functionality*/
		$(window).scroll(function() {
		   if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
			   if($('#header').is(':hidden')) {
			   	$('#header').fadeIn();
			   	$('#more').fadeIn();
			   	$('#foot').fadeIn();
			   	$('#lights').text('Lights Out');
			   }
		   }
		   /*Code Via http://stackoverflow.com/questions/3898130/how-to-check-if-a-user-has-scrolled-to-the-bottom/3898152#3898152*/
		});
	}
	if(window.location.hash == "#lightsout") {
		$('#header').hide();
		$('#more').hide();
		$('#foot').hide();
		$('#lights').text('Lights On');
	}
});

function flip_switch() {
	if($('#header').is(':hidden')) {
		$('#header').fadeIn();
		$('#more').fadeIn();
		$('#foot').fadeIn();
		$('#lights').text('Lights Out');
	}else {
		$('#header').fadeOut();
		$('#more').fadeOut();
		$('#foot').fadeOut();
		$('#lights').text('Lights On');
	}
}
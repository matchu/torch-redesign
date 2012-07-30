$(document).ready(function() {
	$(window).hashchange(function(){
		hash(false);
	})
	hash(true);
});

function hash(load) {
	if(window.location.hash == "#popular") {
		list('popular',load);
	}else if (window.location.hash == "#recent") {
		list('recent',load);
	}else {
		list('recent',load);
	}
}
function list(to, load) {
	if(load) {
		if (to == "recent") {
			$('ul.recent').show();
			$('ul.popular').hide();
			$('li.popular').removeClass('selected');
			$('li.recent').addClass('selected');
		}
	}else {
		if (to == "popular") {
			$('ul.popular').fadeIn();
			$('ul.recent').fadeOut();
			$('li.recent').removeClass('selected');
			$('li.popular').addClass('selected');
		}else if (to == "recent") {
			$('ul.recent').fadeIn();
			$('ul.popular').fadeOut();
			$('li.popular').removeClass('selected');
			$('li.recent').addClass('selected');
		}
	}
}

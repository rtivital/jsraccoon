$(function() {
	var $navbar = $('.site-navbar');
	var $toggleBnt = $navbar.find('.burger-icon');
	var $burger = $toggleBnt.find('.burger');
	var $navbarToggle = $('.navbar-toggle');
	var navbarOpened = false;
	// console.log($navbarCollapse, $collapseBnt);

	$toggleBnt.on('click', function(e) {
		if (navbarOpened) {
			$navbarToggle.velocity('slideUp');
			$burger.removeClass('active');
		} else {
			$navbarToggle.velocity('slideDown');
			$burger.addClass('active');
		}
		navbarOpened = !navbarOpened;
	});
});
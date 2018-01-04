"use strict";


$('.popup').on('click',function(){
	if($('.form').css("visibility") === "visible"){
$('.form').css("visibility","hidden");
}
else $('.form').css("visibility","visible");
// alert("click");
});

$(document).on('ready', function() { 

	initParallax();
	initEvents();
	initCollapseMenu();

	initSliders();
	/* You can disable srollanimation by removing next function */
	initScrollAnimation();

	
	/* All items in row match one height */
	$(function() { $('.matchHeight').matchHeight(); });	

	/* Lightbox plugin */
	$('.swipebox').swipebox({autoplayVideos: true});

	$('#navbar').on('click', 'a', function (event) {

        event.preventDefault();
        var href = $.attr(this, 'href').split('#');

        $('html, body').animate({
            scrollTop: $( '#' + href[1] ).offset().top - 80
        }, 500);

		return false;
	});	
});

$('#submit').on('click',function(){
	alert("thank you for your response");
});

$(window).on('scroll', function (event) {

	checkNavbar();
	checkCountUp();
}).scroll();

/* Parallax fix on window resize */ 
$(window).on('resize', function(){

 	initParallax();
});


/* Collapse menu events */
function initCollapseMenu() {

	var navbar = $('#navbar'),
		navbar_toggle = $('.navbar-toggle'),
		navbar_wrapper = $("#nav-wrapper");

    navbar.on('click', 'a', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
    });

    navbar_wrapper.on('click', '.navbar-toggle', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
    });

    navbar_wrapper.on('click', '.hasSub > a', function() {

    	var el = $(this);

    	el.next().toggleClass('show');
    	el.parent().toggleClass('show');
    	return false;
    });

    var lastWidth;
    $(window).on("resize", function () {

    	var winWidth = $(window).width();

        if (winWidth > 992 && navbar_toggle.is(':hidden')) {
            navbar.addClass('collapse');
            navbar_toggle.addClass('collapsed');
        }

       	lastWidth = winWidth;
    });	
}


/* Swiper slider */
function initSliders() {

    var gallerySwiper = new Swiper('#gallery-slider', {
		direction   : 'horizontal',

        slidesPerView: 4,
        slidesPerColumn: 2,

		speed		: 1000,
		nextButton	: '.arrow-right',
		prevButton	: '.arrow-left',
	
		autoplay    : 7000,
		autoplayDisableOnInteraction	: false,
    });

	$(window).on('resize', function(){

		var ww = $(window).width()
		if (ww > 1000) { gallerySwiper.params.slidesPerView = 4; }
		if (ww > 768 && ww <= 1000) { gallerySwiper.params.slidesPerView = 3; }
		if (ww > 480 && ww <= 767) { gallerySwiper.params.slidesPerView = 2; }
		if (ww <= 479) { gallerySwiper.params.slidesPerView = 1; }

		gallerySwiper.update();
	}).resize();

}


/* All keyboard and mouse events */
function initEvents() {

	/* Scrolling to navbar from "go top" button in footer */
    $('footer').on('click', '.go-top', function() {

	    $('html, body').animate({ scrollTop: 0 }, 800);
	});
}

/* Masonry initialization */
function initParallax() {

	// Only for desktop
	if (/Mobi/.test(navigator.userAgent)) return false;

	$('.parallax').parallax("50%", 0.1);
}


/* Scroll animation used for landing page */
function initScrollAnimation() {

	window.sr = ScrollReveal();

	var scrollZoomIn = {
		duration: 400,
		scale    : 0.1,
		mobile: false,
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	};

	var scrollGalleryIn = {
		duration: 400,
		scale    : 0.1,
		mobile: false,
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	};

	var scrollTextFade = {
		duration: 2000,
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
	}

	var scrollTextFade2 = {
		duration: 400,
		opacity: 0,
		scale: 1,
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
	}


	var scrollFromLeft = {
		duration: 700,
		scale: 1,
		distance: '600px',
		origin:'left',
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
	}

	var scrollFromLeft2 = {
		duration: 500,
		scale: 1,
		easing: 'linear',
		distance: '600px',
		origin:'left',
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	}

	var scrollFromTop = {
		duration: 500,
		scale: 1,
		easing: 'linear',
		distance: '600px',
		origin:'top',
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	}

	var scrollFromRight = {
		duration: 700,
		scale: 1,
		distance: '600px',
		origin:'right',
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
	}

	var scrollSliderFull = {
		duration: 1200,
		scale : 1,
		easing   : 'ease-in-out',
		distance : '0px',
		mobile: false,			
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	}

	/* Every element initialized once */
	if ($('#slider-full').length) {

		sr.reveal('#slider-full span, #slider-full h1', scrollTextFade);
	}

	if ($('#prizes').length) {

		sr.reveal('#prizes .item-left', scrollFromLeft);
		sr.reveal('#prizes .item-center', scrollZoomIn);
		sr.reveal('#prizes .item-right', scrollFromRight);
	}
	
	if ($('#gallery').length) {

		sr.reveal('#gallery img', scrollGalleryIn, 40);
	}	

	if ($('footer').length) {

		sr.reveal('footer li, footer .date, footer .time', scrollTextFade2, 30);
	}	
}

/* Starting countUp function on landing page */
function checkCountUp() {

	var countBlock = $('#countUp');

    if (countBlock.length) {
	
	    var scrollTop = countBlock.offset().top - window.innerHeight;

	    if (!countBlock.data('counted') && $(window).scrollTop() > scrollTop) {

	    	/* Initialized once */
	    	$(countBlock).find('.numberCount').each(function(i,el) {

				var numAnim = new CountUp($(el).attr('id'), 1, $(el).html(), 0, 2.5, {separator : ''});
				numAnim.start();
	    	});

	    	countBlock.data('counted', 1);
	    }  
	}
}

/* Navbar is set darker on main page on scroll */
function checkNavbar() {

	var scroll = $(window).scrollTop(),
    	navBar = $('nav.navbar'),
	    slideDiv = $('.slider-full');

    if (scroll > 1) navBar.addClass('dark'); else navBar.removeClass('dark');
}

/* Google maps init */
function initMap() {

	var mapEl = $('#map');
	var uluru = {lat: mapEl.data('lat'), lng: mapEl.data('lng')};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 12,
	  center: uluru,
	  scrollwheel: false,
	  styles: mapStyles
	});

	var marker = new google.maps.Marker({
	  position: {lat: parseFloat(mapEl.data('lat')) - 0.025, lng: parseFloat(mapEl.data('lng')) - 0.05},
	  map: map
	});
	marker.setIcon('assets/images/map-marker.png');
 }
//  <div class="row"> 
// 				  <div class="col-md-4 item-left">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-1.png" alt="Icon" /></div> -->
// 						 <!-- <span class="num">15 </span> -->
// 						 <span class="header">
// 							 <span>Deepali Singhal </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>

// 				 <div class="col-md-4 item-center">
// 					 <div class="item">
// 						<!--  <div class="photo"><img id = "photo" src="assets/images/deepanshi.jpg"  alt="Icon" ></div>		 -->	
// 						 <!-- <span class="num">50 </span> -->
// 						 <span class="header">
// 							 <span>Deepanshi Bansal</span>
// 							<!-- for vaper winners -->
// 						 </span>
// 					 </div>
// 				 </div>

// 				 <div class="col-md-4 item-right">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-3.png" alt="Icon" /></div>					 -->
// 						 <!-- <span class="num">120 </span> -->
// 						 <span class="header">
// 							 <span>Sparsh Wadhwa </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>	

// 			 </div>

// 			  <div class="row">
// 				 <div class="col-md-4 item-left">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-1.png" alt="Icon" /></div> -->
// 						 <!-- <span class="num">15 </span> -->
// 						 <span class="header">
// 							 <span>Rajat </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>
				 
// 				 <div class="col-md-4 item-center">
// 					 <div class="item">
// 						<!--  <div class="photo"><img src="assets/images/deepanshi.jpg" width = "150px" height = "150px" alt="Icon" ></div -->		
// 						 <span class="num">50 </span>
// 						 <span class="header">
// 							 <span>Saurabh aggarwal</span>
// 							<!-- for vaper winners -->
// 						 </span>
// 					 </div>
// 				 </div>

// 				 <div class="col-md-4 item-right">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-3.png" alt="Icon" /></div>					 -->
// 						 <!-- <span class="num">120 </span> -->
// 						 <span class="header">
// 							 <span>Rishabh Singh </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>	

// 			 </div>

// 			  <div class="row">
// 				 <div class="col-md-4 item-left">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-1.png" alt="Icon" /></div> -->
// 						 <!-- <span class="num">15 </span> -->
// 						 <span class="header">
// 							 <span>Heena Garg </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>
				 
// 				 <div class="col-md-4 item-center">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/deepanshi.jpg" width = "150px" height = "150px" alt="Icon" ></div> -->			
// 						 <!-- <span class="num">50 </span> -->
// 						 <span class="header">
// 							 <span>Bhavya Rawat</span>
// 							<!-- for vaper winners -->
// 						 </span>
// 					 </div>
// 				 </div>

// 				 <div class="col-md-4 item-right">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-3.png" alt="Icon" /></div>					 -->
// 						 <!-- <span class="num">120 </span> -->
// 						 <span class="header">
// 							 <span>Vivek Aggarwal </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>	
//				 </div> 

var config = window.config = {};

var $ref = $("#ref");
//delay time configuration
config.delayTime = 50;
$(function() {
	animate({
		name: 'flipInY',
		selector: '.error-card > .error-title-block'
	});
	setTimeout(function(){
		var $el = $('.error-card > .error-container');
		animate({
			name: 'fadeInUp',
			selector: $el
		});
		$el.addClass('visible');
	}, 1000);
})
/***********************************************
*        Animation Settings
***********************************************/
function animate(options) {
	var animationName = "animated " + options.name;
	var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	$(options.selector)
	.addClass(animationName)
	.one(animationEnd,
		function(){
			$(this).removeClass(animationName);
		}
	);
}

$(function() {
  $(document).on("TemplateLoaded",function(event, arg1, arg2) {
  	var $itemActions = $(".item-actions-dropdown");
  	$(document).on('click',function(e) {
  		if (!$(e.target).closest('.item-actions-dropdown').length) {
  			$itemActions.removeClass('active');
  		}
  	});
  	$('.item-actions-toggle-btn').on('click',function(e){
  		e.preventDefault();
  		var $thisActionList = $(this).closest('.item-actions-dropdown');
  		$itemActions.not($thisActionList).removeClass('active');
  		$thisActionList.toggleClass('active');
  	});
  });
});

/***********************************************
*        NProgress Settings
***********************************************/
var npSettings = {
	easing: 'ease',
	speed: 500
}

NProgress.configure(npSettings);
$(function() {
  $(document).on("TemplateLoaded",function(event, arg1, arg2) {
    $('.nav-profile > li > a').on('click', function() {
      var $el = $(this).next();
      animate({
        name: 'flipInX',
        selector: $el
      });
    });

    $('#sidebar-menu, #customize-menu').metisMenu({
  		activeClass: 'open'
  	});
  	$('#sidebar-collapse-btn').on('click', function(event){
  		event.preventDefault();
  		$("#app").addClass("sidebar-open");
  	});

  	$("#sidebar-overlay").on('click', function() {
  		$("#app").removeClass("sidebar-open");
  	});
    $("body").addClass("loaded");
  })
});

/***********************************************
*        NProgress Settings
***********************************************/
// start load bar
NProgress.start();
// end loading bar
NProgress.done();

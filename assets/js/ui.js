/* SCRIPTS FOR PXCRAFT-UI
 * 
 * - modals setup
 * - toggles for modals
 * - toggle night-reading mode
 * - adjust font size
 * - title manipulation
 * - populate TOC with h1, h2
 * 
 * toggles & actions that go with ui.css
 * TO DO: reproduce with vanilla javascript (eliminate jQuery-dependencies)
 */

// modals setup
// turn (meta-)elements in footer into modals on page load
// only fires if javascript is available (obviously), degrades gracefully
// (disabled) unhides comments
$(document).ready(function() {
		$("#imprint").toggleClass( "is-modal");
		$("#toc").toggleClass( "is-modal");
		/* disabled until production ready */
		/* 
		$("#comments").show(); 
		$("#comments").toggleClass( "is-modal");
		*/
});

// toggle menu (on/off)
// class "is-active" styled in ui.css
$(".js-toggle-menu").mousedown(function() {
		$("#menu-container").toggleClass( "is-active");
		$("#ui-heart").toggleClass( "is-active");
		$("#ui-close-button").toggleClass( "is-active");
		$("#modal-bg").toggleClass( "is-active");
		$("#ui-metadata").toggleClass( "is-active");

		$(".is-modal").removeClass("is-active");
});
// toggle(on) modal overlay for imprint
// class "is-active" styled in ui.css
$(".js-toggle-imprint").mousedown(function() {
	
	if (!$("#menu-container").hasClass("is-active")) {
			$("#imprint").toggleClass( "is-active");
			$("#ui-heart").toggleClass( "is-active");
			$("#ui-close-button").toggleClass( "is-active");
			$("#modal-bg").toggleClass( "is-active");
			$("#ui-metadata").toggleClass( "is-active");
	}
	if ($("#menu-container").hasClass("is-active")) {
			$("#imprint").toggleClass( "is-active");
	}
});
//toggle(on) modal overlay for TOC
//class "is-active" styled in ui.css
$(".js-toggle-toc").mousedown(function() {	
	if (!$("#menu-container").hasClass("is-active")) {
			$("#toc").toggleClass( "is-active");
			$("#ui-close-button").toggleClass( "is-active");
			$("#modal-bg").toggleClass( "is-active");
			$("#ui-metadata").toggleClass( "is-active");
	}
	if ($("#menu-container").hasClass("is-active")) {
			$("#toc").toggleClass( "is-active");
	}
});
// toggle-off "is-active" classes with universal "close" button
// classes affected by "is-active" styled in ui.css
$("#ui-close-button").mousedown(function() {
		$("*").removeClass("is-active");
});
// toggle-off "is-active" classes on click outside of modal/menu
$("#modal-bg").mousedown(function() {
		 $("*").removeClass("is-active");
});
// toggle-off "is-active" classes on ESC-press
$(document).keyup(function(e){
		if(e.keyCode === 27)
				$("*").removeClass("is-active");
});

// toggle night reading mode
// class "is-night" styled in ui.css
$(".js-toggle-night").mousedown(function() {
		$("body").toggleClass( "is-night");
});

// adjust font size for document
// #fontsize-slider is part of #menu-container
// adjust slider range and values in HTML
$(function() {
		$('#fontsize-slider').on('input', function () {
				var v = $(this).val();
				$('html').css('font-size', v + '%');
		});
});

// title manipulation
// transfer document title to UI meta-data-section
$(document).ready(function() {
		var title = document.title;		
		$(".js-title").html(title);  
});
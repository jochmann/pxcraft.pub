/*
 * ========= HOMEPAGE STUFF =========
 * relevant only for pixelcraftbooks.com/index.html
 */

// jQuery-waypoints toggle of ui-heart
$('#js-ui-heart-trigger').waypoint (function(direction){
		if (direction == "down" && $("#ui-heart").is(":hidden")) {
				$("#ui-heart").show();
				$("#ui-container").show();
				$("#ui-metadata").show();
		}
}, { offset: 'bottom-in-view' });

// defer loading the hype-document until thumbnail is clicked
// saves data
function loadHype()
{
				//dynamically add a Hype File and set its attribute
				var hypeScript=document.createElement("script");
				hypeScript.src="assets/media/pxbnde.hyperesources/pxbnde_hype_generated_script.js"
				hypeScript.charset="utf-8"
				hypeScript.type="text/javascript"

				var hypeContainer = document.getElementById("pxbnde_hype_container");
				hypeContainer.appendChild(hypeScript);
				hypeContainer.style.display="block";

				var hideThumbnail = document.getElementById('thumbnail').style.display="none";
}
// defer loading the hype-document until thumbnail is clicked
// saves data
function loadHypeEn()
{
				//dynamically add a Hype File and set its attribute
				var hypeScript=document.createElement("script");
				hypeScript.src="assets/media/pxbnen.hyperesources/pxbnen_hype_generated_script.js"
				hypeScript.charset="utf-8"
				hypeScript.type="text/javascript"

				var hypeContainer = document.getElementById("pxbnen_hype_container");
				hypeContainer.appendChild(hypeScript);
				hypeContainer.style.display="block";

				var hideThumbnail = document.getElementById('thumbnail').style.display="none";
}

// scroll to CTA
$(".js-scrollto-cta").mousedown(function() {
		$('html, body').animate({
				scrollTop: $("#cta").offset().top
		}, 1000);
});


// toggle(on) modal overlay for appendix
// class "is-active" styled in ui.css
$(".js-toggle-cicero").mousedown(function() {
	$("#cicero").toggleClass( "is-active");
	$("#ui-heart").toggleClass( "is-active");
	$("#ui-close-button").toggleClass( "is-active");
	$("#modal-bg").toggleClass( "is-active");
	$("#ui-metadata").toggleClass( "is-active");
});
// toggle(on) modal overlay for appendix
// class "is-active" styled in ui.css
$(".js-toggle-jaspreet").mousedown(function() {
	$("#jaspreet").toggleClass( "is-active");
	$("#ui-heart").toggleClass( "is-active");
	$("#ui-close-button").toggleClass( "is-active");
	$("#modal-bg").toggleClass( "is-active");
	$("#ui-metadata").toggleClass( "is-active");
});

// toggle translation lorem ipsum	
$(".js-toggle-lorem").mousedown(function(){
		$(".lorem").slideToggle();
});
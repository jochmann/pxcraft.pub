// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Hype Wrapper (scope limited to "main")
// .hype-container can be styled in interface.css
$(document).ready(function(){
    var hypeContainer = $("main div[id*='hype_container']");			
    
    hypeContainer.wrap('<div class="hype-container"></div>');
    hypeContainer.css({"position":"relative" , "overflow":"hidden", "width":"100%", "height":"100%"});	
});

// iframe Wrapper
// .iframe-container can be styled in interface.css
$(document).ready(function(){
    $("iframe").each(function() {
        $(this).wrap('<div class="iframe-container"></div>');
    });
});

// Mail Encoding (spam protection)
// swaps plain text strings of the form "name [at] address.com" with "name@address.com"
// works inside of wrapper elements .email
$(document).ready(function(){
    $('.email').each(function(index) {
        var pA = $(this).text();
        var pAA = pA.replace(" [at] ", "&#64;");
        $(this).html("<a href=\"mailto:" + pAA + "\">" + pAA + "</a>");
    });
});

// iframe breaker (make the site the topmost entity)
$(document).ready(function(){
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
});

// scroll window height on click
// script can be called from within Hype-UI
(function ( $ ) {
    $.fn.scrollView = function() {
        var y = $(window).scrollTop();  
        $("html, body").animate({ scrollTop: y + $(window).height() - 90 }, 200);
        return this;
    }
}( jQuery ));

// Reading Mode Toggles
// script can be called from within Hype-UI
// is-classes style elements in interface.css
(function ( $ ) {
    $.fn.toggleNight = function() {
        if ($( "html" ).hasClass( "is-night")) {
            HYPE.documents["UI"].startTimelineNamed('show-night', HYPE.documents["UI"].kDirectionReverse);
        }
        if (!$( "html" ).hasClass( "is-night")) {
            HYPE.documents["UI"].startTimelineNamed('show-night', HYPE.documents["UI"].kDirectionForward);
        }
        
        $( "html" ).toggleClass( "is-night");
        
        return this;
    }
}( jQuery ));
(function ( $ ) {
    $.fn.toggleTextsize = function() {
        $( "main" ).toggleClass( "is-bigtext");
        return this;
    }
}( jQuery ));

// show contentinfo as a modal overlay
// script can be referenced from within Hype
// is-classes style elements in interface.css
(function ( $ ) {
    $.fn.toggleContentinfo = function() {
        // toggle close button in Hype-UI
        if (!$("[role='contentinfo']").hasClass("is-modal-active")) {
            HYPE.documents["UI"].startTimelineNamed("toggle-menubutton", HYPE.documents["UI"].kDirectionForward);
        }
        if ($("[role='contentinfo']").hasClass("is-modal-active")) {
            HYPE.documents["UI"].startTimelineNamed("toggle-menubutton", HYPE.documents["UI"].kDirectionReverse);
        }
        $("body").toggleClass("is-modal-background");
        $("[role='contentinfo']").toggleClass("is-modal-active");   
        
        // close open menu in Hype-UI
        if ($("body").hasClass("is-menu-background")) {
            HYPE.documents["UI"].startTimelineNamed("show-menu", HYPE.documents["UI"].kDirectionReverse);
        }
        // hide the Hype-UI menu extension
        if (HYPE.documents["UI"].currentTimeInTimelineNamed('show-menu-extension') > 0) {
                HYPE.documents["UI"].startTimelineNamed("show-menu-extension", HYPE.documents["UI"].kDirectionReverse);
        }
        return this;	
    }
}( jQuery ));
// close modal overlay & UI-menu when clicked outside (on header or main)
$("main, [role='banner']").mousedown(function(event){
    var $target = $(event.target);
    if (!$target.is(".js-toggle-contentinfo") && $("[role='contentinfo']").hasClass("is-modal-active")) {
        $(this).toggleContentinfo();
    }
    if ($("body").hasClass("is-menu-background")) {
        HYPE.documents["UI"].startTimelineNamed("show-menu", HYPE.documents["UI"].kDirectionReverse);
        HYPE.documents["UI"].startTimelineNamed("toggle-menubutton", HYPE.documents["UI"].kDirectionReverse);
    }
    if (HYPE.documents["UI"].currentTimeInTimelineNamed("show-purchase-options") > 0) {
        HYPE.documents["UI"].startTimelineNamed("show-purchase-options", HYPE.documents["UI"].kDirectionReverse);
    }
    if (HYPE.documents["UI"].currentTimeInTimelineNamed("heart-twirl") > 0) {
        HYPE.documents["UI"].startTimelineNamed("heart-twirl", HYPE.documents["UI"].kDirectionReverse);
    }
});

// get the translation urls
// call from within Hype-UI to create links to translations programmatically
(function ( $ ) {
    $.fn.getHreflang = function() {
        // get urls from metadata section in footer
        var en = $(".js-get-href-en").attr("href");
        var de = $(".js-get-href-de").attr("href");
        var es = $(".js-get-href-es").attr("href");
        
        $(".js-en").attr("href", en);
        $(".js-de").attr("href", de);
        $(".js-es").attr("href", es);
        return this;	
    }
}( jQuery ));

// toggle contentinfo on fallback-button in header 
// (link to imprint above the fold a legal requirement in Germany)
$(".js-toggle-contentinfo").mousedown(function() {
    $(this).toggleContentinfo();
});

// close contentinfo/menu on ESC
$(document).keyup(function(ev){
    if ((ev.keyCode == 27) && $("[role='contentinfo']").hasClass("is-modal-active")) {
        $(this).toggleContentinfo();
    }
    if ((ev.keyCode == 27) && $("body").hasClass("is-menu-background")) {
        HYPE.documents["UI"].startTimelineNamed("show-menu", HYPE.documents["UI"].kDirectionReverse);
        HYPE.documents["UI"].startTimelineNamed("toggle-menubutton", HYPE.documents["UI"].kDirectionReverse);
    }
    if (HYPE.documents["UI"].currentTimeInTimelineNamed("heart-twirl") > 0) {
        HYPE.documents["UI"].startTimelineNamed("heart-twirl", HYPE.documents["UI"].kDirectionReverse);
    }
});

// hide menu-extension with link to "imprint" when scrolling down into main
$("main").waypoint(function(direction) {
    // ensure that the animation only fires, if the menu is currently closed
    if (direction === "down" && HYPE.documents["UI"].currentTimeInTimelineNamed('show-menu-extension') > 0) {
        HYPE.documents["UI"].startTimelineNamed("show-menu-extension", HYPE.documents["UI"].kDirectionReverse);
    }
    // prevent the animation from firing when modals are active to avoid toggle button conflicts
    if (direction === "up" && !$('body').hasClass('is-modal-background')) {
        HYPE.documents["UI"].startTimelineNamed("show-menu-extension", HYPE.documents["UI"].kDirectionForward);
    }
}, { 
    offset: '60%' 
});

// scroll to CTA
$(".js-scrollto-cta").mousedown(function() {
    $('html, body').animate({
        scrollTop: $("#cta").offset().top
    }, 1000);
});

// pointer-events: none is necessary for the Hype-UI to not obstruct content underneath
// initiate pointer events script for IE 9 & 10 (before initiating fallback below)
// disabled until tested
/*
$(document).ready(function(){
  PointerEventsPolyfill.initialize({});
});
*/
// test for browser capabilities with modernizr, trigger warning if feature is missing
// add imprint-button to page header & hide menu if pointer-events are missing
$(document).ready(function(){
    if(!Modernizr.csstransforms || !Modernizr.svg || !Modernizr.rgba) { 
        $("#modernizr-warning").show();
    }
    if(!Modernizr.pointerevents) {
        $("#ui-preloader").hide();
        $("#ui_hype_container").hide();
        $(".js-fallback-pointerevents").show();
        $(".js-modernizr-warning").show();
    }
});

// initiate interactive paragraph script for inline comments
// transferred to hype, to wait for scene-load to complete
// $(document).ready(function(){
//     $('main article').paragraphLinks();
// });
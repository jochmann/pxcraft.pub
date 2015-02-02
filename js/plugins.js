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
// script can be referenced from within Hype
(function ( $ ) {
    $.fn.scrollView = function() {
        var y = $(window).scrollTop();  
        $("html, body").animate({ scrollTop: y + $(window).height() - 90 }, 600);
        return this;
    }
}( jQuery ));

// Reading Mode Toggles
// script can be referenced from within Hype
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
        $("body").toggleClass("is-modal-background");
        $("[role='contentinfo']").toggleClass("is-modal-active");
        
        // toggle close button in Hype-UI
        if ($("[role='contentinfo']").hasClass("is-modal-active")) {
            HYPE.documents["UI"].startTimelineNamed("show-contentinfo-close", HYPE.documents["UI"].kDirectionForward);
        } 
        if (!$("[role='contentinfo']").hasClass("is-modal-active")) {
            HYPE.documents["UI"].startTimelineNamed("show-contentinfo-close", HYPE.documents["UI"].kDirectionReverse);
        }
        // close open menu in Hype-UI
        if ($("body").hasClass("is-menu-background")) {
            HYPE.documents["UI"].startTimelineNamed("show-menu", HYPE.documents["UI"].kDirectionReverse);
        }
        
        return this;	
    }
}( jQuery ));
// hide modal overlay & UI-menu when clicked outside (on header or main)
$("main, [role='banner']").mousedown(function(event){
    var $target = $(event.target);
    if(!$target.is(".js-toggle-contentinfo") && $("[role='contentinfo']").hasClass("is-modal-active")) {
        $(this).toggleContentinfo();
    }
    if ($("body").hasClass("is-menu-background")) {
        HYPE.documents["UI"].startTimelineNamed("show-menu", HYPE.documents["UI"].kDirectionReverse);
    }
});
// toggle contentinfo on fallback-button in header 
// (link to imprint above the fold a legal requirement in Germany)
$(".js-toggle-contentinfo").mousedown(function() {
    $(this).toggleContentinfo();
});

// hide menu-extension with link to "imprint" when scrolling down into main
$("main").waypoint(function(direction) {
    if (direction === "down") {
        HYPE.documents["UI"].startTimelineNamed("show-menu-extension", HYPE.documents["UI"].kDirectionReverse);
    }
    if (direction === "up") {
        HYPE.documents["UI"].startTimelineNamed("show-menu-extension", HYPE.documents["UI"].kDirectionForward);
    }
}, { 
    offset: '60%' 
});

// initiate interactive paragraph script for inline comments 
$(document).ready(function(){
    $('main article').paragraphLinks();
});

// scroll to signup-form
$(".js-scrollto-support").mousedown(function() {
    $('html, body').animate({
        scrollTop: $("#support").offset().top
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
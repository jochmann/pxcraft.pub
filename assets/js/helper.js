/* HELPER.JS - OPTIONAL: GOES WITH HELPER.CSS TO ENHANCE DOCUMENTS SET WITH LAYOUT.CSS
 * 
 * (c) agnostic HTML5 design: pixelcraftbooks
 * free to use under the MIT license
 * 
 * helper.css accompanies the class-less layout.css
 * provides dynamic classes, works with helper.css
 */

// TO DO: ELIMINATE JQUERY DEPENDENCIES

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
// .hype-container can be styled in plugins.css
$(document).ready(function(){
    var hypeContainer = $("main div[id*='hype_container']");	
    
    hypeContainer.wrap('<div class="hype-container"></div>');
    hypeContainer.css({"position":"relative" , "overflow":"hidden", "width":"100%", "height":"100%"});	
});

// iframe Wrapper
// .iframe-container can be styled in helper.css
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

// test for browser capabilities with modernizr, trigger warning if feature is missing
$(document).ready(function(){
    if(!Modernizr.csstransforms || !Modernizr.svg || !Modernizr.rgba) { 
        $("#modernizr-warning").show();
    }
});


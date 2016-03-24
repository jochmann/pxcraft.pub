// STEPHANS STUFF STARTS HERE =====================================

/*
Initialise by adding listeners
*/
var init = function () {
		initCommentFunctionality();
		initTOC();

		/*
		// add listener to show modals on click
		document.querySelector('#imprintButton').addEventListener('click', function() {showModal('imprint')});
		document.querySelector('#js-toggle-toc').addEventListener('click', function() {showModal('toc')});
		// add listener to clear modals on click on #modalBg or close button
		document.querySelector('#modalBg').addEventListener('click', clearModals);
		document.querySelector('.menuDial.close').addEventListener('click', clearModals);
		// add listeners to provide ui functions
		document.querySelector('#ui #nightmode').addEventListener('click', toggleNightMode);
		document.querySelector('#ui #textmode').addEventListener('click', toggleFontSize);
		// add listeners for opening/closing menu
		document.querySelector('#menuOpen').addEventListener('change', toggleMenu);
		document.querySelector('#menuClose').addEventListener('change', toggleMenu);
		*/
		window.addEventListener('hashchange', highlightComment);
}

/*
Shows the modals by adding the "active" class
*/
var showModal = function (modal) {
	document.getElementById(modal).classList.add('is-active');
}

/*
Gets all .modal elements, removes the "active" class and closes the menu
*/
var clearModals = function ()  {
	$(".is-modal, #modal-bg, #menu-container, #ui-metadata, #ui-close-button").removeClass("is-active");
	/*var modals = document.querySelectorAll('.modal');
	//remove active classes
	for (modal = 0; modal < modals.length; ++modal) {
		modals[modal].classList.remove('active');
		}
	//close menu itself
	document.querySelector('#menuClose').click();*/
}



/*
adding button element for comments in main element
adding corresponding event logic
*/
var initCommentFunctionality = function () {
	// create comment box
	var commentBox = document.createElement("button");
	commentBox.classList.add('commentBox');
	commentBox.id = 'js-comment-box';
	//commentBox.addEventListener('click', openCommentModal);
	var commentIcon = document.createTextNode('❡');
		commentBox.appendChild(commentIcon);
		document.querySelector('main').appendChild(commentBox);

		//adding event listener on parent node for all 'commentable' elements
		document.querySelector('main').addEventListener('click',toggleCommentBox);

		//call highlighting function to mark commented paragraphs
		highlightComment();

		/*ugly but working*/
		$("#js-comment-box").mousedown(function() {
			if (!$("#menu-container").hasClass("is-active")) {
					$("#comments").toggleClass( "is-active");
					$("#ui-close-button").toggleClass( "is-active");
					$("#modal-bg").toggleClass( "is-active");
					$("#ui-metadata").toggleClass( "is-active");
			}
			if ($("#menu-container").hasClass("is-active")) {
					$("#comments").toggleClass( "is-active");
			}
		});
}


/*
Configures and shows the comment box 
*/
var toggleCommentBox = function (event)   {

	//check whether event is triggered by a <p>
	event = event || window.event;
		var source = event.target || event.srcElement;

		var commentBox = document.querySelector('#js-comment-box');

		//get path to parent node and count nth-child number of all elements
		if (source.tagName.toLowerCase() === 'p') {

			//show comment box (getting position & moving box)
	 	 	var pos = source.getBoundingClientRect();

	 	 	commentBox = commentBox.parentNode.removeChild(commentBox);
	 	 	source.appendChild(commentBox);
	 	 	commentBox.style.top = 0;
	 	 	commentBox.style.display = 'block';

	 	 	path = getAnchorFromElement(source);

	 	 	//add path to modal
	 	 	var url = '';
		//extract # and following string
		url = window.location.href.split('#')[0] + '#' + path;	                 
		document.querySelector('#permalink').innerHTML = url;
		document.querySelector('#permalink').href = url;
		document.querySelector('#comment_mail').href = encodeURI("mailto:comments@pxcraft.pub?Subject=Comment " + url + "&body=Title: Comment\n Date: "+ new Date() + "\n Author: ⬅\n Slug: " + url + "\n\n write your name (author) where indicated above, your comment below this line\n⬇⬇⬇⬇");
		document.querySelector('#comment_facebook').href = "https://www.facebook.com/sharer.php?u=" + url;
		document.querySelector('#comment_twitter').href = "http://twitter.com/home?status=I%20❤%20this—&url=" + url;
		document.querySelector('#comment_pinterest').href = "http://pinterest.com/pin/create/link/?url=" + url;
	}
		else {
	 	 	// set invisible if clicked somewhere except <p>
	 	 	if (commentBox.style.display == 'block')  {
	 	 		commentBox.style.display = 'none';
	 	 	}
		}
}

/*
Shows the comment modal
*/
var openCommentModal = function () {
	/*document.querySelector('#menuOpen').click();
	showModal('comments');*/
}

/*
Handles highlighting of commented objects
*/
var highlightComment = function () {
	var commented = getElementFromAnchor();
	if (commented != null){			
		//remove previously marked sections
		var mark = document.querySelector('.mark');
			if (mark)    {
					mark.classList.remove('mark');
					clearModals();
			}
		commented.classList.add('mark');
		commented.scrollIntoView(true);			
	}
}

/*
 * grabs anchor if present, parses string and tries to get corresponding element
 * returns element or null
 */
var getElementFromAnchor = function () {
	//extract # and following string
	var anchor = window.location.href.split('#')[1];

	//anchor is set 
	if (anchor)   {
		var css = '';
		var number = 1;
		var selector = 'main';

		//only alphanumeric and '=' and '-' allowed
		css = anchor.replace(/[^a-zA-Z0-9=-]/g, ' ');
		//get the elements
		elements = css.split('=');
		for (var i = 0; i < elements.length; ++i) {
				//split element and number
			element = elements[i].split('-');
			if (element.length == 2)	{
				selector = selector + ' ' + element[1] + ':nth-child(' + element[0]+ ')';
			}
		}

		try {
			element = document.querySelector(selector);			
		} catch (e) {
			//invalid query selector
			return null;
		}
		return element;
	}
}

/*
 * grabs element and generates a css selector to identify it starting from main
 * returns encoded css-string
 */
var getAnchorFromElement = function (source) {
	var parent = document.querySelector('main');

 	var path = '';

 	while (source != parent)   {
 		path = source.tagName + '=' + path; 
 		//count siblings
 		var index = 1;
 		while (source.previousElementSibling)   {
 			source = source.previousElementSibling;
 			index++;
 		}
 		path = index + '-' + path;
 		source = source.parentNode;
 	}
 	return path;
}
/*
Initialize TOC with Heading-Contents (generated from all <h1> and <h2>)
shortens all titles to size <= 50
*/
var initTOC = function () {
	var h = document.querySelectorAll('main h1, main h2');
	var toc = '<nav><ul>';
	prev = '';
	for (var i = 0; i < h.length; ++i) {

		//trim the string to the maximum length and adding a space
		var shortString = h[i].textContent.substr(0, 50) + " ";
		//re-trim if we are in the middle of a word
		shortString = shortString.substr(0, Math.min(shortString.length, shortString.lastIndexOf(" ")));

		path = '#' + getAnchorFromElement(h[i]);

		toc = toc + '<li class="' + h[i].tagName.toLowerCase() + '"><a href="' + path + '">'+ shortString +'</a></li>';
	}

	toc = toc + '</ul></nav>';
	document.querySelector('#toc .content').innerHTML = toc;
}

document.addEventListener('DOMContentLoaded', init);


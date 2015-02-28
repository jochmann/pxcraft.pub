/* create paragraph UI for each paragraph in "main"
 take (hidden) comments from end of document and put them to their respective p's
 needs refactoring and proper commenting
*/
(function($){
	$.fn.paragraphLinks = function(options) {

		var options = $.extend({
			selector: 'p',
			triggerText: '❡'
		}, options);

		this.children(options.selector).each(function(i) {
			var tag = this.tagName.toLowerCase();
			var e = $(this);
			e.attr('id', tag + '-' + i);
			var url = $(location).attr('href');
			var hash = tag+'-'+i;

			var trigger = $('<button/>')
				.attr('class', 'p-meta-trigger')
				.attr('href', '#'+tag+'-'+i)
				.attr('role', 'button')
				.text(options.triggerText);	
			var metaWrap = $('<aside/>')
				.attr('class', 'p-meta-container is-modal');
			var tweet = $('<a/>').attr('title', 'tweet this paragraph')
				.attr('href', 'http://twitter.com/home?status=I%20❤%20this—&url='+url+'#'+hash)
				.attr('target', '_blank')
				.attr('role', 'button')
				.text('tweet')
			var pin = $('<a/>').attr('title', 'pin this paragraph')
				.attr('href', 'http://pinterest.com/pin/create/link/?url='+url+'#'+hash)
				.attr('target', '_blank')
				.attr('role', 'button')
				.text('pin')
			var share = $('<a/>').attr('title', 'share this paragraph on facebook')
				.attr('href', 'https://www.facebook.com/sharer.php?u='+url+'#'+hash)
				.attr('target', '_blank')
				.attr('role', 'button')
				.text('share')
			var permalink = $('<span/>').attr('class', 'p-meta-permalink')
				.text(url+'#'+hash);
			var permalinkLabel = $('<label/>')
				.text('link to paragraph');
			var comments = $('<div/>').html($('.comments-list.'+hash).html())
				.attr('class', 'p-meta-commentslist');
			var commentAuthor = $('.comment-author');

				if (comments.text().length > 0) {
					trigger.attr('class', 'p-meta-trigger p-meta-trigger-active');
				};

			var mailBody = "Title: Comment \n Date: n/a \n Author: ⬅ \n Slug: "+url+" \n Paragraph: "+"#"+hash+" \n \n write your name (author) where indicated above, your comment below this line \n ⬇⬇⬇⬇";
			var mail = $('<a/>').attr('href', 'mailto:comments@pxcraft.pub?Subject=Comment%20'+url+'#'+hash+'&body='+encodeURIComponent(mailBody))
			.attr('role', 'button')
			.text('comment');

			trigger.insertAfter(e);
			$('footer').append(metaWrap);
			metaWrap.append(permalinkLabel);
			metaWrap.append(permalink);
			metaWrap.append(comments);
			metaWrap.append(share);
			metaWrap.append(tweet);
			metaWrap.append(pin);
			comments.append(mail);
			e.click(function() {
				// show trigger when click on paragraph
				if (!$('body').hasClass('is-modal-background')) {
						trigger.fadeToggle('fast');
				}			
			});
			// show paragraph-meta-information
			trigger.click(function() {
				// (alternative method to toggling classes: metaWrap.slideToggle('fast');)
				metaWrap.toggleClass('is-modal-active');
				$('body').toggleClass('is-modal-background');
				trigger.fadeToggle('fast');
				// show close-button in Hype-UI
				HYPE.documents["UI"].startTimelineNamed("toggle-menubutton", HYPE.documents["UI"].kDirectionForward);
				// hide the Hype-UI menu extension that contains a conflicting toggle button
				if (HYPE.documents["UI"].currentTimeInTimelineNamed('show-menu-extension') > 0) {
						HYPE.documents["UI"].startTimelineNamed("show-menu-extension", HYPE.documents["UI"].kDirectionReverse);
				}
				// hide heart-button in UI
				if (HYPE.documents["UI"].currentTimeInTimelineNamed("heart-twirl") == 0) {
						HYPE.documents["UI"].startTimelineNamed("heart-twirl", HYPE.documents["UI"].kDirectionForward);
				}
			});
			// close paragraph-meta-information when clicked outside of modal
			$("main, [role='banner']").click(function() {
				var $target = $(event.target);
				if (!$target.is(trigger) && $(metaWrap).hasClass('is-modal-active')) {
						metaWrap.toggleClass('is-modal-active');
						$('body').toggleClass('is-modal-background');
						HYPE.documents["UI"].startTimelineNamed("toggle-menubutton", HYPE.documents["UI"].kDirectionReverse);
				}
			});
			// close modal on click in Hype-UI close-button
			$('#ui-close-button').click(function() {
				if ($(metaWrap).hasClass('is-modal-active')) {
						metaWrap.toggleClass('is-modal-active');
						$('body').toggleClass('is-modal-background');
						HYPE.documents["UI"].startTimelineNamed("toggle-menubutton", HYPE.documents["UI"].kDirectionReverse);
				}
			});
			// close modal on ESC
			$(document).keyup(function(ev){
					if ((ev.keyCode == 27) && $(metaWrap).hasClass('is-modal-active')) {
						metaWrap.toggleClass('is-modal-active');
						$('body').toggleClass('is-modal-background');
						HYPE.documents["UI"].startTimelineNamed("toggle-menubutton", HYPE.documents["UI"].kDirectionReverse);
				}
			});

		});

		return this;
	};
	
})(jQuery);
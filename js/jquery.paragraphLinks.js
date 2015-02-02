/* create paragraph UI for each paragraph in "main"
 take (hidden) comments from end of document and put them to their respective p's
 needs updating: I want the comments to live in a modal, consistent with UI
 needs refactoring and proper commenting
*/
(function($){
	$.fn.paragraphLinks = function(options) {

		var options = $.extend({
			selector: 'p',
			triggerText: '¶'
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
				.text(options.triggerText);
			var metaWrap = $('<aside/>')
				.attr('class', 'p-meta-container');
			var tweet = $('<a/>').attr('title', 'tweet this paragraph')
				.attr('href', 'http://twitter.com/home?status=I%20❤%20this—&url='+url+'#'+hash)
				.attr('target', '_blank')
				.attr('role', 'button')
				.text('tweet')
				.css({"display": "block", "width": "auto"});
			var permalink = $('<span/>').attr('class', 'p-meta-permalink')
				.text(url+'#'+hash);
			var permalinkLabel = $('<label/>')
				.text('link to paragraph');
			var commentWrap = $('#comments')
				.css({"display": "none"});	
			var comment = $('<div/>').html($('.comments-list.'+hash).html())
				.attr('class', 'p-meta-commentslist');
			var commentAuthor = $('.comment-author');

				if (comment.text().length > 0) {
					trigger.attr('class', 'p-meta-trigger-active');
				};

			var mailBody = "Title: Comment \n Date: n/a \n Author: ⬅ \n Slug: "+url+" \n Paragraph: "+"#"+hash+" \n \n write your name (author) where indicated above, your comment below this line \n ⬇⬇⬇⬇";
			var mail = $('<a/>').attr('href', 'mailto:comments@pixelcraftbooks.com?Subject=Comment%20'+url+'#'+hash+'&body='+encodeURIComponent(mailBody))
			.attr('role', 'button')
			.text('✉ comment');

			e.append(trigger);
			e.append(metaWrap);
			metaWrap.append(permalinkLabel);
			metaWrap.append(permalink);
			metaWrap.append(comment);
			metaWrap.append(tweet);
			comment.append(mail);
			trigger.click(function() {	
				metaWrap.slideToggle('fast');
				});
		});

		return this;
	};
})(jQuery);
//element centré verticalement
//wraper : element dans lequel il est centré (pas forcément le parent)
$.fn.verticallyCentred = function (wraper) {
    $(this).css({
        "top": (($(wraper).height() - $(this).height()) / 2)+ "px"
    });
}
$.fn.vCenter = function () {
    $(this).each(function(){
        if ($(this).outerHeight(true) < $(window).height()) {
            $(this).verticallyCentred(window);
        }
    });
}
//scroll to #ID
//element is a link : we use the href to get the target
// /!\ with easing : need the easing jquery plugin
$.fn.scrollToID = function () {
    $(this).bind("click", function (event) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr("href")).position().top
        }, 800, 'easeOutQuint');
    });
}

function merge_options(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
/*
 * Contains:
 *   - scrollTo
 *   - scrollToID
 *   - onClickScrollToID
 *
 */
$.fn.scrollTo = function (options) {
	var root;
	var default_options = { position: 0, callback: null, animated: false, duration: 1500 };

	if (!options) { options = {}; }
	if (!root)    { root = $($.browser.webkit ? 'body' : 'html'); }

	options = merge_options(default_options, options);

	if (!options.animated) {
		options.duration = 10;
	}

	root.stop().animate({ scrollTop: options.position }, options.duration, 'easeInOutSine', options.callback);
}

$.fn.scrollToID = function () {
	$(this).scrollTo({ duration: 1500, animated: true, position: $($(this).attr("href")).offset().top - 35 }); // header top
}

$.fn.onClickScrollToID = function () {
	$(this).on('click', function (event) {
		event.preventDefault();
		$(this).scrollToID();
	});
}


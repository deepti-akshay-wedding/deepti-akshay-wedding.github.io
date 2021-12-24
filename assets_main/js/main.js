/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

		var $signupform = $('#signupform');
        $signupform
            .on('click', function(event) {
                var email = $("#email").val();
                var password = $("#password").val();
                var data = logIn(email, password);
                if (data != undefined) {
                    unhidePage(data);
                }
            });

})(jQuery);

function logIn(email, password) {
    console.log("logging in with " + email + "/" + password);
    var url = "https://script.google.com/macros/s/AKfycbx7irJ1exky4wJ3EDNjiygYzfOMzY4Mjg9QYwnSjsqOpsLcuu0-VA-Hodt4G7I9FvI_/exec?&email=" + email + "&password=" + password;
    var resp = $.ajax({
        async: false,
        method: "POST", 
        crossDomain: true, 
        url: url,
        dataType: "json",
        "headers": {
            "Content-Type": "text/plain",
        }
    });
    var resp_json = resp.responseJSON;
    if (resp_json.hasOwnProperty("result")) {
        console.log("email or password were incorrect");
        return undefined;
    } else if (resp_json.hasOwnProperty("location")) {
        return resp_json;
    } else {
        console.log("malformed response");
        return undefined;
    }
}

function unhidePage() {
    console.log("In unhide page")
    document.getElementById("password-form").hidden = true;
    document.getElementById("wrapper").style.display = "block";
}

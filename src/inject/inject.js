var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-2.2.1.min.js";

// Then bind the event to the callback function.
// There are several events for cross browser compatibility.
script.onreadystatechange = handler;
script.onload = handler;

// Fire the loading
head.appendChild(script);

function handler() {
	console.log('jquery added :)');


	function effect1(key, value) {
		word = $("#" + key).html()
		console.log(word);

		var comment =
			'<span class="tooltip">' +
			'💬' +
			'<span class="tooltiptext">' + '<h3>Comments: </h3>' +
			'<button class="button button--primary u-paddingLeft10 u-paddingRight10 u-height19 u-lineHeight13 u-verticalAlignMiddle u-fontSize12 u-uiTextMedium u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton u-marginLeft10 u-marginTopNegative2 u-xs-hide is-touched"><span class="button-label  button-defaultState js-buttonLabel">Not Matched</span><span class="button-label button-activeState">sorry</span></button>' +
			value +
			'</span></span>'
		$("#" + key).append(comment)
			// $("article").html(function() {
			// 	return $(this).html().replace(word, repl);
			// });
	}



	// $(".tooltip").on('click', function() {
	// 	if ($(this).children().css("visibility") !== 'hidden') {
	// 		$(this).children().css("visibility", "hidden");
	// 	} else {
	// 		$(this).children().css("visibility", "visible");
	// 	}
	// })

	// $(".tooltip").on('mouseenter', function() {
	// 	console.log("hovered");
	// 	$(this).children().css("visibility", "visible");
	//
	// }).on('mouseleave', function() {
	// 	console.log("leaved");
	// 	$(this).children().css("visibility", "visible");
	//
	// 	$(this).children().css("visibility", "hidden");
	//
	// });
	//
	// $(".tooltiptext").on('mouseenter', function() {
	// 	$(this).css("visibility", "visible");
	// }).on('mouseleave', function() {
	// 	$(this).css("visibility", "hidden")
	// });

}



chrome.extension.sendMessage({}, function(response) {

	function create_modal(comments) {
		var buttons =
			'<div class="actions"><div class="ui black deny button"> Nonrelevant </div> <div class="ui positive right labeled icon button">    Good Match      <i class="checkmark icon"></i>    </div>  </div>'

		var modal = '<div class="ui modal"> <div class="header"> Comments </div>'
		$.each(comments, function(index, value) {
			modal += (
				'<div class="image content"><p style="font-size:25px">' +
				value + '</p> </div>');
			modal += buttons;
		});
		modal += '</div>';

		return modal;
	}

	function effect1(word, comment) {
		// word = $("#" + key).html()
		var repl =
			'<span class="markup--quote markup--p-quote is-other tooltip">' + word +
			'<span class="tooltiptext">' + comment + '</span></span>'
		$("article").html(function() {
			return $(this).html().replace(word, repl);
		});
	}

	function effect2(key, comment) {
		word = $("#" + key).html()

		var comment =
			'<span class="modalBotton">' +
			'💬💬💬💬💬' + create_modal(value) +
			'</span>';
		$("#" + key).append(comment);
	}

	effect1("Another factor could be our lack of Instant Article adoption",
		"I know the Verge just don't bother to do Instant Article adoption");

	//
	// effect2("3edc", ["comments/............................"])
	//
	// $(".tooltip").on('click', function() {
	// 	// console.log(word);
	// 	$(this).children('.ui.modal').modal('show');
	// });

	var readyStateCheckInterval = setInterval(function() {
			if (document.readyState === "complete") {
				clearInterval(readyStateCheckInterval);

				// ----------------------------------------------------------
				// This part of the script triggers when page is done loading
				console.log("Hello. This message was sent from scripts/inject.js");
				console.log(window.location.href);



				// ----------------------------------------------------------
				//post and receive data
				var http = new XMLHttpRequest();
				var url = "http://192.241.183.83/chrome/medium";
				var params = 'url=' + window.location.href;
				http.open("POST", url, true); //asyc

				//Send the proper header information along with the request
				http.setRequestHeader("Content-type",
					"application/x-www-form-urlencoded");
				// http.timeout = 4000;
				http.send(params);

				http.onreadystatechange = function() { //Call a function when the state changes.
					console.log('posted');

					if (http.readyState == 4) {
						// console.log('posted 444');
						// console.log(http.status);

						if (http.status == 200) {
							console.log(http.responseText);
							var data = JSON.parse(http.responseText);

							//for loop replace
							$.each(data, function(index, dict) {
								$.each(dict, function(key, value) {
									word = $("#" + key).html()

									var comment =
										'<span class="modalBotton">' +
										'💬💬💬💬💬' + create_modal(value) +
										'</span>';
									$("#" + key).append(comment);
								});
							});

							$(".modalBotton").on('click', function() {
								// console.log(word);
								$(this).children('.ui.modal').modal('setting', 'transition',
									'Scale').modal({
									closable: true,
									onDeny: function() {
										window.alert('Thanks for feedback!');
										return false;
									},
									onApprove: function() {
										window.alert('Thanks for feedback!');
										return false;
									},
									onHide: function() {
										reload_data(data);
										return false;
									}
								}).modal('show');
							});

						}
					}
				}



				// var word =
				// 	"Another factor could be our lack of Instant Article adoption. Our parent company has been circumspect in regards to Instant Articles. We’ve been testing Instant Articles,"
				// 	// word = "Big.*thanks.*to.*Digital.*Editor.*Elizabeth.*Wolfe.*for"
				// var comment =
				// 	"Hello. This comment is matched by topic model extension. Given that I hope the Tribune passes muster for “authentic,” let’s focus on the second half. What exact signals are being used to determine what “timely” means?"
				// var rgxp = new RegExp(word, 'i');
				// // var htmls = $("article").html()
				// // word = rgxp.exec(htmls)
				// // console.log(word)
				//
				// // var repl =
				// // 	'<span class="markup--quote markup--p-quote is-other" data-action="show-user-card" data-action-source="post_header_lockup" data-action-value="dd9f4cc96152" data-action-type="hover" data-user-id="dd9f4cc96152" dir="auto">' +
				// // 	word + '</span>';
				// var repl =
				// 	'<span class="markup--quote markup--p-quote is-other tooltip">' + word +
				// 	'<span class="tooltiptext">' + comment + '</span></span>'
				// $("article").html(function() {
				// 	return $(this).html().replace(rgxp, repl);
				// });


			}
		},
		100);
});



// var matchreg = key.replace(/ /g, ".*");
// console.log(matchreg);
// var rgxp = new RegExp(matchreg, 'i');
// word = rgxp.exec($("article").html());
// console.log(word);

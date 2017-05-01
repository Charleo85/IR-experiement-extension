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
}

chrome.extension.sendMessage({}, function(response) {
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
						console.log('posted 444');
						console.log(http.status);

						if (http.status == 200) {
							console.log(http.responseText);
							var data = JSON.parse(http.responseText);

							//for loop replace

							$.each(data, function(key, value) {
								word = $("#" + key).html()
								console.log(word);

								var repl =
									'<span class="markup--quote markup--p-quote is-other tooltip">' +
									word +
									'<span class="tooltiptext">' + value + '</span></span>'
								$("article").html(function() {
									return $(this).html().replace(word, repl);
								});
							});

						}
					}
				}



				var word =
					"Another factor could be our lack of Instant Article adoption. Our parent company has been circumspect in regards to Instant Articles. We’ve been testing Instant Articles,"
					// word = "Big.*thanks.*to.*Digital.*Editor.*Elizabeth.*Wolfe.*for"
				var comment =
					"Hello. This comment is matched by topic model extension. Given that I hope the Tribune passes muster for “authentic,” let’s focus on the second half. What exact signals are being used to determine what “timely” means?"
				var rgxp = new RegExp(word, 'i');
				// var htmls = $("article").html()
				// word = rgxp.exec(htmls)
				// console.log(word)

				// var repl =
				// 	'<span class="markup--quote markup--p-quote is-other" data-action="show-user-card" data-action-source="post_header_lockup" data-action-value="dd9f4cc96152" data-action-type="hover" data-user-id="dd9f4cc96152" dir="auto">' +
				// 	word + '</span>';
				var repl =
					'<span class="markup--quote markup--p-quote is-other tooltip">' + word +
					'<span class="tooltiptext">' + comment + '</span></span>'
				$("article").html(function() {
					return $(this).html().replace(rgxp, repl);
				});


			}
		},
		100);
});

// var matchreg = key.replace(/ /g, ".*");
// console.log(matchreg);
// var rgxp = new RegExp(matchreg, 'i');
// word = rgxp.exec($("article").html());
// console.log(word);

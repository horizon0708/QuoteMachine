var isAlternating = true;
var dataOne; // called when isAlternating = true;
var dataTwo; // called when isAlternating = false;
var firstQuote;
var test;
var currentHue;
var nextHue;

$(document).ready(function () {
	loadInitialQuotes();
	InitialiseHue();
});

$('.quotegen').click(function () {
	fadeColor();
	generateQuote();

});

function loadInitialQuotes() {
	quoteLoad().then(function (response) {
		dataTwo = test;
	});
	quoteLoad().then(function (response) {
		dataOne = test;
		generateQuote();
	});

}

//https://stackoverflow.com/questions/967815/how-do-you-fade-in-out-a-background-color-using-jquery
//https://stackoverflow.com/questions/2171602/settimeout-and-anonymous-function-problem/2171666#2171666

function InitialiseHue() {
	var h = Math.floor(Math.random() * 359);
	$('.background').css("background-color", "hsl(" + h + ",50%,75%");
	$('.color-change').css("color", "hsl(" + h + ",50%,75%");
	currentHue = h;
}


function fadeColor() {
	nextHue = currentHue + 30; // Generates H value of hsl;
	if (nextHue > 359){
		nextHue = nextHue - 359;
	}
	
	var d = 1000;

	
		var changeValue = Math.abs(nextHue - currentHue) / 1000; //makes all transitions last the same.
		
		for (var i = currentHue; i <= nextHue; i = i + changeValue) {
			d += 1;
			(function (ii, dd) {
				setTimeout(function () {
					$('.background').css("background-color", "hsl(" + ii + ",50%,75%");
					$('.color-change').css("color", "hsl(" + ii + ",50%,75%");
				}, dd)
			})(i, d);
		}
	

	currentHue = nextHue;
}

// calling upon API for every refresh makes it laggy, thus I want to cache them.
// what I could do, is that I could load two objects at first, then alternate between them
function generateQuote() {
	if (isAlternating == true) {
		document.getElementById("quote").innerHTML = '"' + dataOne.quote + '"';
		document.getElementById("author").innerHTML = '- ' + dataOne.author;
		document.getElementById("twitter").setAttribute("href", "https://twitter.com/intent/tweet?text=\""+dataOne.quote+"\" -"+dataOne.author);
		quoteLoad().then(function (response) {
			dataOne = test;
		});
		isAlternating = false;
	} else if (!isAlternating) {
		document.getElementById("quote").innerHTML = '"' + dataTwo.quote + '"';
		document.getElementById("author").innerHTML = '- ' + dataTwo.author;
		document.getElementById("twitter").setAttribute("href", "https://twitter.com/intent/tweet?text=\""+dataTwo.quote+"\" -"+dataTwo.author);
		quoteLoad().then(function (response) {
			dataTwo = test;
		});
		isAlternating = true;
	}
}
// instead of doing this, I want to be able to cache 10 quotes at a time.. but the API isn't giving me an array, but rather just one datum.
// https://github.com/mdn/js-examples/blob/master/promises-test/index.html

//http://api.jquery.com/jquery.ajax/
//https://codepen.io/quasimondo/pen/lDdrF 
// this is cool, I wanna implement this sometime

function quoteLoad() {
	return new Promise((resolve, reject) => {

		var request = $.ajax({
			url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10/", // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
			type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
			data: {}, // Additional parameters here
			// not too sure how data works..

			dataType: 'json',
			success: function (data) {
				//test = data;
			},
			error: function (err) {
				alert(err);
			},
			async: true, 
			// async being true was an issue, the api data loaded AFTER the script had executed
			// setting it to false was a fix, but was not recommended; thus had to look at promise and .then() function.
			beforeSend: function (xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "dZr0xRJy5MmshBFjcOpyDJx2OyN6p1oxiA3jsnkr4jiyriucuP"); // Enter here your Mashape key
			}
		});

		request.onload = function () {
			if (request.status === 200) {
				resolve(test = JSON.parse(request.response));

			} else {
				reject(Error('The quote didn\'t load successfully;'));
			}
		}
	});
}
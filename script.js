var isAlternating = true;
var dataOne; // called when isAlternating = true;
var dataTwo; // called when isAlternating = false;
var firstQuote;

$(document).ready(function(){
	loadInitialQuotes();
	generateQuote();
});

$('.quotegen').click(function(){
	generateQuote();
});

function loadInitialQuotes(){
	dataOne = doIt();
	dataTwo = doIt();
}

// calling upon API for every refresh makes it laggy, thus I want to cache them.
// what I could do, is that I could load two objects at first, then alternate between them
function generateQuote(){
	if (isAlternating == true){
		document.getElementById("quote").innerHTML = '"'+dataOne.quote+'"';
		document.getElementById("author").innerHTML = '- '+dataOne.author;
		dataOne = doIt();
		isAlternating = false;		
	}
	else if (!isAlternating){
		document.getElementById("quote").innerHTML = '"'+dataTwo.quote+'"';
		document.getElementById("author").innerHTML = '- '+dataTwo.author;
		dataTwo = doIt();
		isAlternating = true;	
	}
}
// instead of doing this, I want to be able to cache 10 quotes at a time.. but the API isn't giving me an array, but rather just one datum.
// https://github.com/mdn/js-examples/blob/master/promises-test/index.html

//http://api.jquery.com/jquery.ajax/
let QuotePromise = new Promise((resolve, reject) =>{
	doIt();
	resolve(doIt());
});



function doIt() { 
 var test;
 $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10/", // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
	// not too sure how data works..

    dataType: 'json',
    success: function(data) {
        test = data;
        },
    error: function(err) { alert(err); },
	async: false, // this was the issue, the api data loaded AFTER the script had executed - seems depreciated, perhaps there is another way to wait for async data to load?
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "dZr0xRJy5MmshBFjcOpyDJx2OyN6p1oxiA3jsnkr4jiyriucuP"); // Enter here your Mashape key
}});
return test;
}


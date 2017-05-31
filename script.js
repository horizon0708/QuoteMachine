var isAlternating = true;
var dataOne; // called when isAlternating = true;
var dataTwo; // called when isAlternating = false;
var firstQuote;

$(document).ready(function(){
	loadInitialQuotes();
	firstQuote = doIt();
	document.getElementById("quote").innerHTML = firstQuote.quote;
	document.getElementById("author").innerHTML = fristQuote.author;
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
		document.getElementById("author").innerHTML = dataOne.author;
		dataOne = doIt();
		isAlternating = false;		
	}
	else if (!isAlternating){
		document.getElementById("quote").innerHTML = '"'+dataTwo.quote+'"';
		document.getElementById("author").innerHTML = dataTwo.author;
		dataTwo = doIt();
		isAlternating = true;	
	}
}


//http://api.jquery.com/jquery.ajax/
function doIt() { 
 var test;
 $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous/", // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
	// not too sure how data works..

    dataType: 'json',
    success: function(data) {
    	//
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        test = data;
        },
    error: function(err) { alert(err); },
	async: false, // this was the issue, the api data loaded AFTER the script had executed - seems depreciated, perhaps there is another way to wait for async data to load?
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "dZr0xRJy5MmshBFjcOpyDJx2OyN6p1oxiA3jsnkr4jiyriucuP"); // Enter here your Mashape key
}});
return test;
}


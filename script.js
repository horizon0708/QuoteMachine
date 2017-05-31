
$('.quotegen').click(function(){
	$('#quote').html("Hello World!");
	doIt();

});

var apiData;

function doIt() { 
 var output = $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=20/", // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
    	//
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        console.log(data.author);
       	document.getElementById("quote").innerHTML = data.quote; 
		document.getElementById("author").innerHTML = data.author;
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "dZr0xRJy5MmshBFjcOpyDJx2OyN6p1oxiA3jsnkr4jiyriucuP"); // Enter here your Mashape key
}
});}

// calling upon API for every refresh makes it laggy, thus I want to cache them.
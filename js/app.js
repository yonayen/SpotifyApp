// Global Variables
var baseUrl = 'https://api.spotify.com/v1/search?q=';
var relatedUrl = 'https://api.spotify.com/v1/artists/';
​
// --- Function takes query term, displays it and calls getRequest function with query -- //
$(function()
{
	$('#search-button').on("click", function(event)
	{
		var searchTerm = $('#query').val();
		// -- Takes search term and renders it on top of where artist images are displayed -- //
		$('#top_movies .clearfix h2').text(searchTerm);
		getRequest(searchTerm);
	});
});
​
// -- Function sends request w/ query to API -- //
function getRequest(searchTerm)
{
	$.getJSON(baseUrl + searchTerm + '&type=artist', function(data){
		getRelated(data.artists.items[0].id);
	});
}
​
function getRelated(artistId)
{
	$.getJSON(relatedUrl + artistId + '/related-artists', function(firstResults){
		showResults(firstResults.artists);
	});
}
​
var Artist = function(spotifyUrl, imageUrl, name, genre, popularity)
{
	this.spotifyUrl 	= spotifyUrl;
	this.imageUrl		= imageUrl;
	this.name			= name;
	this.genre			= genre;
	this.popularity		= popularity;
}
​
// -- Function to display search results on page -- //
function showResults(results)
{
	$('#top_movies .wrapper .row').remove();
	var html = "";
	var counter = 0;
​
	$.each(results, function(index, arrayitem){
		if (counter < 6) {
			counter ++;
​
			var currentArtist = new Artist(arrayitem.external_urls.spotify,arrayitem.images[1].url, arrayitem.name,arrayitem.genres[0],arrayitem.popularity);
​
			html += '<div class="row">' + '<div class="post">' +
				'<a href=' + currentArtist.spotifyUrl + ' "><img src="' + currentArtist.imageUrl + '"/></a>' +
				'<h3 class="title">' + currentArtist.name + '</h3>' +
				'<p class="post_info">' + currentArtist.genre + ' | ' + currentArtist.popularity + '</p>'+
				'</div>' +
          '</div>';
		}
	});
​
	$('#top_movies .wrapper').append(html);
}
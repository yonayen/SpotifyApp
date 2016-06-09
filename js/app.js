// Global Variables
var baseUrl = 'https://api.spotify.com/v1/search?q=';
var relatedUrl = 'https://api.spotify.com/v1/artists/';

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

// -- Function sends request w/ query to API -- //
function getRequest(searchTerm)
{
	$.getJSON(baseUrl + searchTerm + '&type=artist', function(data){
		console.log((data.artists));
		showResults(data.artists);
		getRelated(data.artists.items.genres.id);
	});
}

function getRelated(firstResults)
{
	$.getJSON(relatedUrl + firstResults.artists.items.genres.id + '/related-artists', function(firstResults){
		console.log((firstResults.artists));
		showResults(data.artists);
	});
}

// -- Function to display search results on page -- //
function showResults(results)
{
	$('#top_movies .wrapper .row').remove();
	var html = "";
	var counter = 0;

	$.each(results, function(index, arrayitem){
		if (counter < 6) {
			counter ++;
			html += '<div class="row">' + '<div class="post">' +
				'<a href="https://open.spotify.com/artist/'+ arrayitem.artists.items.genres.id + ' "><img src="' + arrayitem.artists.items.images.url + '"/></a>' +
				'<h3 class="title">' + arrayitem.artists.items.name + '</h3>' +
				'<p class="post_info">' + arrayitem.artists.items.genres + ' | ' + arrayitem.artists.items.popularity + '</p>'+ 
				'</div>' +
          '</div>';
		}
	 console.log(arrayitem.snippet.title);
	});

	$('#top_movies .wrapper').append(html);
}



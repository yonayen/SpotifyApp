// Global Variables
var artistId = '0JDkhL4rjiPNEp92jAgJnS';
var baseUrl = 'https://api.spotify.com';

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
	$.getJSON(baseUrl + '/v1/artists/' + artistId + '/related-artists'  + searchTerm, function(data){
		console.log((data.artists));
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
				'<a href="https://www.youtube.com/watch?v='+ arrayitem.id.videoId + ' "><img src="' + arrayitem.snippet.thumbnails.medium.url + '"/></a>' +
				'<h3 class="title">' + arrayitem.snippet.title + '</h3>' +
				'<p class="post_info">' + arrayitem.snippet.publishedAt + ' | ' + arrayitem.snippet.channelTitle + '</p>'+ 
				'</div>' +
          '</div>';
		}
	 console.log(arrayitem.snippet.title);
	});

	$('#top_movies .wrapper').append(html);
}



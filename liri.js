var Spotify = require("node-spotify-api");
var bandsintown = require('bandsintown')('codingbootcamp');
var moment = require('moment');
var omdb = require('omdb');

require("dotenv").config();

var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);

//====================== Spotify API =====================================================//

if (process.argv[2] === "spotify-this-song") {

  if (process.argv[3] == null) {

    var inputSpotify = "The Sign";
    spotifyAPI();
  }
  else

  {
    var inputSpotify = process.argv[3];
    spotifyAPI();
  }
}

else if (process.argv[2] === "concert-this") {

  var bandInput = process.argv[3];
  bandAPI();
}
else if (process.argv[2] === "movie-this") {

  omdbAPI();
}

function spotifyAPI() {


  spotify.search({ type: 'track', query: inputSpotify }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var mainData = data.tracks.items
    // console.log(mainData[1].external_urls);

    for (var i = 0; i < mainData.length; i++) {

      // Song URL
      console.log(`Song URL: ${mainData[i].external_urls.spotify}`);
      //  Album Name
      console.log(`Album Name: ${mainData[i].album.name}`);

      // Song Name
      var upcaseSong = inputSpotify.toUpperCase();
      console.log(`Song Name: ${upcaseSong}`);

      for (var j = 0; j < mainData[i].artists.length; j++) {

        // Artist Name(s)
        console.log(`Artist Name: ${mainData[i].artists[j].name}`);
      }
      console.log("\n");
    }
  });

}
// Similar to for loop (cleaner)
//  var albumData = data.tracks.items;

//  albumData.forEach(function(album) {
//        console.log(`Album name: ${album.album.name}`)
//        album.artists.forEach(function(artist) {
//            console.log(`Artist name: ${artist.name}`);
//        })
//  });

// ==========End of Spotify===============================================================//
// ==========End of Spotify===============================================================//


// ==========BANDS IN TOWN================================================================//

function bandAPI() {
  bandsintown
    // .getArtistEventList("Skrillex")
    .getArtistEventList(bandInput)
    .then(function (events) {
      // console.log(`Venue Name: ${events[1].venue.name}`);

      for (var i = 0; i < events.length; i++) {

        console.log(`Venue Name: ${events[i].venue.name}`);

        console.log(`Venue Location: ${events[i].venue.city}, ${events[i].venue.city}`);

        console.log(`Date: ${moment(events[i].datetime).format("MM/DD/YYYY")}`);

        console.log("\n");

      }
    });
}
// =============End of Bands in========================================================//
// =============End of Bands in========================================================//



// =============OMDB START in========================================================//
function omdbAPI() {
  omdb.search('saw', function (err, movies) {
    if (err) {
      return console.error(err);
    }

    if (movies.length < 1) {
      return console.log('No movies were found!');
    }

    movies.forEach(function (movie) {
      console.log('%s (%d)', movie.title, movie.year);
      
    });

  });
}




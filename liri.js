var Spotify = require("node-spotify-api");
var bandsintown = require('bandsintown')('codingbootcamp');
var moment = require('moment');
var omdb = require('omdb');
var omdbApi = require('omdb-client');
var fs = require("fs");

var emptyArr= [];
// May not need empty Arr//


require("dotenv").config();

var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);

// ==Conditionals (Could combined into functions)...Testing out a different way..Does not seem as efficient//

// Try Switch next time!!!
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

  if (process.argv[3] == null) {

    var inputMovie = "Mr. Peabody";
    omdbAPI();
  }
  else

  {
    var inputMovie = process.argv[3];
    omdbAPI();
  }}

  else if (process.argv[2] === "do-what-it-says"){

    readFile(process.argv[2], process.argv[3]);
  }

  else {
    console.log(`I don't like it that way. Type a proper command. i.e missing an "-"? or forgot the quotes??`)
  }
// ==============END OF CONDITIONALS===============================================
// ==============END OF CONDITIONALS===============================================



//====================== Spotify APi=============================================//

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
// Similar to forloop (cleaner)
//  var albumData = data.tracks.items;

//  albumData.forEach(function(album) {
//        console.log(`Album name: ${album.album.name}`)
//        album.artists.forEach(function(artist) {
//            console.log(`Artist name: ${artist.name}`);
//        })
//  });

// ==========End of Spotify======================================================//
// ==========End of Spotify======================================================//


// ==========BANDS IN TOWN=======================================================//

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
// =============End of Bands in==================================================//
// =============End of Bands in==================================================//






// =============OMDB START in===============================================//
function omdbAPI() {

  var output = function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      for( var i = 0 ; i<data.length; i++){	
      console.log (`Movie Title: ${data[i].Title}`);
      console.log (`Released Year: ${data[i].Year}`);
      console.log (`IMBD Rating: ${data[i].Rated}`);
      console.log (`Rotten Tomatoes Rating: ${data[i].Ratings[1].source}`);
      console.log (`Produced in: ${data[i].Country}`);
      console.log (`Language: ${data[i].Language}`);
      console.log (`Plot: ${data[i].Plot}`);
      console.log (`Actors: ${data[i].PlotActors}`);
    }
    console.log("\n");

    }
  };
  
  omdbApi.get({
    apiKey: 'trilogy',
    title: inputMovie,
  }, output);

}

//=============OMDB API END===============================//
//=============OMDB API END===============================//






// ========================Do-WHat-it-says-file===============//
function readFile(){

fs.readFile("random.txt", "utf8", function (err, data){
  if (err){
    return console.log(err);
  }
  else{
    var newData= (data.replace(/,/g,""));
    var res = newData.split (" ");
    // console.log(res);

    // Pushed to empty array for clarity//
    console.log(res[0]);
    console.log(res[1]);
    console.log( "THIS FUNCTION IS NOT YET WORKING...")
    console.log( "I think I am relatively close, but ANY COMMENTS WOULD HELP!!")
    process.argv[2]= res[0];
    process.argv[3]= res[1];


    // data appears, but how to add to command line??? O_o
    // First push the data into an empty array, split it up into two indexes,
    // then set them as process.argv[2], process.argv[3]??
  }


   // end of FS readfile
});
}
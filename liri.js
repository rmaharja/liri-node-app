var Spotify= require("node-spotify-api");

require("dotenv").config();
var keys= require ("./key.js")

// Spotify

var spotify = new Spotify(keys.spotify);


// var input= process.argv[2];

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  console.log(data.items);
// console.log(JSON.stringify(data)); 
// console.log(JSON.stringify(result, null, 2));

});


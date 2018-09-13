var Spotify= require("node-spotify-api");

require("dotenv").config();
var keys= require ("./key.js")

// Spotify

var spotify = new Spotify(keys.spotify);


// var input= process.argv[2];

if (process.argv[2] === "spotify-this-song"){
  spotifyAPI();
}

function spotifyAPI(){
var inputSpotify= process.argv[3];

spotify.search({ type: 'track', query: inputSpotify }, function(err, data) {
 if (err) {
   return console.log('Error occurred: ' + err);
 }

 var albumData = data.tracks.items;

 albumData.forEach(function(album) {
       console.log(`Album name: ${album.album.name}`)
       album.artists.forEach(function(artist) {
           console.log(`Artist name: ${artist.name}`);
       })
 });
 
});
}

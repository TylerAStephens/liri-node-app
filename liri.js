// Grabing keys from other javascript files
var keys = require("./keys.js");
var skeys = require("./skeys.js");

var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
//setting user input for command
var command = process.argv[2];


// Twitter command
if (command === "my-tweets") {
    // applying twitter API keys
    var client = new Twitter(keys);
    // creating parameters for which profile to pull from and how many tweets
    var params = {screen_name: 'TyDurdenS', count:20 };
    // pulls statuses from client under the parameters specified
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // for loop for adding all tweets
        for (var i = 0; i < tweets.length; i++) {
            // stringifying results of tweet text and date added
            var leTweets = JSON.stringify(tweets[i].text + " " + tweets[i].created_at, null, 2);
            // logging result
            console.log(leTweets); 
        }      
    }); 
}


// Spotify command/
if (command === "spotify-this-song") {
    //apply spotify API key
    var spotify = new Spotify(skeys);

   // Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the song name
var song = "";

// Capture all the words in the address (again ignoring the first two Node arguments)
for (var i = 3; i < nodeArgs.length; i++) {

  // Build a string with the name.
  song = song + " " + nodeArgs[i];

  debugger;

}
// seach spotify
spotify.search({ type: 'track', query: song })
// what to do with the pulled data
  .then(function(data) {
    console.log("Artists: " + data.tracks.items[0].album.artists[0].name);    
    console.log("Song name: " + data.tracks.items[0].name);
    console.log("Link to song: " + data.tracks.items[0].album.external_urls.spotify);
    console.log("Album: " + data.tracks.items[0].album.name);
  })
  // check for error code
  .catch(function(err) {
    console.log(err);
  });

}


// Movie Command/
if (command === "movie-this") {
   
 // Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the movie name
var title = "";

// Capture all the words in the address (again ignoring the first two Node arguments)
for (var i = 3; i < nodeArgs.length; i++) {

  // Build a string with the movie name.
  title = title + "" + nodeArgs[i];

  debugger;
}
console.log(title);
// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?apikey=40e9cece&t=" + title, function(error, response, body) {
    
      // If there were no errors and the response code was 200 (i.e. the request was successful)...
      if (!error && response.statusCode === 200) {
    
        // Then we print out the movie information
        console.log("The movie's Title is: " + JSON.parse(body).Title);
        console.log("The year of release: " + JSON.parse(body).Year);        
        console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
        console.log("The movie's Rotten Tomatos rating is: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country where produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot:  " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        
      }
     // console.log(request);
    });
}



// This block of code will read from the "movies.txt" file.
if (command === "do-what-it-says") {
  //creating callback function to use data that is read from txt file.
    function readContent(callback) {
      // The code will store the contents of the reading inside the variable "data"
      // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) return callback(error)
            callback(null, data)
        })
    }
    //calling back content
    readContent(function (err, data) {
      //new variable name to call up data as newSong
        var newSong = data;
       
  // pulls spotify API keys
     var spotify = new Spotify(skeys);
     // changes pulled data of newSong into Spotify commands orignal song choice
     var song = newSong;
     // search spotify
     spotify.search({ type: 'track', query: song })
     // what to do with the pulled data
     .then(function(data) {
       console.log("Artists: " + data.tracks.items[0].album.artists[0].name);    
       console.log("Song name: " + data.tracks.items[0].name);
       console.log("Link to song: " + data.tracks.items[0].album.external_urls.spotify);
       console.log("Album: " + data.tracks.items[0].album.name);
     })
     //check for errors
     .catch(function(err) {
       console.log(err);
     });
   
    })

   
};

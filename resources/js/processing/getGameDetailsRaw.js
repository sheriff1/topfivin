const unirest = require('unirest');
const fs = require('fs');
const _ = require('underscore');

//going to get gameDetails from games 4387 to 6075

var startOfRegSeason = 4387;
var endOfRegSeason = 6075; //gets all NBA reg. season games

var gameDetailsByTeam = [];

for (var i = startOfRegSeason; i < 4390; i++) { //4390 to be changed to endOfRegSeason when I feel like spending the money...
    unirest.get("https://api-nba-v1.p.rapidapi.com/gameDetails/" + i)
        .header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "13bddf6d9fmsh46f9643a34ba3a1p1d3dd1jsn83317f761bc8")
        .end(function(result) {

            fs.appendFile("resources/data/gameDetailsRaw.json", JSON.stringify(result) + ",", function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
}
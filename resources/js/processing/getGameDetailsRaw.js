const unirest = require('unirest');
const fs = require('fs');
const _ = require('underscore');

var gameDetails = [];
var gameIds = JSON.parse(fs.readFileSync('__gameIds.json', 'utf8'));

for (var i = 0; i < 1; i++) {
    unirest.get("https://api-nba-v1.p.rapidapi.com/gameDetails/" + gameIds[i])
        .header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "[ADD API KEY HERE]")
        .end(function(result) {

            fs.appendFile("_gameDetailsRaw.json", JSON.stringify(result) + ",", function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
}
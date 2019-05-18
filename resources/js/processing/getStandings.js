const unirest = require('unirest');
const fs = require('fs');

unirest.get("https://api-nba-v1.p.rapidapi.com/standings/standard/2018")
    .header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "13bddf6d9fmsh46f9643a34ba3a1p1d3dd1jsn83317f761bc8")
    .end(function(result) {
        console.log(result.status, result.headers, result.body);

        for (var i = result.body.api.standings.length - 1; i >= 0; i--) {
            fs.appendFile("standings.json", JSON.stringify(result.body.api.standings[i]) + ",", function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("standings " + i + " saved");
            });
        }
    });
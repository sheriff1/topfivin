const unirest = require('unirest');
const fs = require ('fs');

unirest.get("https://api-nba-v1.p.rapidapi.com/teams/league/standard")
.header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
.header("X-RapidAPI-Key", "13bddf6d9fmsh46f9643a34ba3a1p1d3dd1jsn83317f761bc8")
.end(function (result) {
	console.log(result.status, result.headers, result.body);

	for (var i = result.body.api.teams.length - 1; i >= 0; i--){
		if(result.body.api.teams[i].nbaFranchise == 1){
			fs.appendFile("teams.json", JSON.stringify(result.body.api.teams[i]) + "," , function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log("team " + i + " saved");
			});
		}
	}

});
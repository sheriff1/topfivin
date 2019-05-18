const unirest = require('unirest');
const fs = require('fs');
const _ = require('underscore');

//going to get gameDetails from games 4387 to 6075

var startOfRegSeason = 4387;
var endOfRegSeason = 6075; //gets all NBA reg. season games
var endForTesting = 4435; //originally 4435 (gets about 40 games)

var gameDetailsByTeam = [];

for (var i = startOfRegSeason; i < endForTesting; i++) {
    unirest.get("https://api-nba-v1.p.rapidapi.com/gameDetails/" + i)
        .header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "13bddf6d9fmsh46f9643a34ba3a1p1d3dd1jsn83317f761bc8")
        .end(function(result) {
            //VISITING TEAM
            if (_.findWhere(gameDetailsByTeam, { fullName: result.body.api.game[0].vTeam.fullName }) == null) {
                console.log("VISITING TEAM - ADDING");
                //ADD ITEM TO ARRAY FOR VISITING TEAM
                var toBeAdded = {};
                toBeAdded.fullName = result.body.api.game[0].vTeam.fullName;
                toBeAdded.gameDuration = result.body.api.game[0].gameDuration;
                toBeAdded.timesTied = result.body.api.game[0].timesTied;
                toBeAdded.leadChanges = result.body.api.game[0].leadChanges;
                toBeAdded.points = result.body.api.game[0].vTeam.score;
                toBeAdded.q1Points = result.body.api.game[0].vTeam.score.linescore[0];
                toBeAdded.q2Points = result.body.api.game[0].vTeam.score.linescore[1];
                toBeAdded.q3Points = result.body.api.game[0].vTeam.score.linescore[2];
                toBeAdded.q4Points = result.body.api.game[0].vTeam.score.linescore[3];
                gameDetailsByTeam.push(toBeAdded);
            } else {
                console.log("VISITING TEAM - UPDATING");
                //UPDATE ITEM IN ARRAY FOR VISITING TEAM
                var toBeUpdated = _.findWhere(gameDetailsByTeam, { fullName: result.body.api.game[0].vTeam.fullName });
                toBeUpdated.gameDuration += result.body.api.game[0].gameDuration;
                toBeUpdated.timesTied += result.body.api.game[0].timesTied;
                toBeUpdated.leadChanges += result.body.api.game[0].leadChanges;
                toBeUpdated.points += result.body.api.game[0].vTeam.score;
                toBeUpdated.q1Points = result.body.api.game[0].vTeam.score.linescore[0];
                toBeUpdated.q2Points = result.body.api.game[0].vTeam.score.linescore[1];
                toBeUpdated.q3Points = result.body.api.game[0].vTeam.score.linescore[2];
                toBeUpdated.q4Points = result.body.api.game[0].vTeam.score.linescore[3];
            }

            //HOME TEAM
            if (_.findWhere(gameDetailsByTeam, { fullName: result.body.api.game[0].hTeam.fullName }) == null) {
                console.log("HOME TEAM - ADDING");
                //ADD ITEM TO ARRAY FOR HOME TEAM
                var toBeAdded = {};
                toBeAdded.fullName = result.body.api.game[0].hTeam.fullName;
                toBeAdded.gameDuration = result.body.api.game[0].gameDuration;
                toBeAdded.timesTied = result.body.api.game[0].timesTied;
                toBeAdded.leadChanges = result.body.api.game[0].leadChanges;
                toBeAdded.points = result.body.api.game[0].hTeam.score;
                toBeAdded.q1Points = result.body.api.game[0].hTeam.score.linescore[0];
                toBeAdded.q2Points = result.body.api.game[0].hTeam.score.linescore[1];
                toBeAdded.q3Points = result.body.api.game[0].hTeam.score.linescore[2];
                toBeAdded.q4Points = result.body.api.game[0].hTeam.score.linescore[3];
                gameDetailsByTeam.push(toBeAdded);
            } else {
                console.log("HOME TEAM - UPDATING");
                //UPDATE ITEM IN ARRAY FOR HOME TEAM
                var toBeUpdated = _.findWhere(gameDetailsByTeam, { fullName: result.body.api.game[0].hTeam.fullName });
                toBeUpdated.gameDuration += result.body.api.game[0].gameDuration;
                toBeUpdated.timesTied += result.body.api.game[0].timesTied;
                toBeUpdated.leadChanges += result.body.api.game[0].leadChanges;
                toBeUpdated.points += result.body.api.game[0].hTeam.score;
                toBeUpdated.q1Points = result.body.api.game[0].hTeam.score.linescore[0];
                toBeUpdated.q2Points = result.body.api.game[0].hTeam.score.linescore[1];
                toBeUpdated.q3Points = result.body.api.game[0].hTeam.score.linescore[2];
                toBeUpdated.q4Points = result.body.api.game[0].hTeam.score.linescore[3];
            }
        });
}

if (i == endForTesting - 1) {
    //WRITE TO FILE
    fs.appendFile("gameDetailsByTeam.json", JSON.stringify(gameDetailsByTeam), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("gameDetailsByTeam.json saved");
    });;
}
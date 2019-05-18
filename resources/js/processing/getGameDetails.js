const unirest = require('unirest');
const fs = require('fs');
const _ = require('underscore');

//going to get gameDetails from games 4387 to 6075

var startOfRegSeason = 4387;
var endOfRegSeason = 6075; //gets all NBA reg. season games
var endForTesting = 4435; //originally 4435 (gets about 40 games)
var counter = 0;

var gameDetailsByTeam = [];

for (var i = startOfRegSeason; i < endForTesting; i++) {

    unirest.get("https://api-nba-v1.p.rapidapi.com/gameDetails/" + i)
        .header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "13bddf6d9fmsh46f9643a34ba3a1p1d3dd1jsn83317f761bc8")
        .end(function(result) {
            //VISITING TEAM
            if (_.findWhere(gameDetailsByTeam, { fullName: result.body.api.game[0].vTeam.fullName }) == null) {
                //console.log("VISITING TEAM - ADDING");
                //ADD ITEM TO ARRAY FOR VISITING TEAM
                var toBeAdded = {};

                toBeAdded.fullName = result.body.api.game[0].vTeam.fullName;

                var gameDurationToMinutes = result.body.api.game[0].gameDuration.split(":");
                gameDurationToMinutes = Number(gameDurationToMinutes[0]) * 60 + Number(gameDurationToMinutes[1]);

                toBeAdded.gameDuration = gameDurationToMinutes;

                toBeAdded.timesTied = Number(result.body.api.game[0].timesTied);

                toBeAdded.leadChanges = Number(result.body.api.game[0].leadChanges);

                toBeAdded.points = Number(result.body.api.game[0].vTeam.score.points);

                for (var a = 0; a < result.body.api.game[0].vTeam.score.linescore.length; a++) {
                    switch (a) {
                        case 0:
                            toBeAdded.q1Points = Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                        case 1:
                            toBeAdded.q2Points = Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                        case 2:
                            toBeAdded.q3Points = Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                        case 3:
                            toBeAdded.q4Points = Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                        default:
                            toBeAdded.overtimePoints = Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                    }
                }

                gameDetailsByTeam.push(toBeAdded);

            } else {
                //console.log("VISITING TEAM - UPDATING");
                //UPDATE ITEM IN ARRAY FOR VISITING TEAM
                var toBeUpdated = _.findWhere(gameDetailsByTeam, { fullName: result.body.api.game[0].vTeam.fullName });

                var gameDurationToMinutes = result.body.api.game[0].gameDuration.split(":");
                gameDurationToMinutes = Number(gameDurationToMinutes[0]) * 60 + Number(gameDurationToMinutes[1]);

                toBeUpdated.gameDuration += gameDurationToMinutes;

                toBeUpdated.timesTied += Number(result.body.api.game[0].timesTied);

                toBeUpdated.leadChanges += Number(result.body.api.game[0].leadChanges);

                toBeUpdated.points += Number(result.body.api.game[0].vTeam.score.points);

                for (var a = 0; a < result.body.api.game[0].vTeam.score.linescore.length; a++) {
                    switch (a) {
                        case 0:
                            toBeUpdated.q1Points += Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                        case 1:
                            toBeUpdated.q2Points += Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                        case 2:
                            toBeUpdated.q3Points += Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                        case 3:
                            toBeUpdated.q4Points += Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                        default:
                            toBeUpdated.overtimePoints += Number(result.body.api.game[0].vTeam.score.linescore[a]);
                            break;
                    }
                }

            }

            //HOME TEAM
            if (_.findWhere(gameDetailsByTeam, { fullName: result.body.api.game[0].hTeam.fullName }) == null) {
                //console.log("HOME TEAM - ADDING");
                //ADD ITEM TO ARRAY FOR HOME TEAM
                var toBeAdded = {};

                toBeAdded.fullName = result.body.api.game[0].hTeam.fullName;

                var gameDurationToMinutes = result.body.api.game[0].gameDuration.split(":");
                gameDurationToMinutes = Number(gameDurationToMinutes[0]) * 60 + Number(gameDurationToMinutes[1]);

                toBeAdded.gameDuration = gameDurationToMinutes;

                toBeAdded.timesTied = Number(result.body.api.game[0].timesTied);

                toBeAdded.leadChanges = Number(result.body.api.game[0].leadChanges);

                toBeAdded.points = Number(result.body.api.game[0].hTeam.score.points);

                for (var a = 0; a < result.body.api.game[0].hTeam.score.linescore.length; a++) {
                    switch (a) {
                        case 0:
                            toBeAdded.q1Points = Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                        case 1:
                            toBeAdded.q2Points = Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                        case 2:
                            toBeAdded.q3Points = Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                        case 3:
                            toBeAdded.q4Points = Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                        default:
                            toBeAdded.overtimePoints = Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                    }
                }

                gameDetailsByTeam.push(toBeAdded);

            } else {
                //console.log("HOME TEAM - UPDATING");
                //UPDATE ITEM IN ARRAY FOR HOME TEAM
                var toBeUpdated = _.findWhere(gameDetailsByTeam, { fullName: result.body.api.game[0].hTeam.fullName });

                var gameDurationToMinutes = result.body.api.game[0].gameDuration.split(":");
                gameDurationToMinutes = Number(gameDurationToMinutes[0]) * 60 + Number(gameDurationToMinutes[1]);

                toBeUpdated.gameDuration += gameDurationToMinutes;

                toBeUpdated.timesTied += Number(result.body.api.game[0].timesTied);

                toBeUpdated.leadChanges += Number(result.body.api.game[0].leadChanges);

                toBeUpdated.points += Number(result.body.api.game[0].hTeam.score.points);

                for (var a = 0; a < result.body.api.game[0].hTeam.score.linescore.length; a++) {
                    switch (a) {
                        case 0:
                            toBeUpdated.q1Points += Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                        case 1:
                            toBeUpdated.q2Points += Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                        case 2:
                            toBeUpdated.q3Points += Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                        case 3:
                            toBeUpdated.q4Points += Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                        default:
                            toBeUpdated.overtimePoints = Number(result.body.api.game[0].hTeam.score.linescore[a]);
                            break;
                    }
                }

            }
            counter++;
            if (counter == 48) {
                fs.appendFile("gameDetailsByTeam.json", JSON.stringify(gameDetailsByTeam), function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("gameDetailsByTeam.json saved");
                });
            }
        });
}
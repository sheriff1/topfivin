const fs = require('fs');
const _ = require('underscore');

var gameDetailsRaw = [];
var gameDetailsByTeam = [];
var counter = 0;

gameDetailsRaw = JSON.parse(fs.readFileSync('gameDetailsRaw.json', 'utf8'));

for (var i = 0; i < gameDetailsRaw.length; i++) {
    //VISITING TEAM
    if (gameDetailsRaw[i].statusCode == 200 && gameDetailsRaw[i].body.api.game[0].gameId != 5714) { //game 5714 == all star game

        if (_.findWhere(gameDetailsByTeam, { fullName: gameDetailsRaw[i].body.api.game[0].vTeam.fullName }) == null) {
            //ADD ITEM TO ARRAY FOR VISITING TEAM
            var toBeAdded = {};

            toBeAdded.fullName = gameDetailsRaw[i].body.api.game[0].vTeam.fullName;

            var gameDurationToMinutes = gameDetailsRaw[i].body.api.game[0].gameDuration.split(":");
            gameDurationToMinutes = Number(gameDurationToMinutes[0]) * 60 + Number(gameDurationToMinutes[1]);

            toBeAdded.gameDuration = gameDurationToMinutes;

            toBeAdded.timesTied = Number(gameDetailsRaw[i].body.api.game[0].timesTied);

            toBeAdded.leadChanges = Number(gameDetailsRaw[i].body.api.game[0].leadChanges);

            toBeAdded.points = Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.points);

            for (var a = 0; a < gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore.length; a++) {
                switch (a) {
                    case 0:
                        toBeAdded.q1Points = Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                    case 1:
                        toBeAdded.q2Points = Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                    case 2:
                        toBeAdded.q3Points = Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                    case 3:
                        toBeAdded.q4Points = Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                    default:
                        toBeAdded.overtimePoints = Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                }
            }

            gameDetailsByTeam.push(toBeAdded);

        } else {
            //UPDATE ITEM IN ARRAY FOR VISITING TEAM
            var toBeUpdated = _.findWhere(gameDetailsByTeam, { fullName: gameDetailsRaw[i].body.api.game[0].vTeam.fullName });

            var gameDurationToMinutes = gameDetailsRaw[i].body.api.game[0].gameDuration.split(":");
            gameDurationToMinutes = Number(gameDurationToMinutes[0]) * 60 + Number(gameDurationToMinutes[1]);

            toBeUpdated.gameDuration += gameDurationToMinutes;

            toBeUpdated.timesTied += Number(gameDetailsRaw[i].body.api.game[0].timesTied);

            toBeUpdated.leadChanges += Number(gameDetailsRaw[i].body.api.game[0].leadChanges);

            toBeUpdated.points += Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.points);

            for (var a = 0; a < gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore.length; a++) {
                switch (a) {
                    case 0:
                        toBeUpdated.q1Points += Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                    case 1:
                        toBeUpdated.q2Points += Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                    case 2:
                        toBeUpdated.q3Points += Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                    case 3:
                        toBeUpdated.q4Points += Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                    default:
                        toBeUpdated.overtimePoints += Number(gameDetailsRaw[i].body.api.game[0].vTeam.score.linescore[a]);
                        break;
                }
            }

        }

        //HOME TEAM
        if (_.findWhere(gameDetailsByTeam, { fullName: gameDetailsRaw[i].body.api.game[0].hTeam.fullName }) == null) {
            //ADD ITEM TO ARRAY FOR HOME TEAM
            var toBeAdded = {};

            toBeAdded.fullName = gameDetailsRaw[i].body.api.game[0].hTeam.fullName;

            var gameDurationToMinutes = gameDetailsRaw[i].body.api.game[0].gameDuration.split(":");
            gameDurationToMinutes = Number(gameDurationToMinutes[0]) * 60 + Number(gameDurationToMinutes[1]);

            toBeAdded.gameDuration = gameDurationToMinutes;

            toBeAdded.timesTied = Number(gameDetailsRaw[i].body.api.game[0].timesTied);

            toBeAdded.leadChanges = Number(gameDetailsRaw[i].body.api.game[0].leadChanges);

            toBeAdded.points = Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.points);

            for (var a = 0; a < gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore.length; a++) {
                switch (a) {
                    case 0:
                        toBeAdded.q1Points = Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                    case 1:
                        toBeAdded.q2Points = Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                    case 2:
                        toBeAdded.q3Points = Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                    case 3:
                        toBeAdded.q4Points = Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                    default:
                        toBeAdded.overtimePoints = Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                }
            }

            gameDetailsByTeam.push(toBeAdded);

        } else {
            //UPDATE ITEM IN ARRAY FOR HOME TEAM
            var toBeUpdated = _.findWhere(gameDetailsByTeam, { fullName: gameDetailsRaw[i].body.api.game[0].hTeam.fullName });

            var gameDurationToMinutes = gameDetailsRaw[i].body.api.game[0].gameDuration.split(":");
            gameDurationToMinutes = Number(gameDurationToMinutes[0]) * 60 + Number(gameDurationToMinutes[1]);

            toBeUpdated.gameDuration += gameDurationToMinutes;

            toBeUpdated.timesTied += Number(gameDetailsRaw[i].body.api.game[0].timesTied);

            toBeUpdated.leadChanges += Number(gameDetailsRaw[i].body.api.game[0].leadChanges);

            toBeUpdated.points += Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.points);

            for (var a = 0; a < gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore.length; a++) {
                switch (a) {
                    case 0:
                        toBeUpdated.q1Points += Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                    case 1:
                        toBeUpdated.q2Points += Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                    case 2:
                        toBeUpdated.q3Points += Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                    case 3:
                        toBeUpdated.q4Points += Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                    default:
                        toBeUpdated.overtimePoints = Number(gameDetailsRaw[i].body.api.game[0].hTeam.score.linescore[a]);
                        break;
                }
            }

        }
        counter++;
        console.log(counter);
    }
}

fs.appendFile("gameDetailsByTeam.json", JSON.stringify(gameDetailsByTeam), function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("gameDetailsByTeam.json saved");
});
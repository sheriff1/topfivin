const fs = require('fs');
const _ = require('underscore');

let rankings = [];

let teams = JSON.parse(fs.readFileSync('../../data/teams.json', 'utf8'));
// console.log(teams);

let standings = JSON.parse(fs.readFileSync('../../data/standings.json', 'utf8'));
// console.log(standings);
let gameDetails = JSON.parse(fs.readFileSync('../../data/gameDetailsByTeam.json', 'utf8'));

let games = JSON.parse(fs.readFileSync('../../data/gamesByTeam.json', 'utf8'));


buildStandings(teams, standings);
buildGameDetails(rankings, gameDetails);
buildGames(rankings, games);
sortSimple(rankings);

//* UNCOMMENT OUT BELOW WHEN GAME DETAILS ARE READY !!!

function buildGameDetails(rankings, gameDetails) {
    console.log("buildGameDetails called");

    for (var i = 0; i < gameDetails.length; i++) {
        //Find team by name
        var team = _.findWhere(rankings, { fullName: gameDetails[i].fullName });
        //Add data[x] for each item 
        team.data[11] = {
            rank: 4,
            value: gameDetails[i].timesTied,
            stat: "Times Tied"
        }
        team.data[12] = {
            rank: 4,
            value: gameDetails[i].leadChanges,
            stat: "Lead Changes"
        }
        team.data[13] = {
            rank: 4,
            value: gameDetails[i].q1Points,
            stat: "Q1 Points"
        }
        team.data[14] = {
            rank: 4,
            value: gameDetails[i].q2Points,
            stat: "Q2 Points"
        }
        team.data[15] = {
            rank: 4,
            value: gameDetails[i].q3Points,
            stat: "Q3 Points"
        }
        team.data[16] = {
            rank: 4,
            value: gameDetails[i].q4Points,
            stat: "Q4 Points"
        }
        team.data[17] = {
            rank: 4,
            value: gameDetails[i].overtimePoints,
            stat: "Overtime Points"
        }
    }
}

function buildGames(rankings, games) {
    console.log("buildGames called");

    for (var i = 0; i < games.length; i++) {
        //Find team by name
        var team = _.findWhere(rankings, { fullName: games[i].fullName });
        //Add data[x] for each item 
        team.data[18] = {
            rank: 4,
            value: games[i].gameDuration,
            stat: "Game Duration"
        }
        team.data[19] = {
            rank: 4,
            value: (games[i].points / 82).toFixed(2),
            stat: "Points Per Game"
        }
    }
}

function buildStandings(teams, standings) {

    console.log("buildStandings called");

    //Builds 'ranking' array to be manipulated
    for (var i = 0; i <= teams.length - 1; i++) {
        var toBeAdded = {};
        toBeAdded.data = [];
        toBeAdded.data[0] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).win),
            stat: "Wins"
        }

        toBeAdded.data[1] = {
            rank: "",
            value: value = Number(_.findWhere(standings, { teamId: teams[i].teamId }).loss),
            stat: "Losses"
        }

        toBeAdded.data[2] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).streak),
            stat: "Recent Streak"
        }

        toBeAdded.data[3] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).division.win),
            stat: "Division Wins"
        }

        toBeAdded.data[4] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).division.loss),
            stat: "Division Losses"
        }

        toBeAdded.data[5] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).conference.win),
            stat: "Conference Wins"
        }

        toBeAdded.data[6] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).conference.loss),
            stat: "Conference Losses"
        }

        toBeAdded.data[7] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).home.win),
            stat: "Home Wins"
        }

        toBeAdded.data[8] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).home.loss),
            stat: "Home Losses"
        }

        toBeAdded.data[9] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).away.win),
            stat: "Away Wins"
        }

        toBeAdded.data[10] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).away.loss),
            stat: "Away Losses"
        }

        toBeAdded.fullName = teams[i].fullName;
        toBeAdded.logo = teams[i].logo;

        rankings.push(toBeAdded);
    }
}

function sortSimple(rankings) {

    console.log("sortSimple called");

    // console.log(rankings[0].data.length);

    for (var r = 0; r < rankings[0].data.length; r++) {
        rankings = rankings.sort(function(a, b) {
            return a.data[r].value - b.data[r].value;
        });
        for (var i = 0; i < rankings.length; ++i) {
            rankings[i].data[r].rank = 30 - i;
        }
    }

    fs.appendFile("../../data/rankings.json", JSON.stringify(rankings), function(err) { if (err) { return console.log(err); } });

}
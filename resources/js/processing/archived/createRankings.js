const fs = require('fs');
const _ = require('underscore');

let rankings = [];

let teams = JSON.parse(fs.readFileSync('resources/data/teams.json', 'utf8'));
// console.log(teams);

let standings = JSON.parse(fs.readFileSync('resources/data/standings.json', 'utf8'));
// console.log(standings);
buildSimple(teams, standings);
sortSimple(rankings);

function buildSimple(teams, standings) {

    console.log("buildSimple called");

    //Builds 'ranking' array to be manipulated
    for (var i = 0; i <= teams.length - 1; i++) {
        var toBeAdded = {};
        toBeAdded.fullName = teams[i].fullName;
        toBeAdded.wins = Number(_.findWhere(standings, { teamId: teams[i].teamId }).win);
        toBeAdded.losses = Number(_.findWhere(standings, { teamId: teams[i].teamId }).loss);
        toBeAdded.streak = Number(_.findWhere(standings, { teamId: teams[i].teamId }).streak);
        toBeAdded.divisionWins = Number(_.findWhere(standings, { teamId: teams[i].teamId }).division.win);
        toBeAdded.logo = teams[i].logo;
        rankings.push(toBeAdded);
    }
}

function sortSimple(rankings) {

    console.log("sortSimple called");

    //Add Win Rank
    rankings = _.sortBy(rankings, 'wins');
    for (var i = 0; i <= rankings.length - 1; i++) {
        rankings[i]["winsRank"] = rankings.length - i;
    }

    // //Add Loss Rank
    rankings = _.sortBy(rankings, 'losses');
    for (var i = 0; i <= rankings.length - 1; i++) {
        rankings[i]["lossesRank"] = rankings.length - i;
    }

    //Add Streak Rank
    rankings = _.sortBy(rankings, 'streak');
    for (var i = 0; i <= rankings.length - 1; i++) {
        rankings[i]["streakRank"] = rankings.length - i;
    }

    //Add Divisional Wins
    rankings = _.sortBy(rankings, 'divisionWins');
    for (var i = 0; i <= rankings.length - 1; i++) {
        rankings[i]["divisionWinsRank"] = rankings.length - i;
    }


    fs.appendFile("resources/data/rankingsV0.json", "[", function(err) { if (err) { return console.log(err); } });

    //Print to see results
    for (var i = rankings.length - 1; i >= 0; i--) {

        fs.appendFile("resources/data/rankings.json",
            "{\"fullName\": \"" +
            rankings[i]["fullName"] +

            "\", \"logo\": \"" +
            rankings[i]["logo"] +

            //Queue Wins
            "\", \"wins\": " +
            rankings[i]["wins"] +
            ", \"winsRank\": " +
            rankings[i]["winsRank"] +

            //Queue Losses
            ", \"losses\": " +
            rankings[i]["losses"] +
            ", \"lossesRank\": " +
            rankings[i]["lossesRank"] +

            //Queue Recent Streak
            ", \"streak\": " +
            rankings[i]["streak"] +
            ", \"streakRank\": " +
            rankings[i]["streakRank"] +

            //Queue Division Wins Streak
            ", \"divisionWins\": " +
            rankings[i]["divisionWins"] +
            ", \"divisionWinsRank\": " +
            rankings[i]["divisionWinsRank"] +

            "},",
            function(err) { if (err) { return console.log(err); } });
    }
}
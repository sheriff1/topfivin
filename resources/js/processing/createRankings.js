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
        toBeAdded.win = Number(_.findWhere(standings, { teamId: teams[i].teamId }).win);
        toBeAdded.loss = Number(_.findWhere(standings, { teamId: teams[i].teamId }).loss);
        toBeAdded.logo = teams[i].logo;
        rankings.push(toBeAdded);
    }
}

function sortSimple(rankings) {

    console.log("sortSimple called");

    //Add Win Rank
    rankings = _.sortBy(rankings, 'win');
    for (var i = 0; i <= rankings.length - 1; i++) {
        rankings[i]["winRank"] = rankings.length - i;
    }

    //Add Loss Rank
    rankings = _.sortBy(rankings, 'loss');
    for (var i = 0; i <= rankings.length - 1; i++) {
        rankings[i]["lossRank"] = rankings.length - i;
    }

    fs.appendFile("resources/data/rankings.json", "[", function(err) { if (err) { return console.log(err); } });

    //Print to see results
    for (var i = rankings.length - 1; i >= 0; i--) {

        fs.appendFile("resources/data/rankings.json", "{\"fullName\": \"" + rankings[i]["fullName"] +
            "\", \"logo\": \"" +
            rankings[i]["logo"] +
            "\", \"wins\": " +
            rankings[i]["win"] +
            ", \"losses\": " +
            rankings[i]["loss"] +
            ", \"winRank\": " +
            rankings[i]["winRank"] +
            ", \"lossRank\": " +
            rankings[i]["lossRank"] +
            "},",
            function(err) { if (err) { return console.log(err); } });

        // console.log("{\"fullName\": \"" + rankings[i]["fullName"] + 
        // 	"\", \"wins\": " + 
        // 	rankings[i]["win"] + 
        // 	", \"losses\": " + 
        // 	rankings[i]["loss"] +
        // 	", \"winRank\": " + 
        // 	rankings[i]["winRank"] +
        // 	", \"lossRank\": " + 
        // 	rankings[i]["lossRank"] +
        // 	"},"
        // );
    }
}
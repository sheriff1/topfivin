const fs = require('fs');
const _ = require('underscore');

let rankings = [];

let teams = JSON.parse(fs.readFileSync('/Library/WebServer/Documents/topfivin/resources/data/teams.json', 'utf8'));
// console.log(teams);

let standings = JSON.parse(fs.readFileSync('/Library/WebServer/Documents/topfivin/resources/data/standings.json', 'utf8'));
// console.log(standings);
buildSimple(teams, standings);
sortSimple(rankings);

function buildSimple(teams, standings) {

    console.log("buildSimple called");

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
            stat: "Streak"
        }

        toBeAdded.data[3] = {
            rank: "",
            value: Number(_.findWhere(standings, { teamId: teams[i].teamId }).division.win),
            stat: "Division Wins"
        }

        toBeAdded.fullName = teams[i].fullName;
        toBeAdded.logo = teams[i].logo;
        toBeAdded.color =

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

    fs.appendFile("/Library/WebServer/Documents/topfivin/resources/data/rankingsV2.json", JSON.stringify(rankings), function(err) { if (err) { return console.log(err); } });

}
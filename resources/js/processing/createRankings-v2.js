const fs = require('fs');
const _ = require('underscore');

let rankings = [];


//TEAM COLORS FROM jimniels on github, THANKS!
let teamColors = [{
        "name": "Atlanta Hawks",
        "league": "nba",
        "colors": {
            "rgb": ["225 58 62", "196 214 0", "6 25 34"],
            "cmyk": ["0 91 76 6", "29 2 100 0", "30 0 0 100"],
            "pms": ["186", "382", "Black"]
        }
    },
    {
        "name": "Boston Celtics",
        "league": "nba",
        "colors": {
            "rgb": ["0 131 72", "187 151 83", "167 56 50", "250 179 131", "6 25 34"],
            "cmyk": ["100 0 91 27", "30 40 80 0", "40 95 100 0", "0 35 50 0", "30 0 0 100"],
            "pms": ["356", "874", "174", "472", "Black"]
        }
    },
    {
        "name": "Brooklyn Nets",
        "league": "nba",
        "colors": {
            "rgb": ["6 25 34"],
            "cmyk": ["30 0 0 100"],
            "pms": ["Black"]
        }
    },
    {
        "name": "Charlotte Hornets",
        "league": "nba",
        "colors": {
            "rgb": ["29 17 96", "0 140 168", "161 161 164"],
            "cmyk": ["98 100 0 43", "100 0 19 23", "0 1 0 43"],
            "pms": ["275", "3145", "Cool Gray 8"]
        }
    },
    {
        "name": "Chicago Bulls",
        "league": "nba",
        "colors": {
            "rgb": ["206 17 65", "6 25 34"],
            "cmyk": ["0 100 65 15", "30 0 0 100"],
            "pms": ["200", "Black"]
        }
    },
    {
        "name": "Cleveland Cavaliers",
        "league": "nba",
        "colors": {
            "rgb": ["134 0 56", "253 187 48", "0 45 98"],
            "cmyk": ["0 100 34 53", "0 29 91 0", "100 68 54 0"],
            "pms": ["209", "1235", "282"]
        }
    },
    {
        "name": "Dallas Mavericks",
        "league": "nba",
        "colors": {
            "rgb": ["0 125 197", "196 206 211", "6 25 34", "32 56 91"],
            "cmyk": ["100 40 0 0", "5 0 0 20", "30 0 0 100", "94 79 36 32"],
            "pms": ["2935", "877", "Black", "289"]
        }
    },
    {
        "name": "Denver Nuggets",
        "league": "nba",
        "colors": {
            "rgb": ["77 144 205", "253 185 39", "15 88 108"],
            "cmyk": ["69 34 0 0", "0 30 94 0", "100 72 56 0"],
            "pms": ["279", "123", "282"]
        }
    },
    {
        "name": "Detroit Pistons",
        "league": "nba",
        "colors": {
            "rgb": ["237 23 76", "0 107 182", "15 88 108"],
            "cmyk": ["0 100 65 0", "100 56 0 0", "100 72 0 56"],
            "pms": ["199", "293", "282"]
        }
    },
    {
        "name": "Golden State Warriors",
        "league": "nba",
        "colors": {
            "rgb": ["253 185 39", "0 107 182", "38 40 42"],
            "cmyk": ["0 30 94 0", "100 56 0 0", "73 65 62 67"],
            "pms": ["123", "293", "426"]
        }
    },
    {
        "name": "Houston Rockets",
        "league": "nba",
        "colors": {
            "rgb": ["206 17 65", "196 206 211", "6 25 34", "253 185 39"],
            "cmyk": ["100 65 15", "5 0 0 20", "30 0 0 100", "0 30 94 0"],
            "pms": ["200", "877", "Black", "123"]
        }
    },
    {
        "name": "Indiana Pacers",
        "league": "nba",
        "colors": {
            "rgb": ["255 198 51", "0 39 93", "190 192 194"],
            "cmyk": ["0 23 90 0", "100 72 0 56", "0 0 0 29"],
            "pms": ["1235", "282", "Cool Gray 5"]
        }
    },
    {
        "name": "Los Angeles Clippers",
        "league": "nba",
        "colors": {
            "rgb": ["237 23 76", "0 107 182", "6 25 34", "190 192 194"],
            "cmyk": ["0 100 65 0", "100 56 0 0", "30 0 0 100", "0 0 0 29"],
            "pms": ["199", "293", "Black", "Cool Gray 5"]
        }
    },
    {
        "name": "Los Angeles Lakers",
        "league": "nba",
        "colors": {
            "rgb": ["253 185 39", "85 37 130", "6 25 34", "129 119 183"],
            "cmyk": ["0 30 94 0", "79 100 0 12", "30 100 0 0", "54 56 0 0"],
            "pms": ["123", "526", "Black", "265"]
        }
    },
    {
        "name": "Memphis Grizzlies",
        "league": "nba",
        "colors": {
            "rgb": ["15 88 108", "115 153 198", "190 212 233", "253 185 39"],
            "cmyk": ["100 72 0 56", "50 25 0 10", "24 9 2 0", "0 30 94 0"],
            "pms": ["289", "652", "650", "123"]
        }
    },
    {
        "name": "Miami Heat",
        "league": "nba",
        "colors": {
            "rgb": ["152 0 46", "249 160 27", "6 25 34", "188 190 192"],
            "cmyk": ["0 100 61 43", "0 43 100 0", "30 0 0 100", "40 0 0 0"],
            "pms": ["202", "137", "Black", "877"]
        }
    },
    {
        "name": "Milwaukee Bucks",
        "league": "nba",
        "colors": {
            "rgb": ["0 71 27", "240 235 210", "6 25 34", "0 125 197"],
            "cmyk": ["80 0 90 75", "6 9 23 0", "20 20 20 100", "100 45 0 0"],
            "pms": ["350", "468", "Black", "2935"]
        }
    },
    {
        "name": "Minnesota Timberwolves",
        "league": "nba",
        "colors": {
            "rgb": ["0 80 131", "0 169 79", "196 206 211", "255 230 0", "224 58 63", "6 25 34"],
            "cmyk": ["95 45 0 40", "94 0 100 0", "5 0 0 20", "0 5 100 0", "0 91 75 6", "30 0 0 100"],
            "pms": ["647", "355", "877", "012", "186", "Black"]
        }
    },
    {
        "name": "New Orleans Pelicans",
        "league": "nba",
        "colors": {
            "rgb": ["0 43 92", "227 24 55", "180 151 90"],
            "cmyk": ["100 64 0 60", "0 100 81 4", "20 30 70 15"],
            "pms": ["289", "186", "872"]
        }
    },
    {
        "name": "New York Knicks",
        "league": "nba",
        "colors": {
            "rgb": ["0 107 182", "245 132 38", "190 192 194", "35 31 32"],
            "cmyk": ["100 56 0 0", "0 59 96 0", "0 0 0 29", "30 0 0 100"],
            "pms": ["293", "165", "Cool Gray 5", "Black"]
        }
    },
    {
        "name": "Oklahoma City Thunder",
        "league": "nba",
        "colors": {
            "rgb": ["0 125 195", "240 81 51", "253 187 48", "0 45 98"],
            "cmyk": ["89 43 0 0", "0 84 88 0", "0 29 91 0", "100 68 0 54"],
            "pms": ["285C", "1788C", "1235C", "282C"]
        }
    },
    {
        "name": "Orlando Magic",
        "league": "nba",
        "colors": {
            "rgb": ["0 125 197", "196 206 211", "6 25 34"],
            "cmyk": ["100 40 0 0", "5 0 0 20", "30 0 0 100"],
            "pms": ["2935", "877", "Black"]
        }
    },
    {
        "name": "Philadelphia 76ers",
        "league": "nba",
        "colors": {
            "rgb": ["237 23 76", "0 107 182", "0 43 92", "196 206 211"],
            "cmyk": ["0 100 65 0", "100 56 0 0", "100 64 0 60", "5 0 0 20"],
            "pms": ["199", "293", "289", "877"]
        }
    },
    {
        "name": "Phoenix Suns",
        "league": "nba",
        "colors": {
            "rgb": ["229 96 32", "29 17 96", "99 113 122", "249 160 27", "185 89 21", "190 192 194", "6 25 34"],
            "cmyk": ["0 75 100 5", "98 100 0 43", "15 0 0 65", "0 43 100 0", "0 67 100 28", "0 0 0 29", "30 0 0 100"],
            "pms": ["159", "275", "431", "137", "1675", "Cool Gray 5", "Black"]
        }
    },
    {
        "name": "Portland Trail Blazers",
        "league": "nba",
        "colors": {
            "rgb": ["224 58 62", "186 195 201", "6 25 34"],
            "cmyk": ["0 91 76 6", "5 0 0 25", "30 0 0 100"],
            "pms": ["186", "877", "Black"]
        }
    },
    {
        "name": "Sacramento Kings",
        "league": "nba",
        "colors": {
            "rgb": ["114 76 159", "142 144 144", "6 25 34"],
            "cmyk": ["65 82 0 0", "46 37 38 2", "30 0 0 100"],
            "pms": ["266", "877", "Black"]
        }
    },
    {
        "name": "San Antonio Spurs",
        "league": "nba",
        "colors": {
            "rgb": ["186 195 201", "6 25 34"],
            "cmyk": ["5 0 0 25", "30 0 0 100"],
            "pms": ["877", "Black"]
        }
    },
    {
        "name": "Toronto Raptors",
        "league": "nba",
        "colors": {
            "rgb": ["206 17 65", "6 25 34", "161 161 164", "180 151 90"],
            "cmyk": ["0 100 65 15", "30 0 0 100", "0 1 0 43", "20 30 70 15"],
            "pms": ["200", "Black", "Cool Gray 8", "872"]
        }
    },
    {
        "name": "Utah Jazz",
        "league": "nba",
        "colors": {
            "rgb": ["0 43 92", "249 160 27", "0 71 27", "190 192 194"],
            "cmyk": ["100 64 0 60", "0 43 100 0", "80 0 90 75", "0 0 0 29"],
            "pms": ["289", "137", "350", "Cool Gray 5"]
        }
    },
    {
        "name": "Washington Wizards",
        "league": "nba",
        "colors": {
            "rgb": ["0 43 92", "227 24 55", "196 206 212"],
            "cmyk": ["100 64 0 60", "0 100 81 4", "5 0 0 20"],
            "pms": ["289", "186", "877"]
        }
    }
];

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
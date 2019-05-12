var rankings = [];

$.getJSON("resources/data/rankings.json", function(json) {
    rankings = json;
    console.log(rankings[0]);

    for (var i = rankings.length - 1; i >= 0; i--) {
        $("tbody").append("<tr><td><img class=\"team-logo\" src= \"" + rankings[i]['logo'] + "\">" +
            "</td><td>" + rankings[i]['fullName'] +
            "</td><td>" + rankings[i]['wins'] +
            "</td><td>" + rankings[i]['losses'] +
            "</td><td>" + rankings[i]['winRank'] +
            "</td><td>" + rankings[i]['lossRank'] +
            "</td></tr>");
    }
});
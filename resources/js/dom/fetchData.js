var rankings = [];

$.getJSON("resources/data/rankings.json", function(json) {
    rankings = json;
    console.log(rankings[0]);

    $('#table').bootstrapTable({
        url: 'resources/data/rankings.json',
        columns: [{
            field: 'logo',
            title: 'Logo'
        }, {
            field: 'fullName',
            title: 'Name'
        }, {
            field: 'wins',
            title: 'Wins'
        }, {
            field: 'winRank',
            title: 'Wins Rank'
        }, {
            field: 'losses',
            title: 'Losses'
        }, {
            field: 'lossRank',
            title: 'Losses Rank'
        }, {
            field: 'streak',
            title: 'Recent Streak'
        }, {
            field: 'streakRank',
            title: 'Recent Streak Rank'
        }]
    });

    // for (var i = rankings.length - 1; i >= 0; i--) {
    //     $("tbody").append("<tr><td class=\"logo-data\"><img class=\"team-logo\" src= \"" + rankings[i]['logo'] + "\">" +
    //         "</td><td>" + rankings[i]['fullName'] +
    //         "</td><td>" + rankings[i]['wins'] +
    //         "</td><td>" + rankings[i]['winRank'] +
    //         "</td><td>" + rankings[i]['losses'] +
    //         "</td><td>" + rankings[i]['lossRank'] +
    //         "</td><td>" + rankings[i]['streak'] +
    //         "</td><td>" + rankings[i]['streakRank'] +
    //         "</td></tr>");
    // }
});

function imageFormatter(value, row) {
    return '<img class="team-logo" src="' + value + '" />';
}
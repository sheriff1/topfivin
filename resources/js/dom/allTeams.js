var rankings = [];

$.getJSON("resources/data/rankings.json", function(json) {
    rankings = json;
    var columnsForTable = [];

    columnsForTable.push({ field: "logo", title: "Logo" });
    columnsForTable.push({ field: "fullName", title: "Team", sortable: true });
    for (var i = 0; i < rankings[0].data.length; i++) {
        columnsForTable.push({ field: "data." + i + ".value", title: rankings[0].data[i].stat, sortable: true });
        columnsForTable.push({ field: "data." + i + ".rank", title: rankings[0].data[i].stat + " Ranking", sortable: true });
    }

    $('#table').bootstrapTable({
        url: 'resources/data/rankings.json',
        columns: columnsForTable
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
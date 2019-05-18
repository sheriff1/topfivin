var rankings = [];

$.getJSON("resources/data/rankings.json", function(json) {
    rankings = json;
    var columnsForTable = [];

    columnsForTable.push({ field: "logo", title: "" });
    columnsForTable.push({ field: "fullName", title: "Team", sortable: true });
    for (var i = 0; i < rankings[0].data.length; i++) {
        columnsForTable.push({ field: "data." + i + ".value", title: rankings[0].data[i].stat, sortable: true });
        columnsForTable.push({ field: "data." + i + ".rank", title: rankings[0].data[i].stat + " Ranking", sortable: true });
    }

    $('#table').bootstrapTable({
        url: 'resources/data/rankings.json',
        columns: columnsForTable
    });

});

function imageFormatter(value, row) {
    return '<img class="team-logo" src="' + value + '" />';
}
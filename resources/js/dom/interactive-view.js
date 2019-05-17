var rankings = [];
var colors = [];

$.getJSON("resources/data/colors.json", function(json) {
    colors = json;
});

$.getJSON("resources/data/rankingsV2.json", function(json) {
    rankings = json;
    console.log(rankings[0]);

    for (var i = 0; i < rankings.length; i++) {
        var dropdownTeamItem = "<option class=\"dropdown-item\">" + rankings[i]['fullName'] + "</option>";
        $(".dropdown").append(dropdownTeamItem);
    }

    //NAME AND LOGO FOR HERO
    $(".team-select-team-logo").attr("src", rankings[0]['logo']);
    let nameSplit = rankings[0]['fullName'].split(" ");

    if (nameSplit.length == 2) {
        document.getElementsByClassName("city-line")[0].textContent = nameSplit[0];
        document.getElementsByClassName("team-name-line")[0].textContent = nameSplit[1].toUpperCase();
    } else if (nameSplit.length == 3) {
        document.getElementsByClassName("city-line")[0].textContent = nameSplit[0] + " " + nameSplit[1];
        document.getElementsByClassName("team-name-line")[0].textContent = nameSplit[2].toUpperCase();
    }

    //RANKINGS
    var rankToAdd =
        "<tr><th>" +
        rankings[0].data[0].stat.toUpperCase() +
        "</th><th class=\'text-right\'> #" +
        rankings[0].data[0].rank +
        "</th></tr>" +
        "<tr><th >" +
        rankings[0].data[1].stat.toUpperCase() +
        "</th><th class=\'text-right\'> #" +
        rankings[0].data[1].rank +
        "</th></tr>" +
        "<tr><th>" +
        rankings[0].data[2].stat.toUpperCase() +
        "</th><th class=\'text-right\'> #" +
        rankings[0].data[2].rank +
        "</th></tr>";
    $(".rank-listing-data").append(rankToAdd);
});

$(function() {
    $(".dropdown").change(function() {
        //console.log($('option:selected', this).text());

        var nextTeam = _.findWhere(rankings, { fullName: $('option:selected', this).text() });

        //CHANGE TEAM NAME & CITY NAME
        let nameSplit = nextTeam['fullName'].split(" ");

        if (nameSplit.length == 2) {
            document.getElementsByClassName("city-line")[0].textContent = nameSplit[0];
            document.getElementsByClassName("team-name-line")[0].textContent = nameSplit[1].toUpperCase();
        } else if (nameSplit.length == 3) {
            document.getElementsByClassName("city-line")[0].textContent = nameSplit[0] + " " + nameSplit[1];
            document.getElementsByClassName("team-name-line")[0].textContent = nameSplit[2].toUpperCase();
        }

        //CHANGE LOGO
        $(".team-select-team-logo").attr("src", nextTeam['logo']);

        //CHANGE BACKGROUND COLOR
        var nextTeamColor = _.findWhere(colors, { fullName: $('option:selected', this).text() });
        $(".bottom-part").css({ "backgroundColor": nextTeamColor.colors });

        //CHANGE RANK
        $(".rank-listing-data tr").remove();

        var rankToAdd =
            "<tr><th>" +
            nextTeam.data[0].stat.toUpperCase() +
            "</th><th class=\'text-right\'> #" +
            nextTeam.data[0].rank +
            "</th></tr>" +
            "<tr><th >" +
            nextTeam.data[1].stat.toUpperCase() +
            "</th><th class=\'text-right\'> #" +
            nextTeam.data[1].rank +
            "</th></tr>" +
            "<tr><th>" +
            nextTeam.data[2].stat.toUpperCase() +
            "</th><th class=\'text-right\'> #" +
            nextTeam.data[2].rank +
            "</th></tr>";
        $(".rank-listing-data").append(rankToAdd);

    });
});
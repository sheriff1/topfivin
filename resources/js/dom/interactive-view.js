var rankings = [];
var colors = [];

$.getJSON("resources/data/colors.json", function(json) {
    colors = json;
});

$.getJSON("resources/data/rankingsV2.json", function(json) {
    rankings = json;

    rankings = _.sortBy(rankings, 'fullName');

    for (var i = 0; i < rankings.length; i++) {
        var dropdownTeamItem = "<option class=\"dropdown-item\">" + rankings[i]['fullName'] + "</option>";
        $(".dropdown").append(dropdownTeamItem);
    }

    //SORT INITIAL ITEM'S STATISTICS BY RANK
    rankings[0].data = rankings[0].data.sort(function(a, b) {
        return a.rank - b.rank;
    });

    //NAME AND LOGO FOR TEAM SELECT
    $(".team-select-team-logo").attr("src", rankings[0]['logo']);
    let nameSplit = rankings[0]['fullName'].split(" ");

    if (nameSplit.length == 2) {
        document.getElementsByClassName("city-line")[0].textContent = "The " + nameSplit[0];
        document.getElementsByClassName("team-name-line")[0].textContent = nameSplit[1].toUpperCase();
    } else if (nameSplit.length == 3) {
        document.getElementsByClassName("city-line")[0].textContent = "The " + nameSplit[0] + " " + nameSplit[1];
        document.getElementsByClassName("team-name-line")[0].textContent = nameSplit[2].toUpperCase();
    }

    for (var x = 0; x < rankings[0].data.length; x++) {
        var rankToAdd =
            "<tr><th>" +
            rankings[0].data[x].stat.toUpperCase() +
            "</th><th class=\'text-right\'> #" +
            rankings[0].data[x].rank +
            "</th></tr>";
        $(".rank-listing-data").append(rankToAdd);
    }
});

$(function() {
    $(".dropdown").change(function() {

        var nextTeam = _.findWhere(rankings, { fullName: $('option:selected', this).text() });

        //SORT NEXT TEAM'S STATISTICS BY RANK
        nextTeam.data = nextTeam.data.sort(function(a, b) {
            return a.rank - b.rank;
        });

        //CHANGE TEAM NAME & CITY NAME
        let nameSplit = nextTeam['fullName'].split(" ");

        if (nameSplit.length == 2) {
            document.getElementsByClassName("city-line")[0].textContent = "The " + nameSplit[0];
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

        for (var x = 0; x < nextTeam.data.length; x++) {
            var rankToAdd =
                "<tr><th>" +
                nextTeam.data[x].stat.toUpperCase() +
                "</th><th class=\'text-right\'> #" +
                nextTeam.data[x].rank +
                "</th></tr>";
            $(".rank-listing-data").append(rankToAdd);
        }
    });
});
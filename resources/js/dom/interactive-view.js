var rankings = [];

$.getJSON("resources/data/rankingsV2.json", function(json) {
    rankings = json;
    console.log(rankings[0]);

    //NAME AND LOGO FOR HERO
    $(".team-select-team-logo").attr("src", rankings[0]['logo']);
    let nameSplit = rankings[0]['fullName'].split(" ");
    console.log(nameSplit.length);
    if (nameSplit.length == 2) {
        document.getElementsByClassName("city-line")[0].textContent = nameSplit[0];
        document.getElementsByClassName("team-name-line")[0].textContent = nameSplit[1];
    } else if (nameSplit.length == 3) {
        document.getElementsByClassName("city-line")[0].textContent = nameSplit[0] + " " + nameSplit[1];
        document.getElementsByClassName("team-name-line")[0].textContent = nameSplit[2];
    }

    //RANKINGS


});
var unirest = require('unirest');

testStoreArray = [];

for (var i = 4399 ; i <= 4401; i++) {
	unirest.get("https://api-nba-v1.p.rapidapi.com/gameDetails/" + i)
	.header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
	.header("X-RapidAPI-Key", "13bddf6d9fmsh46f9643a34ba3a1p1d3dd1jsn83317f761bc8")
	.end(function (result, pushToArray) {
	  console.log(result.status, result.headers, result.body.api.game[0].arena, result.body.api.game[0].vTeam.fullName);
	  testStoreArray.push(result.body.api.game[0].arena);
	  console.log(testStoreArray);
	});
}
'use strict';


let games = {
  221380: 'Age of Empires 2 (2013)',
  1017900: 'Age of Empires: Definitive Edition',
  //813780: 'Age of Empires 2: Definitive Edition',
  459220: 'Halo Wars Definitive Edition',
  105450: 'Age of Empires 3',
  281610: 'Homeworld: Deserts of Kharak',
  311290: 'Spellforce 3',
  9450: 'Dawn of War: Soulstorm',
  15620: 'Dawn of War 2',
  285190: 'Dawn of War 3',
  228200: 'Company of Heroes',
  231430: 'Company of Heroes 2',
  290790: 'Grey Goo',
  333420: 'Cossacks 3',
  9420: 'Supreme Commander: Forged Alliance',
  40100: 'Supreme Commander 2',
  386070: 'Planetary Annihilation: Titans',
  244160: 'Homeworld: Remastered Collection',
}

let gameDeets = [];


//add displayResults function to append <li>s into #results-list
function displayResults() {
  //empty results list for each refresh
  $('#results-list').empty();

  //for loop to create the proper number of <li>
  for (let i=0; i < gameDeets.length; i++){
    $('#results-list').append(
      `<li><h3>${gameDeets[i].name} - 
      ${gameDeets[i].playercount} active players</h3</li>`
    );
  }
}

//funtion to refresh DOM and rerun displayResults
function watchRefresh() {
  $('.refresh').click(function(event) {
    gameDeets = [];
    getStats();

  });

}

function addData(id, playercount) {
  let deet = {
    id: id,
    name: games[id],
    playercount: playercount
  };
  gameDeets.push(deet);
  gameDeets.sort(function(game1, game2) {
    return game2.playercount - game1.playercount;
  });

  displayResults();
}

function getPlayerCount(id) {

  const url = "https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=" + id + "&format=json";
  
  fetch(url)
      .then(response => response.json())
      .then(gameData => addData(id, gameData.response.player_count))
      .catch(function(error) {
  console.log('There has been a problem with your fetch operation: ', error.message);
      })

  }

function getStats() {
  var size = Object.keys(games).length;

  for (let i=0; i < size; i++) {
    let id = Object.keys(games)[i]
    getPlayerCount(id);
  }
}

$(watchRefresh());
$(getStats());


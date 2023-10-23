const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')

const getPlayerStatistics = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    throw new APIError("Error!", 400);
  }
};

const savePlayerStatistics = async (req, res) => {
  try {
    let id = req.query.id;
    let season = req.query.season;
    var getPlayerStatistics = config.AXIOS_CONFIG;
    getPlayerStatistics.url = config.AXIOS_URL+"players";
    getPlayerStatistics.params=req.query;
    const playerStatistics = await axios(getPlayerStatistics);
    console.log(JSON.stringify(playerStatistics.data.response))
    mappedData = await playerStatistics.data.response.map((item) => {
      let data = {
        general_player_statistic:{
        id : item.player.id,
        name: item.player.name,
        first_name: item.player.firstname,
        last_name: item.player.lastname,
        age: item.player.age,
        nationality:item.player.nationality,
        height:item.player.height,
        weight:item.player.weight,
        injured:item.statistics.injured,
        photo:item.player.photo
      },
      teams:{
        id:item.statistics.team.id,
        name:item.statistics.team.name,
        logo:item.statistics.team.logo
      },
      game_info:{
        appearances:item.statistics.games.appearences,
        lineups:item.statistics.games.lineups,
        minutes:item.statistics.games.minutes_played,
        number:item.statistics.games.number,
        position:item.statistics.games.position,
        rating:item.statistics.games.rating,
        captain:item.statistics.games.captain,
        subbed_in:item.statistics.games.substitutes.in,
        subbed_out:item.statistics.games.substitutes.out,
        bench:item.statistics.games.substitutes.bench
      },
      shots:{
        total:item.statistics.shots.total,
        on:item.statistics.shots.on
      },
      goals:{
        total:item.statistics.goals.total,
        conceded:item.statistics.goals.conceded,
        assists:item.statistics.goals.assists,
        saves:item.statistics.goals.saves
      },
      passes:{
        total:item.statistics.passes.total,
        key:item.statistics.passes.key,
        accuracy:item.statistics.passes.accuracy
      },
      tackles:{
        total:item.statistics.tackles.total,
        blocks:item.statistics.tackles.blocks,
        interceptions:item.statistics.tackles.interceptions
      },
      duels:{
        total:item.statistics.duels.total,
        won:item.statistics.duels.won
      },
      dribbles:{
        attempts:item.statistics.dribbles.attempts,
        success:item.statistics.dribbles.success
      },
      fouls:{
        drawn:item.statistics.fouls.drawn,
        committed:item.statistics.fouls.committed
      },
      cards:{
        yellow:item.statistics.cards.yellow,
        yellowred:item.statistics.cards.yellowred,
        red:item.statistics.cards.red
      },
      penalty:{
        won:item.statistics.penalty.won,
        commited:item.statistics.penalty.commited,
        scored:item.statistics.penalty.scored,
        missed:item.statistics.penalty.missed,
        saved:item.statistics.penalty.saved
      }
      }
      return data; 
    });
    console.log(mappedData);
  } catch (error) {
    console.log(error);
    throw new APIError(error, 400);
  }
};


const updatePlayerStatistics = async (req, res) => {
 
};

module.exports = {
  getPlayerStatistics,
  updatePlayerStatistics,
  savePlayerStatistics
};

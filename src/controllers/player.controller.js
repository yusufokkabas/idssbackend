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
function sumPropertiesOfObjects(arr, propertyNames) {
  const sums = {};
  
  propertyNames.forEach(propertyName => {
    sums[propertyName] = arr.reduce((accumulator, currentValue) => accumulator + currentValue[propertyName], 0);
  });
  
  return sums;
}

const savePlayerStatistics = async (req, res) => {
  try {
    let id = req.query.id;
    let season = req.query.season;
    var getPlayerStatistics = config.AXIOS_CONFIG;
    getPlayerStatistics.url = config.AXIOS_URL+"players";
    getPlayerStatistics.params=req.query;
    const playerStatistics = await axios(getPlayerStatistics);
    mappedData = await playerStatistics.data.response.map((item) => {
      let statisticsData = {
        teams: {},
        game_info: {},
        games: {},
        shots: {},
        goals: {},
        passes: {},
        tackles: {},
        duels: {},
        dribbles: {},
        fouls: {},
        cards: {},
        penalty: {}
      };
      statisticsData.teams.id = item.statistics[0].team.id;
      statisticsData.teams.name = item.statistics[0].team.name;
      statisticsData.teams.logo = item.statistics[0].team.logo;
      statisticsData.game_info.position = item.statistics[0].games.position;
      statisticsData.game_info.number = item.statistics[0].games.number;
      statisticsData.game_info.captain = item.statistics[0].games.captain;
      let ratingTotal=0;
      item.statistics.forEach((element) => {
       let rating = parseInt(element.games.rating);
       ratingTotal=ratingTotal+rating;
      });
      let avgRating = ratingTotal/item.statistics.length;
      statisticsData.game_info.rating = avgRating;
      sumElements = ['games.appearences','games.lineups','games.minutes','substitutes.in','substitutes.out','substitutes.bench','shots.total','shots.on','goals.total','goals.conceded','goals.assists','goals.saves','passes.total','passes.key','passes.accuracy','tackles.total','tackles.blocks','tackles.interceptions','duels.total','duels.won','dribbles.attempts','dribbles.success','fouls.drawn','fouls.committed','cards.yellow','cards.yellowred','cards.red','penalty.won','penalty.commited','penalty.scored','penalty.missed','penalty.saved'];
      sumElements = sumElements.map((item) => {
        return item.split('.');
      });
      sumElements.forEach(element => {
        statisticsData[element[0]][element[1]] = item.statistics.reduce((a, b, index) => {
          return a + (b[element[0]][element[1]] || 0);
        }, 0);
      });
      return statisticsData; 
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

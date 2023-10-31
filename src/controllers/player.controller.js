const Response = require("../utils/response");
const Sequelize = require("sequelize");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const sequelizeConfig = require("../../config/config.json");
const db = require("../../models");
const sequelize = new Sequelize({
  dialect: sequelizeConfig.development.dialect,
  host: sequelizeConfig.development.host,
  username: sequelizeConfig.development.username,
  password: sequelizeConfig.development.password,
  database: sequelizeConfig.development.database,
});

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
        general_player_statistics: {
          id: item.player.id,
          name: item.player.name,
          season: season,
          first_name: item.player.firstname,
          last_name: item.player.lastname,
          age: item.player.age,
          nationality: item.player.nationality,
          height: item.player.height,
          weight: item.player.weight,
          injured: item.player.injured,
          photo: item.player.photo
        },
        teams: {},
        games: {},
        shots: {},
        goals: {},
        passes: {},
        tackles: {},
        duels: {},
        dribbles: {},
        fouls: {},
        cards: {},
        penalty: {},
        substitutes: {}
      };
      statisticsData.teams.id = item.statistics[0].team.team_id;
      statisticsData.teams.name = item.statistics[0].team.name;
      statisticsData.teams.logo = item.statistics[0].team.logo;
      statisticsData.games.position = item.statistics[0].games.position;
      statisticsData.games.number = item.statistics[0].games.number;
      statisticsData.games.captain = item.statistics[0].games.captain;
      let ratingTotal=0;
      let count=0;
      item.statistics.forEach((element) => {
       if(element.games.rating!=null){
        let rating = parseFloat(element.games.rating);
        ratingTotal=ratingTotal+rating;
        count++;
       }    
      });
      let avgRating = ratingTotal/count;
      statisticsData.games.rating = avgRating;
      sumElements = ['games.appearences','games.lineups','games.minutes','substitutes.in','substitutes.out','substitutes.bench','shots.total','shots.on','goals.total','goals.conceded','goals.assists','goals.saves','passes.total','passes.key','passes.accuracy','tackles.total','tackles.blocks','tackles.interceptions','duels.total','duels.won','dribbles.attempts','dribbles.success','fouls.drawn','fouls.committed','cards.yellow','cards.yellowred','cards.red','penalty.won','penalty.committed','penalty.scored','penalty.missed','penalty.saved'];
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
    const bulkInsertResult = await mappedData.forEach(async (element) => {
      const result = await sequelize.transaction(async () => {
        const cards = await db.card.create(element.cards);
        const dribbles = await db.dribble.create(element.dribbles);
        const duels = await db.duel.create(element.duels);
        const fouls = await db.foul.create(element.fouls);
        const game_infos = await db.game_info.create(element.games);
        const goals = await db.goal.create(element.goals);
        const passes = await db.pass.create(element.passes);
        const penalty = await db.penalty.create(element.penalty);
        const shots = await db.shot.create(element.shots);
        const tackles = await db.tackle.create(element.tackles);
        const teams = await db.team.create(element.teams);
        const substitutes = await db.substitute.create(element.substitutes);
        let player_statistics_by_seasons = {
          shots_id: shots.id,
          goals_id: goals.id,
          passes_id: passes.id,
          tackles_id: tackles.id,
          duels_id: duels.id,
          dribbles_id: dribbles.id,
          fouls_id: fouls.id,
          cards_id: cards.id,
          penalties_id: penalty.id,
          substitutes_id: substitutes.id,
          game_infos_id: game_infos.id,
          teams_id: teams.id,
        };
        const player_statistics_by_season = await db.player_statistics_by_season.create(player_statistics_by_seasons);
        let general_player_statistics_data =  element.general_player_statistics;
        general_player_statistics_data.statistics_id = player_statistics_by_season.id;
        const general_player_statistics = await db.general_player_statistic.create(general_player_statistics_data);
        return general_player_statistics;
      });
      return result;
    });
    return new Response(bulkInsertResult).success(res);
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

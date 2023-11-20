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
const csvtojson = require('csvtojson');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

function getPlayerMarketValue(player){
  return new Promise((resolve, reject) => {
    const csvFilePath = path.resolve(__dirname, 'valuations.csv');
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        const playerData = results.filter((item) => {
          if(item.name==player.name&&item.date.includes(player.season)){
            return true;
          }
          else if(item.first_name==player.first_name && item.last_name==player.last_name&&item.date.includes(player.season)){
            return true;
          }
          else if(item.first_name+" "+item.last_name==player.name&&item.date.includes(player.season)){
            return true;
          }
          else if(player.name.includes(".")){
              let name = player.name.split(".");
              name[1] = name[1].toString().trimStart();
              let firstname= item.first_name.toString().toUpperCase();
              if(firstname.startsWith(name[0]) && item.last_name==name[1]&&item.date.includes(player.season)){
                return true;
              }      
          }
          else{
            return false;
          }
        });
        let playerMarketValue = null;
        monthOrder = ["06","07","08","09","05","04","03","10","11","02","01","12"];
        for(j=0;j<monthOrder.length;j++){
        let month = monthOrder[j];
        for(i=0;i<playerData.length;i++){
          let item = playerData[i];
          if(item.date.includes(month)){
            playerMarketValue = item;
            resolve(playerMarketValue);
          }        
        }       
        }
        reject({});
      })
      .on('error', reject);
  });
}

const getPlayerStatistics = async (req, res,next) => {
  try {
    const { queryBuilder } = req;
    const excludedFields = ['createdAt', 'updatedAt','id'];
    const playerStatistics = await db.general_player_statistic.findAll({
      where:  queryBuilder.filters,
      attributes:{exclude: ['statistics_id','createdAt', 'updatedAt']},
      include: [
        {
          model: db.player_statistics_by_season,
          as: 'statistics',
          attributes: ['createdAt', 'updatedAt'],
          include: [
            {
              model: db.game_info,
              as: 'game_infos',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.duel,
              as: 'duels',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.foul,
              as: 'fouls',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.card,
              as: 'cards',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.dribble,
              as: 'dribbles',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.goal,
              as: 'goals',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.pass,
              as: 'passes',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.penalty,
              as: 'penalties',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.shot,
              as: 'shots',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.substitute,
              as: 'substitutes',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.tackle,
              as: 'tackles',
              attributes:{exclude: excludedFields},
            },
            {
              model: db.team,
              as: 'teams',
              attributes:{exclude: excludedFields},
            }
          ],
        },
        
      ],
    });
    if (!playerStatistics) {
      return res.status(404).json({ error: 'Player statistics not found' });
    }

    return new Response(playerStatistics).success(res);
  } catch (error) {
    console.error(error);
    throw new APIError(error, 400);
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
    console.log(playerStatistics)
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
      statisticsData.teams.team_id = item.statistics[0].team.id;
      statisticsData.teams.name = item.statistics[0].team.name;
      statisticsData.teams.logo = item.statistics[0].team.logo;
      statisticsData.games.position = item.statistics[0].games.position;
      statisticsData.games.number = item.statistics[0].games.number;
      statisticsData.games.captain = item.statistics[0].games.captain;
      let ratingTotal=0;
      let count=0;
      // item.statistics.forEach((element) => {
      //  if(element.games.rating!=null){
      //   let rating = parseFloat(parseFloat(element.games.rating).toFixed(3));
      //   ratingTotal=ratingTotal+rating;
      //   count++;
      //  }    
      // });
      for(i=0;i<item.statistics.length;i++){
        if(item.statistics[i].games.rating!=null){
          let rating = parseFloat(parseFloat(item.statistics[i].games.rating).toFixed(3));
          ratingTotal=ratingTotal+rating;
          count++;
        }
      }
      let avgRating = ratingTotal/count;
      avgRating = parseFloat(avgRating.toFixed(3));
      if(!isNaN(avgRating)){
      statisticsData.games.rating = avgRating;
      }
      else{
        statisticsData.games.rating = 0;
      }
      console.log(statisticsData.games.rating,statisticsData.general_player_statistics.name);
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
    var bulkInsertResult = [];
    for(i=0;i<mappedData.length;i++){
        const element = mappedData[i];
        try {
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
            const marketValue= await getPlayerMarketValue(general_player_statistics_data);
            console.log("market Value",marketValue)
            if(marketValue!=null&&marketValue.date!=null){
              general_player_statistics_data.market_value_in_eur = marketValue.market_value_in_eur;
              general_player_statistics_data.market_value_date = marketValue.date;
            }
            else{
              general_player_statistics_data.market_value_in_eur = null;
              general_player_statistics_data.market_value_date = null;
            }
            general_player_statistics_data.statistics_id = player_statistics_by_season.id;
            const general_player_statistics = await db.general_player_statistic.create(general_player_statistics_data);
            return general_player_statistics;
            });
        bulkInsertResult.push(result);
        } catch (error) {
          console.log(error)
          if(error.name != 'SequelizeUniqueConstraintError'){
            throw new APIError(error, 400);
          }        
        }
    }
    return new Response(bulkInsertResult).success(res);
  } catch (error) {
    if(error.name != 'SequelizeUniqueConstraintError'){
      throw new APIError(error, 400);
    } 
  }
};


const updatePlayerStatistics = async (req, res) => {
  let data = {
    name: "P. Kimpembe",
    first_name: null,
    last_name: null,
    season:"2021"
  }
  const result = await getPlayerMarketValue(data);
  console.log("result",result);
};

module.exports = {
  getPlayerStatistics,
  updatePlayerStatistics,
  savePlayerStatistics
};

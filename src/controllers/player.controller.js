const Response = require("../utils/response");
const Sequelize = require("sequelize");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const sequelizeConfig = require("../../config/config.json");
const db = require("../../models");
const { Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: sequelizeConfig.development.dialect,
  host: sequelizeConfig.development.host,
  username: sequelizeConfig.development.username,
  password: sequelizeConfig.development.password,
  database: sequelizeConfig.development.database,
  logging: console.log
});
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
/*

filtreler için group bylanması gereken alanlar;
1. mevki //done
2. lig //done
3. ülke //done
4. takım  //done

bir de sayısal veriler için greater than equal than(queryBuilderla oynaman lazım). //done
account get //done
change password //done
mail verification //done

*/
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
        for(let j=0;j<monthOrder.length;j++){
        let month = monthOrder[j];
        for(let i=0;i<playerData.length;i++){
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
    const groupBy = queryBuilder.group;
    console.log("qb",queryBuilder)
    const excludedFields = {exclude:['createdAt', 'updatedAt','id']};
    let options = {
      where:  queryBuilder.filters,
      attributes:groupBy?groupBy.general?groupBy.general:[]:{exclude: ['statistics_id','createdAt', 'updatedAt']},
      include: [
        {
          model: db.player_statistics_by_season,
          as: 'statistics',
          attributes: groupBy?[]:['createdAt', 'updatedAt'],
          include: [
            {
              model: db.game_info,
              as: 'game_infos',
              attributes:groupBy?groupBy.game_infos?groupBy.game_infos:[]:excludedFields,
            },
            {
              model: db.duel,
              as: 'duels',
              attributes:groupBy?groupBy.duels?groupBy.duels:[]:excludedFields,
            },
            {
              model: db.foul,
              as: 'fouls',
              attributes:groupBy?groupBy.fouls?groupBy.fouls:[]:excludedFields,
            },
            {
              model: db.card,
              as: 'cards',
              attributes:groupBy?groupBy.cards?groupBy.cards:[]:excludedFields,
            },
            {
              model: db.dribble,
              as: 'dribbles',
              attributes:groupBy?groupBy.dribbles?groupBy.dribbles:[]:excludedFields,
            },
            {
              model: db.goal,
              as: 'goals',
              attributes:groupBy?groupBy.goals?groupBy.goals:[]:excludedFields,
            },
            {
              model: db.pass,
              as: 'passes',
              attributes:groupBy?groupBy.passes?groupBy.passes:[]:excludedFields,
            },
            {
              model: db.penalty,
              as: 'penalties',
              attributes:groupBy?groupBy.penalties?groupBy.penalties:[]:excludedFields,
            },
            {
              model: db.shot,
              as: 'shots',
              attributes:groupBy?groupBy.shots?groupBy.shots:[]:excludedFields,
            },
            {
              model: db.substitute,
              as: 'substitutes',
              attributes:groupBy?groupBy.substitutes?groupBy.substitutes:[]:excludedFields,
            },
            {
              model: db.tackle,
              as: 'tackles',
              attributes:groupBy?groupBy.tackles?groupBy.tackles:[]:excludedFields,
            },
            {
              model: db.team,
              as: 'teams',
              attributes:groupBy?groupBy.teams?groupBy.teams:[]:excludedFields,
              include: [
                {
                  model: db.general_team_info,
                  as: 'generalTeamInfo',
                  attributes:groupBy?groupBy.generalTeamInfo?groupBy.generalTeamInfo:[]:excludedFields,
                },
              ],
            }
          ],
        },
        
      ],
      group:groupBy?.groupby?groupBy.groupby:null,
    };
    if(queryBuilder.limit){
      options.limit = queryBuilder.limit;
    }
    if(queryBuilder.offset){
      options.offset = queryBuilder.offset;
    }
    const playerStatistics = await db.general_player_statistic.findAll(options);
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
    let totalData=0;
    let insertedData=0;
    let notInsertedData=0;
    let playerStatistics = await axios(getPlayerStatistics);
    for(let m=0;m<playerStatistics.data.paging.total;m++){
    let mappedData = await playerStatistics.data.response.map((item) => {
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
      for(let i=0;i<item.statistics.length;i++){
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
    
    for(let i=0;i<mappedData.length;i++){
        const element = mappedData[i];
        try {
          transaction = await sequelize.transaction();
          const result = await sequelize.transaction(async (t) => {
            const options = { transaction: t };
            const cards = await db.card.create(element.cards,options);
            const dribbles = await db.dribble.create(element.dribbles,options);
            const duels = await db.duel.create(element.duels,options);
            const fouls = await db.foul.create(element.fouls,options);
            const game_infos = await db.game_info.create(element.games,options);
            const goals = await db.goal.create(element.goals,options);
            const passes = await db.pass.create(element.passes,options);
            const penalty = await db.penalty.create(element.penalty,options);
            const shots = await db.shot.create(element.shots,options);
            const tackles = await db.tackle.create(element.tackles,options);
            const teams = await db.team.create(element.teams,options);
            const substitutes = await db.substitute.create(element.substitutes,options);
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
            console.log(player_statistics_by_seasons)
            const player_statistics_by_season = await db.player_statistics_by_season.create(player_statistics_by_seasons,options);
            let general_player_statistics_data =  element.general_player_statistics;
            const marketValue= await getPlayerMarketValue(general_player_statistics_data);
            console.log("market Value",marketValue)
            if(marketValue!=null&&marketValue.date!=null){
              general_player_statistics_data.market_value_in_eur = marketValue.market_value_in_eur;
              general_player_statistics_data.market_value_date = marketValue.date;
            }
            general_player_statistics_data.statistics_id = player_statistics_by_season.id;
            const general_player_statistics = await db.general_player_statistic.create(general_player_statistics_data,options);
            return general_player_statistics;
            });
            await transaction.commit();
        totalData++;
        insertedData++;
        } catch (error) {
          totalData++;
          notInsertedData++;
          if (transaction) await transaction.rollback();
          if(error.name != 'SequelizeUniqueConstraintError'){
            if (Object.keys(error).length !== 0) {          
            throw new APIError(error, 400);          
            }
          }    
        }
    }
    console.log("paging",playerStatistics.data.paging);
    if(playerStatistics.data.paging.total>playerStatistics.data.paging.current){
      getPlayerStatistics.params.page=playerStatistics.data.paging.current+1;
      console.log("page",getPlayerStatistics.params.page)
      playerStatistics = await axios(getPlayerStatistics);
    }
    else{
      console.log({
        "Total Data":totalData,
        "Inserted Data":insertedData,
        "Not Inserted Data":notInsertedData
      });
      return new Response({
        "Total Data":totalData,
        "Inserted Data":insertedData,
        "Not Inserted Data":notInsertedData
    }).success(res);
    }
    }
    
  } catch (error) {
    if(error.name != 'SequelizeUniqueConstraintError'){
      if (Object.keys(error).length !== 0) {
      throw new APIError(error, 400);
      }
    } 
  }
};


const updatePlayerStatistics = async (req, res) => {
  
  
};

module.exports = {
  getPlayerStatistics,
  updatePlayerStatistics,
  savePlayerStatistics
};

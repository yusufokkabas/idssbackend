const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const db = require("../../models");
const model_metrics = db.model_metrics;
const prediction_results = db.prediction_results;
const { Op } = require("sequelize");
const sequelizeConfig = require("../../config/config.json");
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: sequelizeConfig.development.dialect,
  host: sequelizeConfig.development.host,
  username: sequelizeConfig.development.username,
  password: sequelizeConfig.development.password,
  database: sequelizeConfig.development.database,
  logging: console.log
});
const getPlayerPrediction = async (req, res) => {  
  try {
    const id = req.query.id;
    var options = {
      type: sequelize.QueryTypes.SELECT
    };
    let query = `
      SELECT *
      FROM prediction_results pr
      INNER JOIN general_player_statistics gps
      ON pr.name = gps.name
    `;
    if(id){
      query += 'WHERE gps.id = :id order by pr.prediction_model asc';
      options.replacements = { id: id };
    }
    const results = await sequelize.query(query, options);
    if (!results) {
      return res.status(404).json({ error: 'Player statistics not found' });
    }
    return new Response(results).success(res);
} catch (error) {
    console.error(error);
    throw new APIError(error, 400);
}

  };
  

const getModelMetrics = async (req, res) => {
    try {
        const { queryBuilder } = req;
        const options = {
          where:  queryBuilder.filters      
        };
        const results = await model_metrics.findAll(options);
        if (!results) {
          return res.status(404).json({ error: 'Player statistics not found' });
        }
        return new Response(results).success(res);
      } catch (error) {
        console.error(error);
        throw new APIError(error, 400);
      }

};



module.exports = {
  getPlayerPrediction,
    getModelMetrics,
};

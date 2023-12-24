const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const db = require("../../models");
const model_metrics = db.model_metrics;
const prediction_results = db.prediction_results;
const { Op } = require("sequelize");
const getPlayerPrediction = async (req, res) => {  
    try {
        const { queryBuilder } = req;
        const options = {
          where:  queryBuilder.filters      
        };
        const results = await prediction_results.findAll(options);
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

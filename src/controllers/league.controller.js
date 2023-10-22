const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const db = require('../../models');
const league = db.general_league_info;
const saveLeague = async (req, res) => {  
  try {
    var getLeague = config.AXIOS_CONFIG;
    getLeague.url = config.AXIOS_URL+"leagues";
    getLeague.params=req.query;
    const leagueInfo = await axios(getLeague)
    const mappedData = await leagueInfo.data.response.map((item) => {
      var saveObject = {
        id: item.league.id,
        name: item.league.name,
        type: item.league.type,
        logo: item.league.logo,
        country: item.country.name,
        country_code: item.country.code,
        country_flag: item.country.flag,
      };
      return saveObject
    });
    console.log(mappedData);
    const result = await league.bulkCreate(mappedData)
    .then(function(data){ 
      return new Response(`Successfully inserted ${data.length} records.`).success(res); 
    })
  }
  catch (error) {
    throw new APIError(error, 400);
  };
}

const getLeague = async (req, res) => {
  //TODO: write this function to get leagues by all the filters
  try {
    const { id } = req.query;
    const leagueInfo = await league.findOne({where: {id:id}});
    return new Response(leagueInfo).success(res); 
  } catch (error) {
    console.log(error);
    throw new APIError(error, 400);
  }
};


const updateLeague = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, type, logo, country, country_code, country_flag } = req.body;
    const leagueInfo = await league.update({name:name, type:type, logo:logo, country:country, country_code:country_code, country_flag:country_flag}, {where: {id:id}});
    return new Response(leagueInfo).success(res); 
  } catch (error) {
    console.log(error);
    throw new APIError(error, 400);
  }
};

module.exports = {
  saveLeague,
  getLeague,
  updateLeague
};

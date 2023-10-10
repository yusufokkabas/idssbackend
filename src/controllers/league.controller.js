const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const knex = require('knex')(config.db);

// const User = require("../models/user.model");
// const Company = require("../models/playerStatistics.model");
// const CompanyInviteReq = require("../models/companyInviteReq.modal");
const saveLeague = async (req, res) => {  
    var getLeague = config.axiosConfig;
    getLeague.url = config.axiosUrl+"leagues";
    getLeague.params=req.query;
    axios(getLeague)
    .then(function (response) {
    mappedData = response.data.response.map((item) => {
      var saveObject = {
        id: item.league.id,
        name: item.league.name,
        type: item.league.type,
        logo: item.league.logo,
        country: item.country.name,
        country_code: item.country.code,
        country_flag: item.country.flag
      };
      return saveObject
    });
    console.log(mappedData)
    knex('general_league_info')
    .insert(mappedData).returning('*')
    .then((ids) => {
    console.log(`Inserted ${ids.length} leagues`);
    console.log(ids);
    return new Response(ids).success(res);
    })
    .catch((error) => {
    console.error('Error inserting teams:', error);
    throw new APIError("Error!", 400);
    })
    })
   .catch(function (error) {
    console.log(error);
    throw new APIError("Error!", 400);
   });
  
  
  };
  

const getLeague = async (req, res) => {
  try {
    knex('general_league_info').where(req.query)
    .select('*')
    .then((leagues) => {
      return res.json(leagues);
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    })  
  } catch (error) {
    console.log(error);
    throw new APIError("Error!", 400);
  }
};


const updateLeague = async (req, res) => {
//   try {
//     const { companyInviteId, status } = req.body;
//     const companyInvite = await CompanyInviteReq.findByIdAndUpdate(
//       companyInviteId,
//       {
//         $set: { status: status },
//       },
//       { new: true }
//     );
//     if (companyInvite && status === "accepted") {
//       const company = await Company.findById(companyInvite.companyId);
//       company.employees.push(companyInvite.receiverId);
//       await company.save();
//     }

//     return new Response(companyInvite).success(res);
//   } catch (error) {
//     throw new APIError("Error!", 400);
//   }
};

module.exports = {
  saveLeague,
  getLeague,
  updateLeague
};

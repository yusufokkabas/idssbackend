const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const knex = require('knex')(config.db);

// const User = require("../models/user.model");
// const Company = require("../models/playerStatistics.model");
// const CompanyInviteReq = require("../models/companyInviteReq.modal");
const saveTeams = async (req, res) => {  
    var getTeams = config.axiosConfig;
    getTeams.url = config.axiosUrl+"teams";
    getTeams.params=req.query;
    console.log(getTeams)
    axios(getTeams)
    .then(function (response) {
    console.log(response)
    mappedData = response.data.response.map((item) => {
      return item.team
    });
    knex('general_team_info')
    .insert(mappedData)
    .then((ids) => {
    console.log(`Inserted ${ids.length} teams`);
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
  

const getTeams = async (req, res) => {
  try {
    knex('general_team_info').where(req.query)
    .select('*')
    .then((teams) => {
      return res.json(teams);
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


const updateTeams = async (req, res) => {
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
  getTeams,
  updateTeams,
  saveTeams
};

const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const db = require("../../models");
const team = db.general_team_info;


const saveTeams = async (req, res) => {  
  try {
    var getTeams = config.AXIOS_CONFIG;
    getTeams.url = config.AXIOS_URL+"teams";
    getTeams.params=req.query;
    const teamInfo = await axios(getTeams);
    mappedData = teamInfo.data.response.map((item) => {
      item.team.league_id = req.query.league;
      return item.team
    });
    const result = await team.bulkCreate(mappedData)
    .then(function(data){ 
      return new Response(`Successfully inserted ${data.length} records.`).success(res); 
    })
  } catch (error) {
    throw new APIError(error, 400);
  }
  };
  

const getTeams = async (req, res) => {
   //TODO: write this function to get teams by all the filters

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

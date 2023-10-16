const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const config = require('config')
const knex = require('knex')(config.db)


// const User = require("../models/user.model");
// const Company = require("../models/playerStatistics.model");
// const CompanyInviteReq = require("../models/companyInviteReq.modal");

const getPlayerStatistics = async (req, res) => {
  try {

    
    // const email = req.body.email;
    // const user = req.user;
    // const tempUser = await User.findOne({ email: email });
    // const company = await Company.findOne({ ownerId: user._id });
    // const companyRequest = CompanyInviteReq({
    //   senderId: user._id,
    //   companyId: company._id,
    //   receiverId: tempUser._id,
    //   status: "pending",
    // });
    // await companyRequest.save();
    knex('cards')
    .select('*')
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
      fs.writeFile(filePath, jsonString, (err) => {
  if (err) {
    console.error("Error saving JSON data:", err);
  } else {
    console.log("JSON data saved to data.json");
  }
});
    })
    
  } catch (error) {
    console.log(error);
    throw new APIError("Error!", 400);
  }
  //console.log("EndPoint works!!")
};

const savePlayerStatistics = async (req, res) => {
  let getPlayers=config.axiosConfig;
  getPlayers.url=config.axiosUrl+"players"
  getPlayers.params=req.query;
    axios(getPlayers)
    .then(function (response) {
   console.log(response.data)
   var cardsInfo={};
   var dribblesInfo={};
   var foulsInfo={};
   var gameInfo={};
   var goalsInfo={};
   var passesInfo={};
   var penaltiesInfo={};
   var shotsInfo={};
   var tacklesInfo={};
   var teamsInfo={};
   var cardsInfo={};

   for (let index = 0; index < response.data.response.length; index++) {
    const element = array[index];
    
   }
    // mappedData = response.data.response.map((item) => {
    //   return item.team
    // });
    // knex('general_team_info')
    // .insert(mappedData)
    // .then((ids) => {
    // console.log(`Inserted ${ids.length} teams`);
    // return new Response(ids).success(res);
    // })
    // .catch((error) => {
    // console.error('Error inserting teams:', error);
    // throw new APIError("Error!", 400);
    // })
    })
   .catch(function (error) {
    console.log(error);
    throw new APIError("Error!", 400);
   });

};

const updatePlayerStatistics = async (req, res) => {
  try {
    const { companyInviteId, status } = req.body;
    const companyInvite = await CompanyInviteReq.findByIdAndUpdate(
      companyInviteId,
      {
        $set: { status: status },
      },
      { new: true }
    );
    if (companyInvite && status === "accepted") {
      const company = await Company.findById(companyInvite.companyId);
      company.employees.push(companyInvite.receiverId);
      await company.save();
    }

    return new Response(companyInvite).success(res);
  } catch (error) {
    throw new APIError("Error!", 400);
  }
};

module.exports = {
  getPlayerStatistics,
  updatePlayerStatistics,
  savePlayerStatistics
};

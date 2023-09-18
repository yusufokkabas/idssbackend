const Response = require("../utils/response");
const APIError = require("../utils/errors");
var axios = require('axios');
const fs =require('fs')
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    port:3306,
    database:'idsscout',
    user:'root',
    password: 'okkabas1034'
  }
});


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
  const axios = require('axios');

  const getTeams = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
    params: {league: '39',season:'2021'},
    headers: {
      'X-RapidAPI-Key': '2311440ef4msh5382e24b9c13ac9p104c14jsn49e71926e347',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };
  var mappedData=[];
  fs.readFile('teamsEngland.json', "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
  
    // Process the file data here.
  data = JSON.parse(data)
  mappedData = data.response.map((item) => {
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
  });

  
// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
//   const data = JSON.stringify(response.data)
//   fs.writeFile('teamsEngland.json', data, (err) => {
//     if (err) {
//       console.error("Error saving JSON data:", err);
//     } else {
//       console.log("JSON data saved to data.json");
//     }
//   });
//   return new Response(data).success(res);
// })
// .catch(function (error) {
//   console.log(error);
// });

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

const jwt = require("jsonwebtoken");
const config = require('config')
const knex = require('knex')(config.db)
const createToken = async (user, res) => {
  const payload = {
    sub: user.id,
    username: user.username,
  };
  const token = await jwt.sign(payload, config.SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: config.EXPIRES_IN,
  });
  return res.status(201).json({
    success: true,
    token,
    message: "Successful!",
    username: user.username,
  });
};

const tokenCheck = async (req, res,next) => {
  try {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Invalid session. Please sign-in!",
    });
    return;
  }
  jwt.verify(token, config.SECRET_KEY, async (err, decoded) => {
    if (err){ 
      res.status(401).json({
      success: false,
      message: "Invalid Token",
      });
      return;
    }
    let sub = decoded?.sub
    if(sub==undefined){
      res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
      return;
    }
    const userInfo = await knex('users').select('username').where('id',sub)
    if (userInfo.length==0) {
      res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
      return;
    }
    req.user = userInfo[0];
    next();
  });
} catch (error) {
  res.status(400).json({
    success: false,
    message: error,
  });
  return;
}
};

const verifyEmail = async (req, res, next) => {
  //try {
  //const user = await User.findOne({ email: req.body.email });
  //   if (user.isVerified) {
  //     next();
  //   } else {
  //     throw res.status(401).json({
  //       success: false,
  //       message: "Please check your email to verify your account!",
  //     });
  //   }
  // } catch (error) {
  //   throw res.status(401).json({
  //     success: false,
  //     message: "No user found!",
  //   });
  // }
};

module.exports = {
  createToken,
  tokenCheck,
  verifyEmail,
};

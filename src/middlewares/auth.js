const jwt = require("jsonwebtoken");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
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

const tokenCheck = async (req, res) => {
  try {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new APIError("Invalid session. Please sign in!", 401);
  }
  jwt.verify(token, config.SECRET_KEY, async (err, decoded) => {
    if (err) throw new APIError("Invalid token.", 401);
    console.log(decoded)
    const userInfo = await knex('users').select('username').where('id',decoded.sub)
    console.log(userInfo)
    if (userInfo.length==0) throw new APIError("Invalid token.", 401);
    req.user = userInfo[0];
    //next();
    return new Response("verification ok").success(res);
  });
} catch (error) {
  throw new APIError(error, 400);
}
};

const verifyEmail = async (req, res, next) => {
  // try {
  //   const user = await User.findOne({ email: req.body.email });
  //   if (user.isVerified) {
  //     next();
  //   } else {
  //     throw new APIError("Please check your email to verify your account", 401);
  //   }
  // } catch (error) {
  //   throw new APIError("No user found", 401);
  // }
};

module.exports = {
  createToken,
  tokenCheck,
  verifyEmail,
};

const jwt = require("jsonwebtoken");
const APIError = require("../utils/errors");

const createToken = async (user, res) => {
  const payload = {
    sub: user.id,
    name: user.name,
  };
  let secret_key = 'B59BCFC5C72AF81B900D3F20FA41BC13DAEF9A4107B0A608613C2D5E20B7AE15'
  let expiresIn = '10m'
  const token = await jwt.sign(payload, secret_key, {
    algorithm: "HS512",
    expiresIn: expiresIn,
  });
  return res.status(201).json({
    success: true,
    token,
    message: "Successful!",
    user: user,
  });
};

const tokenCheck = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) throw new APIError("Invalid session. Please sign in!", 401);
  let secret_key = 'B59BCFC5C72AF81B900D3F20FA41BC13DAEF9A4107B0A608613C2D5E20B7AE15'
  await jwt.verify(token, secret_key, async (err, decoded) => {
    if (err) throw new APIError("Invalid token.", 401);

    //const userInfo = burada dbde user aratmamız gerekli

    //if (!userInfo) throw new APIError("Invalid token.", 401);

    //req.user = userInfo;
    req.user = 'test'
    next();
  });
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

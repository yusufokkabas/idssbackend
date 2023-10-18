
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");
const nodemailer = require("nodemailer");
const config = require('config')
const knex = require('knex')(config.db)
const User = require('../models/user.model');
const { userInfo } = require("os");

// let transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.AUTH_EMAIL,
//     pass: process.env.AUTH_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready for messages");
//     console.log(success);
//   }
// });

const login = async (req, res) => {
  try{
  let username = req.body.username;
  let password = req.body.password;
  const userInfo = await knex('users').select('id','username','password').where('username',username)//dbde user kontrolü 
  if (userInfo.length!=1) throw new APIError("Email or password is incorrect!", 401);
  const validatedUser = await bcrypt.compare(
    password,
    userInfo[0].password
  );
  if (!validatedUser)
    throw new APIError("Email or password is incorrect!", 401);
  createToken(userInfo[0], res);
  } catch (error) {
    throw new APIError(error, 400);
  } 
};

const register = async (req, res) => {
  try {
    let { username,name, surname, email, password } = req.body;
    username = username.trim();
    name = name.trim();
    surname = surname.trim();
    email = email.trim();
    password = password.trim();
    const usernameCheck = await knex('users').select('username').where('username',username);
    const emailCheck = await knex('users').select('email').where('email',email);
    if (emailCheck.length>0||usernameCheck.length>0) {
      throw new APIError("Mail or Username is already on use!", 401);
    }

    const user = {
      username:username,
      name:name,
      surname:surname,
      email:email,
      password:password,
      //emailToken: crypto.randomBytes(64).toString("hex"),
    };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    knex('users')
    .insert(user).returning('*')
    .then((savedUser) => {
    return new Response(savedUser).success(res);
    })

    // const mailOptions = {
    //   from: process.env.AUTH_EMAIL,
    //   to: user.email,
    //   subject: "Verify your email",
    //   html: `<h2> ${user.name} ${user.lastname}, thanks for registering on our site! </h2>
    //          <h4> Please verify your email address to continue.. </h4>
    //          <a href="http://${req.headers.host}/users/verify-email?token=${user.emailToken}"> Verify your email address </a>
    //   `,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     throw new APIError("Verification email sent to your account", 400);
    //   }
    // });

    // res.json({
    //   status: "PENDING",
    //   message: "Verification otp email sent",
    //   data: {
    //     userId: user._id,
    //     email: user.email,
    //   },
    // });

  } catch (error) {
    throw new APIError(error, 400);
  }
};

const verifyemail = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });

    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
    } else {
      throw new Error("Email is not verified", 400);
    }
  } catch (error) {
    throw new APIError(error, 400);
  }
};

const get = async (req, res) => {
    
  };

const update = async (req, res) => {

};


module.exports = {
  login,
  register,
  get,
  update,
  verifyemail
};
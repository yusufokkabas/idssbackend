
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");
const nodemailer = require("nodemailer");
const config = require('config')
const db = require('../../models');
const { response } = require("express");
const { Op } = require("sequelize");
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.AUTH_EMAIL,
    pass: config.AUTH_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
  }
});


// username:test password:12345 örnek kullanıcı


const login = async (req, res) => {
  try{
  let username = req.body.username;
  let password = req.body.password;
  const userInfo = await db.User.findOne({where: {username:username}});
  if (userInfo==null) throw new APIError("Email or password is incorrect!", 401);
  const validatedUser = await bcrypt.compare(
    password,
    userInfo.password
  );
  if (!validatedUser) throw new APIError("Email or password is incorrect!", 401);
  createToken(userInfo, res);
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
    const usernameCheck = await db.User.findOne({where: {username:username}});
    const emailCheck = await db.User.findOne({where: {email:email}});
    if (emailCheck||usernameCheck) {
      throw new APIError("Mail or Username is already on use!", 401);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
      username:username,
      name:name,
      surname:surname,
      email:email,
      password:hashedPassword,
      //emailToken: crypto.randomBytes(64).toString("hex"),
    };
    const token = {
      mail_token: crypto.randomBytes(64).toString("hex"),
      username:username,
      mail:email,
      verified:false
    }
    // Inserting user into database
    const transaction = await db.sequelize.transaction();
    const newUser = await db.User.create(user, { transaction })
    .then((user) => {
      const newToken = db.users_mail_token.create(token,{ transaction }).then((token) => {
        const mailOptions = {
          from: config.AUTH_EMAIL,
          to: user.email,
          subject: "Verify your email",
          html: `<h2> ${user.name} ${user.surname}, thanks for registering on our site! </h2>
                 <h4> Please verify your email address to continue.. </h4>
                 <a href="http://${req.headers.host}/account/verifyemail?token=${token.mail_token}"> Verify your email address </a>
          `,
          };
          transporter.sendMail(mailOptions,async function (error, info) {
            if (error) {
              throw new Error(error);
            } else {
              await transaction.commit();
              res.json({
                status: "PENDING",
                message: "Verification otp email sent",
                data: {
                  username: user.username,
                  email: user.email,
                },
              });
            }
          });
      });      
     });
  } catch (error) {
    await transaction.rollback();
    throw new APIError(error, 400);
  }
};

const verifyemail = async (req, res) => {
  try {
    const {token} = req.query;
    const userToken = await db.users_mail_token.findOne({ where:{mail_token: token} });
    console.log(userToken)
    if (userToken&&userToken.verified==false) {
      userToken.verified = true;
      await userToken.save();
      res.render('emailVerification', { isSuccess:true, message: 'Email verified successfully!!' });
    }else if(userToken&&userToken.verified==true){
      res.render('emailVerification', { isSuccess:false, message: 'Email is already verified!!' });
    }
     else {
      res.render('emailVerification', { isSuccess:false, message: 'Email can not be verified!!' });
    }
  } catch (error) {
    res.render('emailVerification', { isSuccess:false, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const { queryBuilder } = req;
    const user = await db.User.findOne(
      { 
        where: queryBuilder.filters,
        attributes:{exclude:['password']}
      });
    return new Response(user).success(res);
  } catch (err) {
    console.error(err);
    throw new APIError(err, 400);
  }
  };

const update = async (req, res) => {
  try {
    const { queryBuilder } = req;
    const { name, surname,settings,birth_date,photo,phone_number } = req.body;

    const user = await db.User.findOne({ where: queryBuilder.filters });

    if (!user) {
      throw new APIError('User not found', 404);
    }

    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (settings) user.settings = settings;
    if (birth_date) user.birth_date = birth_date;
    if (photo) user.photo = photo;
    if (phone_number) user.phone_number = phone_number;
    await user.save();

    const response ={
      message: 'User updated successfully',
      user
    }
    return new Response(response).success(res);
  } catch (error) {
    console.error(error);
    throw new APIError(error, 400);
  }

};
const changePassword = async (req, res) => {
  try {
    const { queryBuilder } = req;
    const { password, newPassword } = req.body;

    const user = await db.User.findOne({ where: queryBuilder.filters });

    if (!user) {
      throw new APIError('User not found', 404);
    }
    const validatedUser = await bcrypt.compare(
      password,
      user.password
    );
    if (!validatedUser) throw new APIError("Email or password is incorrect!", 401);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    const response ={
      message: 'Password changed successfully',
      user
    }
    return new Response(response).success(res);
  } catch (error) {
    console.error(error);
    throw new APIError(error, 400);
  }

};


module.exports = {
  login,
  register,
  get,
  update,
  verifyemail,
  changePassword
};
const router = require("express").Router();
const { tokenCheck,verifyEmail } = require("../middlewares/auth");
const createQuery = require("../middlewares/queryBuilder");
const {
    login,
    register,
    get,
    update,
    changePassword,
    verifyemail
} = require("../controllers/account.controller");

router.post("/register",tokenCheck,register);
router.post("/login", tokenCheck,login);
router.get("/get",tokenCheck,createQuery,get);
router.post("/update",tokenCheck,createQuery,update);
router.post("/changepassword",tokenCheck,createQuery,changePassword);
router.get("/test",tokenCheck);
router.get("/verifyemail",verifyemail);


module.exports = router;
const router = require("express").Router();
const { tokenCheck,verifyEmail } = require("../middlewares/auth");
const createQuery = require("../middlewares/queryBuilder");
const {
    login,
    register,
    get,
    update
} = require("../controllers/account.controller");

router.post("/register",register);
router.post("/login", login);
router.get("/get",createQuery,get);
router.post("/update",createQuery,update);
router.get("/test",tokenCheck);


module.exports = router;
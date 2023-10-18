const router = require("express").Router();
const { tokenCheck,verifyEmail } = require("../middlewares/auth");
const {
    login,
    register,
    get,
    update
} = require("../controllers/account.controller");

router.post("/register",register);
router.post("/login", login);
router.get("/get",tokenCheck,get);
router.post("/update",update);
router.get("/test",tokenCheck);


module.exports = router;
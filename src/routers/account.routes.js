const router = require("express").Router();

const {
    login,
    register,
    get,
    update
} = require("../controllers/account.controller");


router.post("/register", register);
router.post("/login", login);
router.get("/get",get)
router.post("/update",update)


module.exports = router;
const router = require("express").Router();

const {
  getPlayerStatistics,
  savePlayerStatistics,
  updatePlayerStatistics,
} = require("../controllers/player.controller");
const { tokenCheck } = require("../middlewares/auth");
const createQuery = require("../middlewares/queryBuilder");


router.post("/save", savePlayerStatistics);
router.get("/get",createQuery ,getPlayerStatistics);
router.post("/update", updatePlayerStatistics);

// router.post("/verifyotp", verifyotp);

// router.post("/resendotpverificationcode", resendotpverificationcode);

module.exports = router;

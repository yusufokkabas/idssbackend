const router = require("express").Router();

const {
  getPlayerStatistics,
  savePlayerStatistics,
  updatePlayerStatistics,
} = require("../controllers/player.controller");


router.post("/save", savePlayerStatistics);
router.get("/get", getPlayerStatistics);
router.post("/update", updatePlayerStatistics);

// router.post("/verifyotp", verifyotp);

// router.post("/resendotpverificationcode", resendotpverificationcode);

module.exports = router;

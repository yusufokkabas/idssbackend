const router = require("express").Router();

const {
  getTeams,
  saveTeams,
  updateTeams,
} = require("../controllers/team.controller");


router.post("/save", saveTeams);
router.get("/get", getTeams);
router.post("/update", updateTeams);

// router.post("/verifyotp", verifyotp);

// router.post("/resendotpverificationcode", resendotpverificationcode);

module.exports = router;

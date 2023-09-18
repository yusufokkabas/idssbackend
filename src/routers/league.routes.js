const router = require("express").Router();

const {
  getLeague,
  saveLeague,
  updateLeague,
} = require("../controllers/league.controller");


router.post("/save", saveLeague);
router.get("/get", getLeague);
router.post("/update", updateLeague);


module.exports = router;
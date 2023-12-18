const router = require("express").Router();

const {
  getLeague,
  saveLeague,
  updateLeague,
} = require("../controllers/league.controller");
const createQuery = require("../middlewares/queryBuilder");


router.post("/save", saveLeague);
router.get("/get", createQuery,getLeague);
router.post("/update", updateLeague);


module.exports = router;
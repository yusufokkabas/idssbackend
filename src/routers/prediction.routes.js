const router = require("express").Router();

const {
  getPlayerPrediction,
  getModelMetrics,
} = require("../controllers/prediction.controller");
const { tokenCheck } = require("../middlewares/auth");
const createQuery = require("../middlewares/queryBuilder");


router.get("/metrics", getModelMetrics);
router.get("/player_prediction", getPlayerPrediction);


module.exports = router;
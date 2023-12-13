const router = require("express").Router();

const {
  getPlayerPrediction,
  getModelMetrics,
} = require("../controllers/prediction.controller");
const { tokenCheck } = require("../middlewares/auth");
const createQuery = require("../middlewares/queryBuilder");


router.get("/metrics", createQuery,getModelMetrics);
router.get("/player_prediction",createQuery, getPlayerPrediction);


module.exports = router;
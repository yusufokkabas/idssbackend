const router = require("express").Router();

// const playerStatictics = require("./player.routes");
// const teamInfo = require("./team.routes")
// const leagueInfo = require("./league.routes");
   const account = require("./account.routes")
// router.use("/player", playerStatictics);
// router.use("/team", teamInfo)
// router.use("/league",leagueInfo)
   router.use("/account", account)
module.exports = router;

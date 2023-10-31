require("express-async-errors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const router = require("./src/routers");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const cors = require("cors");
// Middleware
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use("/", router);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

//Exception handling
 app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is alive on port ${port}...`);
});

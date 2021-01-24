const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./src/utils/HttpException.utils");
const errorMiddleware = require("./src/middleware/error.middleware");
const pembeliRouter = require("./src/routes/pembeli.routes");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.use("/api/pembeli", pembeliRouter);

app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Endpoint Not Found!");
  next(err);
});

app.use(errorMiddleware);

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

module.exports = app;

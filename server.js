const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

require("./src/routes/pembeli.routes")(app);

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

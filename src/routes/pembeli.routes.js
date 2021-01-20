module.exports = function (app) {
  const pembeli = require("../controllers/pembeli.controller");

  //Add Pembeli
  app.post("/api/pembeli", pembeli.create);

  //Retrieve all Pembeli
  app.get("/api/pembeli", pembeli.findAll);

  // //Retrieve a single Pembeli by Id
  // app.get("/api/pembeli/:id", pembeli.findOne);

  // //Update a Pembeli by Id
  // app.put("/api/pembeli/:id", pembeli.update);

  // //Delete a Pembeli by Id
  // app.delete("/api/pembeli/:id", pembeli.delete);
};

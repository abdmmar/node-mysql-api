const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "catering_order",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

exports.create = function (req, res) {
  const newPembeli = req.body;
  const { nama, email, telepon, password } = newPembeli;
  const pembeli = {
    nama: nama,
    email: email,
    telepon: telepon,
    password: password,
  };
  const sql = "INSERT INTO pembeli SET ?";
  let query = db.query(sql, pembeli, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Pembeli added");
    res.send(result);
  });
};

exports.findAll = function (req, res) {
  const sql = "SELECT * FROM pembeli";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result);
  });
};

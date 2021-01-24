const PembeliModel = require("../model/pembeli.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class PembeliController {
  getAllPembeli = async (req, res, next) => {
    let pembeliList = await PembeliModel.find();
    if (!pembeliList.length) {
      throw new HttpException(404, "Pembeli not found!");
    }

    pembeliList = pembeliList.map((pembeli) => {
      const { password, ...pembeliWithoutPassword } = pembeli;
      return pembeliWithoutPassword;
    });

    res.send(pembeliList);
  };

  getPembeliById = async (req, res, next) => {
    const user = await PembeliModel.findOne({
      IDpembeli: req.params.IDpembeli,
    });
    if (!user) {
      throw new HttpException(404, "Pembeli not found");
    }

    const { password, ...userWithoutPassword } = user;

    res.send(userWithoutPassword);
  };

  login = async (req, res, next) => {
    this.checkValidation(req);

    const { email, password: pass } = req.body;

    const pembeli = await PembeliModel.findOne({ email });

    if (!pembeli) {
      throw new HttpException(401, "Unable to login!");
    }

    const isMatch = await bcrypt.compare(pass, pembeli.password);

    if (!isMatch) {
      throw new HttpException(401, "Incorrect password!");
    }

    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign(
      {
        IDpembeli: pembeli.IDpembeli.toString(),
      },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    const { password, ...pembeliWithoutPassword } = pembeli;
    res.send({ ...pembeliWithoutPassword, token });
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

module.exports = new PembeliController();

const HttpException = require("../utils/HttpException.utils");
const PembeliModel = require("../model/pembeli.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = () => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Bearer ";

      if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new HttpException(401, "Access denies. No credentials sent!");
      }

      const token = authHeader.replace(bearer, "");
      const secretKey = process.env.SECRET_JWT || "";

      const decoded = jwt.verify(token, secretKey);
      const pembeli = await PembeliModel.findOne({
        IDPembeli: decoded.IDpembeli,
      });
      if (!pembeli) {
        throw new HttpException(401, "Authentication failed!");
      }

      const ownerAuthorized = req.params.IDpembeli == pembeli.IDpembeli;

      if (!ownerAuthorized) {
        throw new HttpException(401, "Unathorized!");
      }

      req.currentPembeli = pembeli;
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

module.exports = auth;

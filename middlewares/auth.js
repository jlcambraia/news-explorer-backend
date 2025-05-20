import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ForbiddenError from "../errors/forbidden-err.js";

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new ForbiddenError("Autorização necessária");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return next(new ForbiddenError("Token inválido"));
    }
    if (err.name === "TokenExpiredError") {
      return next(new ForbiddenError("Token expirado"));
    }
    return next(err);
  }

  req.user = payload;

  return next();
};

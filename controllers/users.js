import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import NotFoundError from "../errors/not-found-err.js";
import BadRequestError from "../errors/bad-request-err.js";

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

export const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("Usuário não encontrado.");
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email && !password && !name) {
    throw new BadRequestError("Dados inválidos fornecidos");
  }

  return bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash, name })
      .then((user) => res.send({ data: user }))
      .catch(next);
  });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.send({ name: user.name, token });
    })
    .catch(next);
};

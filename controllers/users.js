import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import NotFoundError from "../errors/not-found-err.js";
import BadRequestError from "../errors/bad-request-err.js";

const { NODE_ENV, JWT_SECRET } = process.env;

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("Usuário não encontrado.");
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("Usuário não encontrado");
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email && !password && !name) {
    throw new BadRequestError("Dados inválidos fornecidos");
  }

  const hash = await bcrypt.hash(password, 10);
  User.create({ email, password: hash, name })
    .then((user) => res.send({ data: user }))
    .catch(next);
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
      res.send({ token });
    })
    .catch(next);
};

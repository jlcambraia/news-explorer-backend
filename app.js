import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { errors } from "celebrate";
import usersRouter from "./routes/users.js";
import articlesRouter from "./routes/articles.js";
import { createUser, login } from "./controllers/users.js";
import auth from "./middlewares/auth.js";
import logger from "./middlewares/logger.js";

import NotFoundError from "./errors/not-found-err.js";
import errorHandler from "./errors/error-handler.js";

dotenv.config();

const { PORT = 3000, MONGO_URL } = process.env;

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

app.use(logger.requestLogger);

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

app.use("*", (req, res, next) => {
  next(new NotFoundError("A solicitação não foi encontrada"));
});

app.use(logger.errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`O aplicativo está escutando na porta ${PORT}`);
});

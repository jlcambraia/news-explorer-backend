import express from "express";
import {
  getArticles,
  createArticle,
  deleteArticle,
} from "../controllers/articles.js";
import validateArticle from "../middlewares/validators.js";

const router = express.Router();

router.get("/", getArticles);

router.post("/", validateArticle, createArticle);

router.delete("/:articleId", deleteArticle);

export default router;

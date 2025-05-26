import express from "express";
import { getUser } from "../controllers/users.js";

const router = express.Router();

router.get("/me", getUser);

export default router;

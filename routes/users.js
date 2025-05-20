import express from "express";
import { getUsers, getUser, getCurrentUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:userId", getUser);

router.get("/me", getCurrentUser);

export default router;

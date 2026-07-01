import express from "express";
import { createUser, getAllUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUser);

export default router;
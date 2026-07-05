import express from "express";
import { createUser, getAllUsers, loginUser, logoutUser } from "../controllers/user.controller.js";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/user", createUser);
router.post("/login", loginUser);

router.get("/user",authMiddleware, isAdmin, getAllUsers);

router.get("/profile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
        success : true,
        user 
    });
});
router.get("/admin", authMiddleware, isAdmin, (req, res) => {
    res.json({
        success : true,
        message : "Welcome back chief"
    });
});
router.post("/logout",authMiddleware, logoutUser);


export default router;
import express from "express";
import { createUser, getAllUsers, loginUser, logoutUser } from "../controllers/user.controller.js";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUsers);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        success : true,
        user : req.user
    });
});
router.get("/admin", authMiddleware, isAdmin, (req, res) => {
    res.json({
        success : true,
        message : "Welcome back chief"
    });
});
router.post("/logout", logoutUser);


export default router;
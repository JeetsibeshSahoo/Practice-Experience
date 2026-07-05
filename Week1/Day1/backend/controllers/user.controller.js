import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";


export const createUser = async (req, res) => {
    try {
        const {name, email, password, age} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success : false,
                message : "All Data required"
            });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                success : false,
                message : "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            age
        });

        console.log("Saved user:", user);

        const safeUser = {
            _id : user._id,
            name : user.name,
            email : user.email,
            age : user.age,
            role : user.role
        };
        
        res.status(201).json({
            success : true,
            message : "User Creation Successfully",
            data : safeUser
        });
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        // const users = await User.find();

        const { search = "", page= 1, limit = 5 } = req.query;

        const pageNumber = Math.max(1, Number(page) || 1);
        const limitNumber = Math.max(1, Number(limit) || 5);

        const query = search ? {
            $or : [
                { name : { $regex : search, $options : "i" } },
                { email : { $regex : search, $options : "i" } }
            ]
        } : {};

        const users = await User.find(query)
            .select("-password")
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalUsers = await User.countDocuments(query);

        const totalPages = Math.ceil(totalUsers / limitNumber);

        res.status(200).json({
            success : true,
            page : pageNumber,
            limit : limitNumber,
            totalUsers,
            totalPages,
            data : users
        });
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success : false,
                message : "Both of these required"
            });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({
                success : false,
                message : "User doesn't exist please register first!"
            });
        }

        const checkPasswordMatch = await bcrypt.compare(password, user.password);
        if(!checkPasswordMatch) {
            return res.status(401).json({
                success : false,
                message : "Incorrect password please try again!"
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly : true, 
            secure : process.env.NODE_ENV === "production", 
            sameSite : "strict"
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly : true, 
            secure : process.env.NODE_ENV === "production", 
            sameSite : "strict"
        });

        return res.status(200).json({
            success : true,
            message : "Successfully Logged In",
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                age : user.age,
                role : user.role
            }
        });

    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({
            success : false,
            message : "Server Error!"
        });
    }
}

export const refreshTokenHandler = (req, res) => {
    try {
        const token = req.cookies.refreshToken;
    
        if(!token) {
            return res.status(401).json({
                success : false,
                message : "No refresh token"
            });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
        const newAccessToken = jwt.sign(
            {id : decoded.id, email : decoded.email, role : decoded.role},
            process.env.JWT_SECRET,
            {expiresIn : "15m"}
        );
    
        res.cookie("accessToken", newAccessToken, {
            httpOnly : true, 
            secure : process.env.NODE_ENV === "production", 
            sameSite : "strict"
        });

        res.json({
            success : true,
            message : "Token refreshed"
        });
    } catch (error) {
        console.log("Error:", error.message);
        return res.status(401).json({
            success : false,
            message : "Invalid refresh token"
        });
    }
}

export const logoutUser = (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!accessToken && !refreshToken) {
            return res.status(401).json({
                success: false,
                message: "User not logged in"
            });
        }
        res.clearCookie("accessToken", {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict"
        });
        res.clearCookie("refreshToken", {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict"
        });
        res.json({
            success : true,
            message : "Logged out successfully"
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({
            success : false,
            message : "Server Error!"
        });
    }
}
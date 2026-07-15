import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { cookieOptions } from "../utils/cookieOpt.js";
import crypto from "crypto";


export const createUser = async (req, res, next) => {
    try {
        const {name, email, password, age} = req.body;

        if (!name || !email || !password || !age) {
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
            user : safeUser
        });
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {

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
            user : users
        });
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
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

        const hashedToken = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        if(user.refreshTokens.length >= 5) {
            user.refreshTokens.shift();
        }

        user.refreshTokens.push({ token : hashedToken });
        await user.save();

        res.cookie("accessToken", accessToken, cookieOptions);

        res.cookie("refreshToken", refreshToken, cookieOptions);

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
        next(error);
    }
}

export const refreshTokenHandler = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
    
        if(!token) {
            return res.status(401).json({
                success : false,
                message : "No refresh token"
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            "refreshTokens.token" : hashedToken
        });

        if(!user) {
            return res.status(403).json({
                success : false,
                message : "Invalid refresh token"
            });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
        const newAccessToken = jwt.sign(
            {id : decoded.id, email : decoded.email, role : decoded.role},
            process.env.JWT_SECRET,
            {expiresIn : "15m"}
        );
    
        res.cookie("accessToken", newAccessToken, cookieOptions);

        return res.json({
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

export const logoutUser = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "User not logged in"
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const result = await User.updateOne(
            { "refreshTokens.token" : hashedToken },
            { $pull : { refreshTokens: { token : hashedToken } } } 
        );

        if(result.modifiedCount === 0) {
            return res.status(403).json({
                success: false,
                message: "Invalid or already logged out"
            });
        }

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        return res.json({
            success : true,
            message : "Logged out from this device"
        });
    } catch (error) {
        next(error);
    }
}

export const logoutAllDevices = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await User.findByIdAndUpdate(userId, {
            refreshTokens : []
        });

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        res.json({
            success : true,
            message : "Logged out from all devices"
        });
    } catch (error) {
        next(error);
    }
}
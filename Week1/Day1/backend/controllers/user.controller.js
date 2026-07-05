import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

        const token = jwt.sign({
            id : user._id, email : user.email, role : user.role
        }, process.env.JWT_SECRET, {expiresIn : "30m"});

        res.cookie("token", token, {httpOnly : true, secure : process.env.NODE_ENV === "production", sameSite : "strict"});

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

export const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
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
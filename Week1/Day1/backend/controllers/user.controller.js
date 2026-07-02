import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


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

        const safeUser = {
            _id : user._id,
            name : user.name,
            email : user.email,
            age : user.age
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
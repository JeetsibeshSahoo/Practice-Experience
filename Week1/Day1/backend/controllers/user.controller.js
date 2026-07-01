import User from "../models/user.model.js";


export const createUser = async (req, res) => {
    try {
        const {name, email, password, age} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success : false,
                message : "All Data required"
            });
        }
        const user = await User.create({
            name,
            email,
            password
        });
        
        res.status(201).json({
            success : true,
            message : "User Creation Successfully",
            data : user
        });
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}
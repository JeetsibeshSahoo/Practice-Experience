import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "admin"
    },
    age : {
        type : Number,
        required : true
    },
    refreshTokens : [
        {
            token : String,
            createdAt : {
                type : Date,
                default : Date.now
            }
        }
    ]
}, {timestamps : true});

const User = mongoose.model("User", userSchema);

export default User;
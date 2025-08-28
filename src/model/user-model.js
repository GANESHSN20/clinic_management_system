console.log("user-model");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    sex:{
        type:String,
        enum:["MALE", "FEMALE", "OTHER"],
        required:true
    },
    address:{
        type:String
    },
    bloodGroup:{
        type:String,
        enum:["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required:true
    },
    userName:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum:["OPEN", "ONGOING", "CLOSED"],
        default:"OPEN"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        enum:["DOCTOR", "ADMIN", "RECEPTIONIST", "PATIENT"],
        required:true
    },
    otp:{
        type:Number
    }
});

module.exports = mongoose.model("users", UserSchema);
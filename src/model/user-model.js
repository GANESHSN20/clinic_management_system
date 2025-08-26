const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
    },
    phone:{
        type:Number,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    sex:{
        type:String,
        enum:["MALE", "FEMALE", "OTHERS"],
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
    username:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
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
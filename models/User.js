const mongoose = require("mongoose")

//type = string ,required, (min, max characters allowed), 
//unique(no other users can have the same username)
const UserTable = new mongoose.Schema(
    {
        username:{
            type:String,
            required: true,
            min:3,
            max:20,
            unique:true,
        },

        email:{
            type:String,
            required:true,
            max:40,
            unique:true,
        },

        password:{
            type:String,
            required:true,
            min:6,
        },

        profilePic:{
            type:String,
            default:"",
        },

        coverPic:{
            type:String,
            default:"",
        },

        friends:{
            type:Array,
            default:[],
        },

        isAdmin:{
            type:Boolean,
            default:false,
        },
    },
    { timestamps:true }
);

module.exports = mongoose.model("User" , UserTable);
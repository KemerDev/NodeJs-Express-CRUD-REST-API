const router = require("express").Router();
const { request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register account
router.post("/register", async (req,res)=>{
    try{
        //encrypt the password before storage
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPwd,
        });

        //save user and get respond
        const user = await newUser.save();
        res.status(200).json(user)

    } catch(err) {
        res.status(500).json(err)
    }
});

//Login account
router.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({
            email:req.body.email
        })
        !user && res.status(404).json("user not found")

        const validPwd = await bcrypt.compare(req.body.password, user.password)
        !validPwd && res.status(404).json("Wrong Password")

        const {password,updateAt, ...other} = user._doc

        res.status(200).json(other);
    }catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;
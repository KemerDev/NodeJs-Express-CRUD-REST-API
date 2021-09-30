const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                await bcrypt.hash(req.body.password, salt);
            } catch(err) {
                res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Update succefull");
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can't update that account");
    }
});

//delete user
router.delete("/:id", async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete succefull");
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can't delete that account");
    }
});

//get user
router.get("/", async (req,res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username:username});
        const {password,updateAt, ...other} = user._doc
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err)
    }
});

//Add friend
router.put("/:id/friend", async (req,res) => {
    if(req.params.id !== req.body.userId) {
        try{
            const Fuser = await User.findById(req.params.id);
            const Cuser = await User.findById(req.body.userId);

            if(!Fuser.friends.includes(req.body.userId)) {
                await Fuser.updateOne({ $push:{ friends:req.body.userId } });
                await Cuser.updateOne({ $push:{ friends:req.params.id } });

                res.status(200).json("User has been added");
            } else {
                res.status(403).json("You are already friend");
            }

        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't add yourself");
    }
});

//Delete Friend
router.put("/:id/unfriend", async (req,res) => {
    if(req.params.id !== req.body.userId) {
        try{
            const Fuser = await User.findById(req.params.id);
            const Cuser = await User.findById(req.body.userId);

            if(Fuser.friends.includes(req.body.userId)) {
                await Fuser.updateOne({ $pull:{ friends:req.body.userId } });
                await Cuser.updateOne({ $pull:{ friends:req.params.id } });

                res.status(200).json("User has been unfriended");
            } else {
                res.status(403).json("You are not friends");
            }

        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfriend yourself");
    }
});

module.exports = router;
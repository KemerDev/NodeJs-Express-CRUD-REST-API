const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/", async (req,res) => {
    const newConv = new Conversation({
        members:[req.body.senderId, req.body.receiverId],
    });

    try {
        const saveConv = await newConv.save();
        res.status(200).json(saveConv);
    } catch(err) {
        res.status(500).json(err)
    }
});

//get conv of user

router.get("/:userId", async (req, res) => {
    try {
        const getConv = await Conversation.find({
            members: {$in:[req.params.userId]},
        });
        res.status(200).json(getConv);
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;
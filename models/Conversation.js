const mongoose = require("mongoose");

const ConversationTable = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Conversation", ConversationTable);
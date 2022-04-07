const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model("todo", UserSchema);
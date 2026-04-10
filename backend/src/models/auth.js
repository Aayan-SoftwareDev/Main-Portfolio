const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
});

const Account = mongoose.model('Account', schema);

module.exports = {
    Account,
};
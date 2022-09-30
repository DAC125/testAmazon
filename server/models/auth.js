const mongoose = require('mongoose');

const { Schema } = mongoose;

const auth = new Schema({
    userName: {type: String, requires: true},
    password: {type: String, requires: true}
});

module.exports = mongoose.model("Auth", auth);
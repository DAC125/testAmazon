const mongoose = require('mongoose');
const { Schema } = mongoose;

const sequenceYear = new Schema({ 
    id: {type: String} ,
    seq: {type: String} 
});

module.exports = mongoose.model("counterYear", sequenceYear);


const mongoose = require('mongoose');
const { Schema } = mongoose;

const counters = new Schema({ 
    consecutive: {Number},
    reference_value: {Number}, 
    seq: {Number} 
});

module.exports = mongoose.model("counters", counters);
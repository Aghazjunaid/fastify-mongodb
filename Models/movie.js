const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
    name: {type:String},
    description: {type:String},
    duration: {type:Number},
    type: {type:String},
    releasedDate: {type:Date},
    budget: {type:Number}
},{    
    timestamps: true,
});

module.exports = mongoose.model('movie', MovieSchema);
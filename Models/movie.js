const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
    title: {type:String},
    description: {type:String},
    duration: {type:String},
    category: {type:String},
    year: {type:String},
    budget: {type:Number},
    rating: {type:String}
},{    
    timestamps: true,
});

module.exports = mongoose.model('movie', MovieSchema);
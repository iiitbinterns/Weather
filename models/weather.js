const mongoose=require('mongoose');

const weatherSchema= new mongoose.Schema({
    temperature:{type:Number},
    humidity:{type:Number},
    pressure:{type:Number},
    windspeed:{type:Number},
    timestamp:{type:Date}
});

const Weather=mongoose.model('weather',weatherSchema);
module.exports=Weather;
const mongoose = require("mongoose");

const hourSchema = new mongoose.Schema({
  time: Date,
  temperature: Number
});

const hourlySchema =new mongoose.Schema({
    lat:Number,
    lon:Number,
    data:[hourSchema]
})
const Hourly = mongoose.model("Hour", hourlySchema);

module.exports = Hourly;
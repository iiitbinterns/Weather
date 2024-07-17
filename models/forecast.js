const express=require('express');
const router=express.Router();

const forecastSchema=new mongoose.Schema({
    temperature:{
        type:Number,
        required:true
    },
    rain:{
        type:Boolean,
        required:true
    },
    cloudcover:{
        type:Number,
        required:true
    }
});

const forecast=mongoose.model('Forecast',forecastSchema);

module.exports=forecast;

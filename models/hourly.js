const express=require('express');
const router=express.Router();

const hourlySchema=new mongoose.Schema({
    temperature:{
        type:Number,
        required:true
    },
    rainy:{
        type:Boolean,
        required:true
    },
    humidity:{
        type:Number,
        required:true
    },
    cloudy:{
        type:Boolean,
        required:true
    }
});

const hourly=mongoose.model('Hourly',hourlySchema);

module.exports=hourly;

const express=require('express');
const router=express.Router();

const currentSchema=new mongoose.Schema({
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

const current=mongoose.model('Current',currentSchema);

module.exports=current;

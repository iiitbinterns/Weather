const express=require('express');
const router=express.Router();

const currentSchema=new mongoose.Schema({
    temperature:{
        type:Number,
        required:true
    },
    rain:{
        type:
        required:true
    },
    cloudcover:{
        type:,
        required:true
    }
});

const current=mongoose.model('Current',currentSchema);

module.exports=current;

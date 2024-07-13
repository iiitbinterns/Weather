const mongoose=require('mongoose');

const locationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    latitude:{type:Number,required:true},
    longitude:{type:Number,required:true}
});

const Location=mongoose.model('location',locationSchema);
module.exports=Location;

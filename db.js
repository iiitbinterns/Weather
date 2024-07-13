const mongoose = require("mongoose");

var url = 'mongodb+srv://sindhuja:sindhuja@cluster0.tzhtz9r.mongodb.net/weather';

mongoose.connect(url , {useUnifiedTopology:true , useNewUrlParser:true,useCreateIndex:true})
   .then((res)=>console.log("success"))
   .catch((err)=>console.log("failed"));

module.exports = mongoose;
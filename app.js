require('dotenv').config();

const express = require('express');
const mongoose = require("mongoose");
const app = express();
const authRoutes=require('./routes/authentication');
const cookieParser=require('cookie-parser');

const expressLayout=require('express-ejs-layouts');
const PORT = 5000|| process.env.PORT;

app.use(express.static('public'));
app.use(express.json());
app.use(expressLayout);
app.use(cookieParser());

app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use(authRoutes);


const url = 'mongodb+srv://sindhuja:sindhuja@cluster0.tzhtz9r.mongodb.net/weather';
mongoose.connect(url)
   .then((res)=>console.log("success"))
   .catch((err)=>console.log(err));

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
});

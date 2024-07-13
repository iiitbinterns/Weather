const express=require('express');
const router=express.Router();

const User=require('../models/user');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const {requireAuth}=require('../middleware/authMiddleware');

//handle errors
const handleErrors=(err)=>{
    console.log(err.message,err.code);  //err.message consists all errors
    let errors={username:'',email:'',password:''};

    //incorrect email
    if(err.message==='incorrect email'){
        errors.email='email is not registered';
    }

    //incorrect password
    if(err.message==='incorrect password'){
        errors.password ='invalid password';
    }

    //duplicate error code
    if(err.code==11000){
        errors.email='email is already registered';
        return errors;
    }
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach((error)=>{                            //forEach(({properties})=>{
            errors[error.properties.path]=error.properties.message;              //   console.log(properties);
        })                                                                      //}
    }
    return errors;
}

const maxAge=3*24*60*60;//3 days in seconds
const createToken=(id)=>{
    return jwt.sign({id},'secret key',{
        expiresIn:maxAge
    })     //automatically takes headers
}
router.get('/register',(req,res)=>{
    res.render('register');
});

router.post('/register', async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const user= await User.create({username,email,password});
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json(user._id);
    }
    catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors});
    }
});

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/home',requireAuth,(req,res)=>{
    res.render('home');
});
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.login(email,password);
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors});
    }
});
/*
//cookies
router.get('/set-cookies',(req,res)=>{

    //res.setHeader('Set-Cookie','newUser=true');
    //same as below line which creates a new cookie if exists update that cookie
    //cookies are stored in  users browser
    //if user closes the browser automatically the cookies will be deleted
    //we can also pass objects
    //secure:true  we get cookie if we have secured connection -https
    //httpOnly:true we cannot access the cookie using javascript
    //cookie expires after maxAge
    //should use authentication cookies over https to secure connection and dont want to accessed or modified by clientside
    res.cookie('isuser',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true})
    res.cookie('newUser',true);
    res.send('you got cookies');
});

router.get('/read-cookies',(req,res)=>{
    const cookies=req.cookies;
    console.log(cookies);
    console.log(cookies.isuser);
    res.json(cookies);
});
*/
module.exports=router;
//mongoose hook: is a special function which fires after a certain mongoose event happen ex:doc saved to db
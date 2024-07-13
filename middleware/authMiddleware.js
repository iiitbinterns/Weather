//place this middleware(function) before route where the authentication needs
//this middlewares are for protecting routes

const jwt = require('jsonwebtoken');

//checks authentication status
const requireAuth =(req,res,next)=>{
    const token=req.cookies.jwt;

    //check json web token exists & is verified
    if(token){
        jwt.verify(token,'secret key',(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

module.exports={requireAuth};
const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter username']//mongoose validation:if we do not enter username it returns msg as please enter username
    },
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength:[6,'Minimum password length is 6 characters']
    },
});

//mongoose hooks
//fire a function after doc saved to bd--post save hook
userSchema.post('save',function(doc,next){
    console.log('new user was created and saved',doc);
    next();
});

//fire a function before doc saved to db--pre save hook
userSchema.pre('save',async function(next){
    console.log('user about to be created and saved');

    const salt= await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

//static method to login user
userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email});
    console.log(" login function");
    console.log(user);
    if(user){
        const auth =await bcrypt.compare(password,user.password);
        console.log("auth");
        if(auth)
            return user;
        throw Error('incorrect password');
    }
    console.log("after login");
    throw Error('incorrect email');
}

const User =mongoose.model('user',userSchema);
module.exports=User;
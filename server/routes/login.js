const express=require('express');
const route=express.Router();
const registermodel=require('../model/registermodel.js');
const model=require('../model/model.js');
const session = require('express-session');

// Use session middleware

route.use(express.urlencoded({ extended: true }));

//Route for login
route.route('/')
.get((req,res)=>{
    const error=req.session.errorMessage
    delete req.session.errorMessage;
    res.render('loginpage.ejs',{error:error});
})
.post(async (req,res)=>{
    const body=req.body;
   
    if(body)
    {
        var userFromRegisterModel=await registermodel.findOne({username:body.username});
        var userFromModel=await model.findOne({email:body.username});
        if(!userFromRegisterModel && !userFromModel)
        {
                req.session.errorMessage='User not found!';
                res.redirect('/');
                return;
        }
        const checkForAdmin=userFromRegisterModel?true:false;
        if(checkForAdmin)
        {
            if(body.password!==userFromRegisterModel?.password)
            {
               req.session.errorMessage='Password not correct!';
               res.redirect('/');
               return;
            }
            res.cookie("ID","asdasda",{maxAge:3500000});
            req.session.username=userFromRegisterModel.username;
            res.redirect('/userpage');
            return;
        }
        else
        {
            if(body.password!==userFromModel?.password)
            {
               req.session.errorMessage='Password not correct!';
               res.redirect('/');
               return;
            }
            res.cookie("ID","asdasda",{maxAge:3500000});
            req.session.status=userFromModel.status;
            req.session.username=userFromModel.name;
            res.redirect('/userhomepage');
            return;
        }
    }
    req.session.errorMessage='body not found!';
    res.redirect('/');
});

//route for signup
route.route('/signup')
.get((req,res)=>{
    const error=req.session.errorMessage
    delete req.session.errorMessage
    res.render('signuppage.ejs',{error:error});
})
.post(async (req,res)=>{
    const body=req.body;
     if(body)
     {
        if(body.password!==body.confirmpassword)
          {
             req.session.errorMessage="Password not match!";
             res.redirect('/signup');
             return;
         }
         
         var user=await registermodel.find({username:body.username});
         var userFromModel=await model.findOne({email:body.email});
         if(user.length!=0 || userFromModel)
         { 
             req.session.errorMessage="User already registered!Kindly Login!";
             res.redirect('/signup');
             return;
         }
         try
         {
            const user=new registermodel(body);
            await user.save();
            req.session.username=body.username;
            res.redirect('/userpage');
         }
          catch(exp)
          {
            req.session.errorMessage=exp.message;
             res.redirect('/signup');
             return;
          }
     }
});

route.get('/logout',(req,res)=>{
    res.cookie("ID","",{expires:new Date(Date.now())});
    delete req.session.errorMessage;
    delete req.session.username;
    res.redirect('/');
});
module.exports=route;
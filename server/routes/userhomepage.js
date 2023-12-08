const express=require('express');
const route=express.Router();


route.get('/',(req,res)=>{
    const cookies=req.cookies.ID;
    if(!cookies)
       {
        res.redirect('/');
        return;
       }

    const status=req.session.status=='InActive'?'Deactivated':'Activated';
    res.render('userhomepage.ejs',{username:req.session.username,activation:status,page:"dashboard"});
});
// `
route.get('/logout',(req,res)=>{
    res.cookie('ID','',{expires:new Date(Date.now())});
    delete req.session.username;
    res.redirect('/');
});
module.exports =route;
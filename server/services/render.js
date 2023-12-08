const axios=require('axios');
const userDb=require('../model/model.js');

const username=null;
// create a service to render homepage
const homeroutes=(req,res)=>{
    const cookies=req.cookies.ID;
    if(!cookies){
       res.redirect('/');
       return;
    }
    const db=userDb.find({}).then(data=>
    axios.get(`${process.env.DEPLOY_URL}/userpage/api/users`).then((resp)=>{
        const username=req.session.username;
        console.log('sure',username);
        res.render('index.ejs',{users:resp.data,username:username})}).catch(e=>res.send(e)));

}
// create a service to render new_User page
const add_user=(req,res)=>{
    res.render('new_User',{username:req.session.username});
}
// create a service to render update_User page
const update_user=(req,res)=>{
    // res.render('update_user');
    console.log('update');
    axios.get(`${process.env.DEPLOY_URL}/userpage/api/users` ,{params:{id:req.query.id}})
    .then((data)=>{
     res.render('update_user',{user:data.data,username:req.session.username})}).catch(e=>res.send(e));
}
const search=(req,res)=>{
    const name=req.params.id;
    userDb.find({name:name}).then(data=>{
        if(!data)
        {
            res.status(404).send('data cant be fetch');
        }
        else
        {
            res.render('index',{users:data,username:req.session.username});
        }
    });
}
//Export the module variables
module.exports= {homeroutes, add_user, update_user,search};
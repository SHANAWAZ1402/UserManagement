const express=require('express');
const route=express.Router();


route.get('/weather', (req, res) => {
    const cityname = req.query.search;
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=554d38f89048171633644af0fc6bd089`;
  
    fetch(weatherAPI, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        const status = req.session.status === 'InActive' ? 'Deactivated' : 'Activated';
        
        if (data.cod === 200) {
          res.render('userhomepage.ejs', {
            username: req.session.username,
            activation: status,
            page: 'weather',
            data: data,
            display: true,
          }
          );
        } else {
        
          res.render('userhomepage.ejs', {
            username: req.session.username,
            activation: status,
            page: 'weather',
            data: '',
            display: false,
          });
        }
      })
      .catch(error => res.json({ error: error.message }));
  });

route.get('/dashboard',(req,res)=>{
    const status=req.session.status=='InActive'?'Deactivated':'Activated';
    res.render('userhomepage.ejs',{username:req.session.username,activation:status,page:"dashboard"});
});
const api_key='AIzaSyAA5BNl9WcPT7OZiyktXKTZI1lWPwjcbsY';
route.get('/books',(req,res)=>{
    const searchTerm=req.query.book;
    const booksAPI = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${api_key}`;
    fetch(booksAPI,{method:'GET'}).then(e=>e.json())
    .then(data=>
     {
        const status=req.session.status=='InActive'?'Deactivated':'Activated';
     
        if(data.errors!=null)
        {
            res.render('userhomepage.ejs',{username:req.session.username,activation:status,page:"books",data:"",display:false});
        }
        else
        {
  
            if(rows>4)
            {
                var rows=Math.floor(data.totalItems/4);
            }
            else
            {
                rows=data.totalItems;
            }
            res.render('userhomepage.ejs',{username:req.session.username,activation:status,page:"books",data:data,display:true,rows:rows,k:0});
        }
     })
     .catch(e=>res.json(e.message));
 });
module.exports=route;

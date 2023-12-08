const express=require('express');
const app=express();
const dotenv=require('dotenv');
const bodyparser=require('body-parser');
const morgan=require('morgan');
const path=require('path');
const connectDb=require('./server/databases/connection');
const session=require('express-session');
const cookieparser=require('cookie-parser');

const host='0.0.0.0';
app.use(bodyparser.urlencoded({extended:true}));
  

connectDb;
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true
  }));

  //Login route
app.use('/',require('./server/routes/login.js'));
//admin page route
app.use('/userpage',require('./server/routes/router.js'));
//user home page route
app.use('/userhomepage',require('./server/routes/userhomepage.js'));
//api routes
app.use('/userhomepage/api',require('./server/routes/apiroute.js'));

// app.use(morgan('tiny'));

app.use('/', express.static(path.resolve(__dirname, 'html')))
app.use('/userpage/css',express.static(path.resolve(__dirname,'html/css')));
app.use('/userpage/img',express.static(path.resolve(__dirname,'html/img')));
app.use('/userpage/js',express.static(path.resolve(__dirname,'html/js')));

module.exports.dotenv_path=dotenv.config({path:'config.env'});

app.set('view engine','ejs');
const port=process.env.PORT || 80;


app.listen(port,()=>{console.log(`Server is running on port:${port}`)});
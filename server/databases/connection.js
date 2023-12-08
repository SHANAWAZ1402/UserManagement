const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'config.env'});

const connectDb=mongoose.connect(process.env.MONGO_URI,{
    dbName:'UserManagementSystem',
}).then(console.log('database connected')).catch(e=>console.log(e));

module.exports=connectDb;
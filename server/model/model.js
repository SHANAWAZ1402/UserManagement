const mongoose=require('mongoose');

const scheme=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
gender:String,
status:String,
});
const userDb=mongoose.model('ManagementSystem',scheme);
module.exports=userDb;
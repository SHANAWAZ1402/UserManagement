const mongoose=require('mongoose');

const schema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    minlength:8,
  }
});

const model=mongoose.model('registermodel',schema);

module.exports=model;
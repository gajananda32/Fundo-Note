import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import * as utilService from'../utils/user.util';
import { sender } from '../config/rabbitmq';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const checkuser = await User.findOne({email:body.email});
  if(checkuser){
    throw new Error("User with same mailid Already exits");
  }
  else{
    const saltRounds=10;
    const hashedPassword=await bcrypt.hash(body.password,saltRounds);
    body.password = hashedPassword;
    const data = await User.create(body);
    sender(data);
    return data;
  }
};


// loginuser
export const loginuser=async (body)=>{
  const data= await User.findOne({email:body.email});
  //console.log("data ------------------>",data);
  //console.log("body password---------->",body);
  if(data){
    const result= await bcrypt.compare(body.password,data.password);
    //console.log("result------------------->",result)
    if(result){
      const token=jwt.sign({email:body.email,id:data._id},process.env.SECRET_KEY);
      return token;
    }else{
      throw new Error("Password is Invalid");
    }
  }else{
    throw new Error("Invalid  EmailId");
  }
};

// //Reset password
export const ResetPassword = async (body) => {
  const saltRounds = 10;
  const hashPassword =  bcrypt.hashSync(body.password, saltRounds);
  body.password = hashPassword;
 const data = await User.findOneAndUpdate(
   {email:body.email},
   {password:body.password},
   {
     new: true
   }
 );
 return data;
};

//Forgot password
export const forgottPassword = async (body) => {
 const data = await User.findOne({ email: body.email });
// console.log("email------------->",data);
 if (data !== null) {
   var token = jwt.sign({email: data.email, id: data._id}, process.env.SECRET_KEY);
  await utilService.sendMail(body.email);
   return token;
 }
 else {
   throw new Error("Invalid Email ID");
 }
};

import {  createAsyncThunk } from '@reduxjs/toolkit'
import { signup,handleSignIn,sendOtp } from '../../../services/aws-cognito-auth/cognito-auth-functions'
import { Messages } from '../../../messages/Messages';
import { setInLocalStorage } from '../../../utils';


export const SignIn = createAsyncThunk(
  'SignIn',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {

try{
  // debugger;
const res=await handleSignIn(thunkAPI.userName);


console.log("res>",res)
if ((res?.message==Messages.Invalid_Lambda_Response)) {

  return rejectWithValue()

}
 if(res.message){
  return rejectWithValue("Plz Try Again ,some issue in server")
}
else{
 
 setTimeout(()=>{
  
  thunkAPI.navigate("/otp")
 })
  localStorage.removeItem("user");
  setInLocalStorage("user",res)

  return fulfillWithValue(res)
}
}catch (err) {
  // alert(err)
    //  checkSignIn(err)
    throw rejectWithValue(err)
  // handle error here

}


})


export const SignUp = createAsyncThunk(
  'SignUp',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {

try{
  // debugger;
  console.log("thunk api",thunkAPI)
const res=await signup({email:thunkAPI.userOtherFields.email,phone_number:thunkAPI.userOtherFields.phone_number})
console.log("res>>>>>",res)
if (res.message==Messages.Account_PhoneNumber_Exist) {
  return rejectWithValue(`User Name already Exist`)
}
  dispatch(SignIn({userName:res.user.username,navigate:thunkAPI.navigate}));
//  console.log(">>>auto siugnun",autoSignIn)

//  return fulfillWithValue(res)

}catch (err) {
    return rejectWithValue(err)


}


})





export const SendOtp = createAsyncThunk(
  'Otp',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {

try{
  // debugger;
  console.log("thunk api",thunkAPI)
const res=await sendOtp(thunkAPI.user,thunkAPI.code)
console.log("res>>>>>",res)
debugger;
if (res==undefined || res=="No current user") {
  return rejectWithValue(`Enter a Valid Otp`)
}else if(res.message=="user.sendCustomChallengeAnswer is not a function" || res.message==Messages.Invalid_Lambda_Response || res.message==Messages.Invalid_Session){
  thunkAPI.navigate("/login")
   return rejectWithValue("user signin expired")
}

//  console.log(">>>auto siugnun",autoSignIn)
// thunkAPI.navigate("/")
 return fulfillWithValue(res)

}catch (err) {
    return rejectWithValue(err)


}


})


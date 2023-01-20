
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { SignIn,SignUp,SendOtp } from './middlewares/auth'
import { getFromLocalStorage } from '../../utils';

let otp=getFromLocalStorage("user")
const initialState = {
  
   authErr:"",
  renderOtpPage:false,
  renderLoginComponent:true,
  loading:false,
  user:{},
  otp_exist:otp? otp:false
}








export const auth = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    signin:(state)=>state,
    InvalidUserName:(state,{payload})=>{
      console.log("pay : ",payload)
      state.authErr=payload
    },
    errorRemove:(state)=>{state.authErr=" "}

  },
  
  extraReducers: {
    [SignUp.pending]: (state) => {
      state.loading = true
      
    },
    [SignUp.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.entities = payload
      
      state.signUp_status=true
      state.authErr=''
      state.user=payload

     
    },
    [SignUp.rejected]: (state,{payload}) => {
      state.loading = false;
      state.authErr=payload;
      state.renderLoginComponent=false
      
     
    },







    [SignIn.pending]: (state) => {
      state.loading = true

    },
    [SignIn.fulfilled]: (state, { payload }) => {
      console.log("user >",payload)
      state.loading = false
      state.authErr=''
      state.user=payload
    
    },
    [SignIn.rejected]: (state,{payload}) => {
      state.loading = false
     state.renderLoginComponent=false
      state.authErr=payload
    },


    [SendOtp.pending]: (state) => {
      state.loading = true

    },
    [SendOtp.fulfilled]: (state, { payload }) => {
  
      state.loading = false
      state.authErr=''
      state.user=payload
    },
    [SendOtp.rejected]: (state,{payload}) => {
      state.loading = false
      state.authErr=payload
      
    },
  },
})

// Action creators are generated for each case reducer function
export const {InvalidUserName,errorRemove} = auth.actions

export default auth.reducer
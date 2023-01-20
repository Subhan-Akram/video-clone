import React,{useState} from "react"
import './signUp.scss';
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";


import { SignUp, } from '../../store/reducer-slice/middlewares/auth';
import {useNavigate } from "react-router-dom"
import { InvalidUserName } from '../../store/reducer-slice/auth';
const SignUpC = ({userNameType,userName}) => {
	const dispatch = useDispatch();
	const navigate=useNavigate();
	const [userDetail,setUserDetail]=useState("")

	const auth=useSelector(state=>state.auth);
	const isLoading =auth.loading;

	
	const { register, handleSubmit, errors, getValues } = useForm({
		mode: "onTouched"
	})
	const checkUserName=(val)=>{
		let regexNumber = /^[0-9]+$/;
		let regexEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if(!(userNameType=="number")){
			if(regexNumber.test(val)){
			
				 return {email:userName,phone_number:`+${val}`}
			}
		}
		if(regexEmail.test(val)){			
		console.log(">>>>",val,userName)
			return {email:val,phone_number:`+${userName}`}
		}
    setUserDetail("")
		
		return ""
	}

	const onSubmit = data => {
		// debugger
	 let userOtherFields=checkUserName(userDetail)
		// dispatch(signUpStart({ displayName, email, password }));
	if(userOtherFields != ""){
		dispatch(SignUp({userOtherFields,navigate}));
	}else{
	 if(userNameType=="number"){
		dispatch(InvalidUserName("Enter Email "))
	 }else{
		dispatch(InvalidUserName("Enter Phone Number"))
	 }
	}
	}

	return (
		<motion.form
			variants={staggerOne}
			initial="initial"
			animate="animate"
			exit="exit"
			className="SignUp__form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				<InputField
					type="text"
					name="displayName"
					placeholder={userNameType=="number"?"Enter Email ": "Enter Mobile Number"}
					validationMessage="Please enter your Email"
          onChange={(e)=>{setUserDetail(e.target.value)}}
					value={userDetail}
					// validation={register({
					// 	required: true,
					// 	minLength: 2,
					// 	maxLength: 60
					// })}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
			{/* <motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				<InputField
					type="text"
					name="email"
					placeholder="E-mail"
					validationMessage="Please enter a valid email address."
					validation={register({
						required: true,
						pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
			<motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				<InputField
					type="password"
					name="password"
					placeholder="Password"
					validationMessage="The password should have a length between 6 and 30 characters."
					validation={register({
						required: true,
						minLength: 6,
						maxLength: 30,
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
			<motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				<InputField
					type="password"
					name="check_password"
					placeholder="Repeat your password"
					validationMessage="Passwords should match"
					validation={register({
						validate: {
							matchesPreviousPassword: (value) => {
								const { password } = getValues();
								return value && password === value || "Passwords should match!";
							}
						}
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div> */}
			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`SignUp__form--button button__submit ${isLoading && 'loading'}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Continue'}
			</motion.button>
		</motion.form>
	)
}

export default SignUpC;
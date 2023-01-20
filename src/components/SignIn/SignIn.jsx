import './signIn.scss';
import React,{useState} from "react";
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { emailSignInStart, googleSignInStart, anonymousSignInStart } from "../../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoadingState } from "../../redux/auth/auth.selectors";
import { SignUp,SignIn, } from '../../store/reducer-slice/middlewares/auth';
import { InvalidUserName} from '../../store/reducer-slice/auth';
import { Navigate,useNavigate } from "react-router-dom";
const SignInC = ({setUserNameType,userName,setUserName}) => {
	const dispatch = useDispatch();
	console.log("user name type : ",setUserNameType)
	
	const { register, handleSubmit, errors } = useForm({
		mode: "onTouched"
	})
 const navigate=useNavigate();

 const auth=useSelector(state=>state.auth);
 const isLoading =auth.loading;
 console.log(">>>>>>>>>>",isLoading)
	const checkUserName=(val)=>{
		let regexNumber = /^[0-9]+$/;
		let regexEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if(regexNumber.test(val)){
			 setUserNameType("number")
			 return `+${val}`
		}
		if(regexEmail.test(val)){
			setUserNameType("email")
			
			return val
		}
		setUserName("")
		return ""
	}
	// console.log("auth action :" ,authActions)
	const onSubmit =() => {

	  const user=checkUserName(userName);
		console.log("data >>>>>",userName)
		// dispatch(emailSignInStart({ email, password }));
		if(user != ""){
			dispatch(SignIn({userName:user,navigate}));
		}else{
			
			dispatch(InvalidUserName("Enter Email or Phone Number"))
		}
	}

	return (
		<motion.form
			variants={staggerOne}
			initial="initial"
			animate="animate"
			exit="exit"
			className="SignIn__form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<motion.div variants={authFadeInUpVariants} className="SignIn__form--inputwrp">
				<InputField
					type="text"
					name="email"
					placeholder="E-mail or Phone Number"
					validationMessage="Please enter a valid email address."
					// validation={register({
					// 	required: true,
					// 	pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
					// })}
					value={userName}
					onChange={(e)=>{setUserName(e.target.value)}}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
			<motion.div variants={authFadeInUpVariants} className="SignIn__form--inputwrp">
				{/* <InputField
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
				/> */}
			</motion.div>
			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__submit ${isLoading && 'loading'}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Sign in'}
			</motion.button>
			<motion.button
				type="button"
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__google ${isLoading && 'loading'}`}
				onClick={() => dispatch(googleSignInStart())}
				disabled={isLoading}
			>
				{!isLoading && <FcGoogle />}
				{isLoading ? <Loader /> : 'Sign in with Facebook'}
			</motion.button>
			{/* <motion.button
				type="button"
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__anonymous ${isLoading && 'loading'}`}
				onClick={() => dispatch(anonymousSignInStart())}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Sign in anonymously'}
			</motion.button> */}
		</motion.form>
	)
}

export default SignInC;
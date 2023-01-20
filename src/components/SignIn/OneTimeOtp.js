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
import { SendOtp, } from '../../store/reducer-slice/middlewares/auth';
import { InvalidUserName} from '../../store/reducer-slice/auth';
import { Navigate,useNavigate } from "react-router-dom";
const OneTimeOtp = () => {
	const dispatch = useDispatch();
 const [otp,setOtp]=useState("")
	
	const { register, handleSubmit, errors } = useForm({
		mode: "onTouched"
	})
 const navigate=useNavigate();

 const auth=useSelector(state=>state.auth);
 const isLoading =auth.loading;
	const checkUserName=(val)=>{
		let regexNumber = /^[0-9]+$/;
		
		if(regexNumber.test(val)){
			 
			 return val
		}
	
		setOtp("")
		return ""
	}
  console.log("auth ",auth
  )
	// console.log("auth action :" ,authActions)
	const onSubmit =() => {

	  const otpCode=checkUserName(otp);

		// dispatch(emailSignInStart({ email, password }));
 
		if(otpCode != "" &&  auth.user != undefined ){

			dispatch(SendOtp({user:auth.user,code:otpCode,navigate}));
		}else{
			
			dispatch(InvalidUserName("Enter a correct Otp"))
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
					placeholder="Enter OTP"
					validationMessage="Please enter a valid email address."
			
					// })}
					value={otp}
					onChange={(e)=>{setOtp(e.target.value)}}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
		
			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__submit ${isLoading && 'loading'}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Continue'}
			</motion.button>
		
			
		</motion.form>
	)
}

export default OneTimeOtp;
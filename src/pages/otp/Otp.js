import "../Auth/auth.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerOne, authFadeInUpVariants, modalVariants, authPageFadeInVariants } from "../../motionUtils";
// import { LOGO_URL, SIGNIN_BGIMG_URL } from "../../requests.js";
import { useSelector } from "react-redux";

import netflix_bg from "../../assets/netflix_bg.jpg"
import logo from "../../assets/logo_bg.png"
import OneTimeOtp from "../../components/SignIn/OneTimeOtp";

const Otp = () => {

const navigate=useNavigate()
 const auth=useSelector(state=>state.auth);
 useEffect(()=>{
	

	// debugger
	if((auth.user.Session==undefined)){
		console.log("auth user",auth.user?.Session==undefined)
		alert("Ops! Otp Expired , login Again")
		navigate("/login")
	}

 },[])

	return (
		<motion.div
			className="Auth"
			variants={authPageFadeInVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="Auth__opacityLayer" />
			<div className="Auth__bgLayer" style={{ backgroundImage: `url(${netflix_bg})` }} />
			<Link to="/" className="Auth__logo">
				<img className="Auth__logo--img" src={logo} alt="Fakeflix_logo" />
			</Link>
			<motion.div
				className="Auth__content bd_red"
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit">
					<motion.h2 variants={authFadeInUpVariants} className="Auth__content--title">
						OTP 
					</motion.h2>
					{/* <motion.small variants={authFadeInUpVariants} className="Auth__content--disclaimer">
						{`Pay attention: this is not the original Netflix ${isSignedUp ? "sign in" : "sign up"}. Don't insert your real credentials here!`}
					</motion.small> */}
					
					{/* <motion.hr variants={authFadeInUpVariants} className="Auth__content--divider" /> */}
					<motion.small variants={authFadeInUpVariants} className="Auth__content--toggleView">
            <OneTimeOtp />
            {auth.authErr && <motion.p variants={authFadeInUpVariants} className='Auth__content--errors'>{auth.authErr}</motion.p>}
						{/* {isSignedUp
							? `Haven't you registered yet? `
							: "Do you already have an account? "} */}
						{/* <span className="toggler" onClick={() => setIsSignedUp(!isSignedUp)}>
							{auth.SignIn? "Sign Up" : "Sign In"}
						</span> */}
					</motion.small>
				</motion.div>
			</motion.div>

		</motion.div>
	);
};

export default Otp;

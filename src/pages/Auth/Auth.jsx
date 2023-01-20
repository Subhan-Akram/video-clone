import "./auth.scss";
import { useState } from "react";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerOne, authFadeInUpVariants, modalVariants, authPageFadeInVariants } from "../../motionUtils";
// import { LOGO_URL, SIGNIN_BGIMG_URL } from "../../requests.js";
import { useSelector } from "react-redux";
import { selectAuthErrors } from "../../redux/auth/auth.selectors";
import netflix_bg from "../../assets/netflix_bg.jpg"
import logo from "../../assets/logo_bg.png"

const Auth = () => {
const [userNameType,setUserNameType]=useState("")
const [userName,setUserName]=useState("");

 const auth=useSelector(state=>state.auth);
console.log("suth : ",auth,"user name type : ",userNameType)
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
						Sign In
					</motion.h2>
					{/* <motion.small variants={authFadeInUpVariants} className="Auth__content--disclaimer">
						{`Pay attention: this is not the original Netflix ${isSignedUp ? "sign in" : "sign up"}. Don't insert your real credentials here!`}
					</motion.small> */}
					{ auth.renderLoginComponent?<SignIn userNameType={userNameType} setUserNameType={setUserNameType} userName={userName} setUserName={setUserName} /> : <SignUp userName={userName} userNameType={userNameType} setUserNameType={setUserNameType}  />}
					{auth.authErr && <motion.p variants={authFadeInUpVariants} className='Auth__content--errors'>{auth.authErr}</motion.p>}
					<motion.hr variants={authFadeInUpVariants} className="Auth__content--divider" />
					<motion.small variants={authFadeInUpVariants} className="Auth__content--toggleView">
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

export default Auth;

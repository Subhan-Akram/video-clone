import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Route,Routes ,useNavigate} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/Homepage/Homepage"

import Auth from "./pages/Auth/Auth";


import SignUpC from "./components/SignUp/SignUp";
import { Messages } from "./messages/Messages";
import Otp from "./pages/otp/Otp";

const App = () => {

 const navigate=useNavigate();
    const dispatch = useDispatch();
    const auth=useSelector(state=>state.auth);
    console.log("auth ",auth)
    const userExist=auth.user


console.log("user exist : ",userExist)



    return (
        <div className="App">
            {/* {currentUser &&  */}
          
                <>
                    {/* <Navbar /> */}
                    {/* <DetailModal /> */}
                </>
          

            <AnimatePresence exitBeforeEnter>
                <Routes >
                  
                    <Route
                        path="/login"
                        element={<Auth />}
                    />
                   {userExist !=undefined?  <Route path="/otp" element={<Otp />} />:"" }
                
                 
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App;

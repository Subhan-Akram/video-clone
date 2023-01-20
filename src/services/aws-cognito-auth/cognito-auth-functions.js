
import { Auth ,Amplify } from 'aws-amplify';



Amplify.configure({
  Auth: {
    region: 'us-east-1', // your cognito region
    userPoolId: 'us-east-1_rel64eqSf',  // your user pool id
    userPoolWebClientId: '4rpt3a3iksc0ks6qbb66b995hh', // your app client id
}
});
export  const resendCode = async (phone) => {
    try {
       let res= await Auth.resendSignUp(phone);
        console.log("Code Resent");
        return res

    } catch (error) {
        console.log(error);
        return error
    }
}

  export    const handleConfirmSignUp = async (phone,code) => {
        try {
          // console.log("verification code ",ref.current.value)
          
            const confirmSignUpResponse = await Auth.confirmSignUp(phone,code);
            console.log(confirmSignUpResponse);
            return confirmSignUpResponse
        } catch (error) {
            console.log("CODE ",error);
            return error
        }
    };
 export const signup=async({email,phone_number})=>{
        try {
          console.log(">>>aws cognitpo>",phone_number,email)
        
          const signUpResponse = await Auth.signUp({
              username:phone_number,
              password:`${phone_number}-@Aa`, // temporary password
              attributes: {
                  email:email,
                  phone_number:phone_number
              },
              validationData: []
          });
          console.log("response status",signUpResponse.code);
          return signUpResponse;
        
      } catch (error) {
        return error
          console.log(error);
      }

  }
 export const handleSignIn = async (phone) => {
    try {
    //   debugger;
       console.log(phone)
        const signInResponse = await Auth.signIn(phone); // temporary password
        // setIsLoggedIn(true);
        console.log("token user : ",signInResponse)
        return signInResponse
        // setUser(signInResponse.getIdToken().payload);
    } catch (error) {
        console.log("signin error",error);
        return error
    }
};

export const handleSignOut = async () => {
    try {
        await Auth.signOut();
        // setIsLoggedIn(false);
        // setUser(null);
    } catch (error) {
        console.log("error : ",error)
      }
    }



    export const sendOtp=async (user,answer)=>{
debugger;
        // Send the answer to the User Pool
        // This will throw an error if it’s the 3rd wrong answer
      
        // It we get here, the answer was sent successfully,
        // but it might have been wrong (1st or 2nd time)
        // So we should test if the user is authenticated now
        try {
            let cognitoUser = await Auth.sendCustomChallengeAnswer(user, answer);
            console.log("cognito ",cognitoUser)
            // This will throw an error if the user is not yet authenticated:
           return  cognitoUser
        } catch(err) {
            console.log('Apparently the user did not enter the right code');
        return err
        }
    
    }
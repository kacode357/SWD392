import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { notification } from 'antd';
import { googleSignUpApi, googleSigInpApi } from '../util/api'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSuccess = async (response: any) => {  
    const googleId = response.credential; 
    console.log('Login success:', response);

    try {
      // Try to log in the user first
      const loginResponse = await googleSigInpApi(googleId);
     

      // Assuming the API response contains a token
      const token = loginResponse.token; 
      if (token) {
        // Store token in localStorage
        localStorage.setItem('token', token);
      }

      notification.success({
        message: 'Google Login Successful',
        description: 'You have successfully logged in with Google.',
      });

      navigate('/');

    } catch (error: any) {
    

      if (error.response && error.response.data.message === "Email not verified!.") {
        return; 
      }

      try {
        // If login fails and the error is not about unverified email, try to sign up the user
        const signupResponse = await googleSignUpApi(googleId);
        console.log('Signup API Response:', signupResponse);
        
        // Assuming the signup response also contains a token
        const token = signupResponse?.data?.token; 
        if (token) {
          // Store token in localStorage
          localStorage.setItem('token', token);
          navigate('/');
        }

        notification.success({
          message: 'Google Signup Successful',
          description: 'Please verify your email to activate your account.',
        });

      } catch (signupError) {
        console.error('Signup failed:', signupError);
      
      }
    }
  };

  const handleError = () => {
  
  };

  return (
    <GoogleOAuthProvider clientId="976712067094-lv2i7i7ln5kul1tjejpti6a85rm3unt7.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

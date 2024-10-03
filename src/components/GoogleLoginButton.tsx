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
      console.log('Login API Response:', loginResponse);
      
      // Assuming the API response contains a token
      const token = loginResponse.token; 
      if (token) {
        // Lưu token vào localStorage
        localStorage.setItem('token', token);
      }

      notification.success({
        message: 'Google Login Successful',
        description: 'You have successfully logged in with Google.',
      });

      // Navigate to homepage after successful login
      navigate('/');

    } catch (error) {
      console.error('Login failed, trying signup:', error);
      try {
        // If login fails, try to sign up the user
        const signupResponse = await googleSignUpApi(googleId);
        console.log('Signup API Response:', signupResponse);
        
        // Assuming the signup response also contains a token
        const token = signupResponse?.data?.token; 
        if (token) {
          // Lưu token vào localStorage
          localStorage.setItem('token', token);
        }

        notification.success({
          message: 'Google Signup Successful',
          description: 'You have successfully signed up with Google.',
        });

        // Navigate to homepage after successful signup
        navigate('/');

      } catch (signupError) {
        console.error('Signup failed:', signupError);
        notification.error({
          message: 'Google Signup Failed',
          description: 'Something went wrong with Google signup.',
        });
      }
    }
  };

  const handleError = () => {
    notification.error({
      message: 'Google Login Failed',
      description: 'Something went wrong with Google login.',
    });
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

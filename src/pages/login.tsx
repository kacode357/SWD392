import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false); 

  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && loginBtn && container) {
      const handleRegisterClick = () => {
        setIsRegisterActive(true); 
      };

      const handleLoginClick = () => {
        setIsRegisterActive(false);
      };

      registerBtn.addEventListener('click', handleRegisterClick);
      loginBtn.addEventListener('click', handleLoginClick);

      return () => {
        registerBtn.removeEventListener('click', handleRegisterClick);
        loginBtn.removeEventListener('click', handleLoginClick);
      };
    }
  }, []);

  const handleRegisterSuccess = () => {
    setIsRegisterActive(false); // Switch to login form after successful registration
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100   ">
         <img 
        src="public/giffifa.gif"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 filter blur-sm"
      />
      <div className={`container  ${isRegisterActive ? 'active' : ''}`} id="container">
        {isRegisterActive ? (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} /> 
        ) : (
          <LoginForm /> // Show login form
        )}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of the site features</p>
              <button id="register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
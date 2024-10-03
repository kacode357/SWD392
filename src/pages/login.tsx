import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import backgroundImage from "../assets/backgrould.gif";
const Login = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");
    console.log(registerBtn, loginBtn, container);
    if (registerBtn && loginBtn && container) {
      const handleRegisterClick = () => {
        setIsRegisterActive(true);
      };

      const handleLoginClick = () => {
        setIsRegisterActive(false);
      };

      registerBtn.addEventListener("click", handleRegisterClick);
      loginBtn.addEventListener("click", handleLoginClick);

      return () => {
        registerBtn.removeEventListener("click", handleRegisterClick);
        loginBtn.removeEventListener("click", handleLoginClick);
      };
    }
  }, []);

  const handleRegisterSuccess = () => {
    setIsRegisterActive(false); // Switch to login form after successful registration
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={`container ${isRegisterActive ? "active" : ""}`}
        id="container"
      >
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
              <p>
                Register with your personal details to use all of the site
                features
              </p>
              <button id="register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");
   
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
      style={{ backgroundImage: `url('https://i.pinimg.com/564x/16/3e/1a/163e1a79ab7b45324fc5b4c134665ef7.jpg')` }}
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

            <div className="toggle-panel toggle-left ">
              <img className="w-40" src="https://img.uefa.com/imgml/TP/players/3/2024/cutoff/63706.png" />
              <p className="py-5">Log in to access features</p>
              <button id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <img className="w-40" src="https://cdnmedia.webthethao.vn/thumb/720-405/uploads/media/images/files/thietke/lionel-messi-trong-mau-ao-doi-tuyen-argentina-hay-tam-thuong-de-tro-nen-vi-dai.PNG" />
              <p className="py-5">Sign up to access features</p>
              <button id="register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

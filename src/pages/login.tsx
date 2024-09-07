import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Make sure you have react-router-dom installed

const Login = () => {
 const navigate = useNavigate();
  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && loginBtn && container) {
      const handleRegisterClick = () => {
        container.classList.add('active');
      };

      const handleLoginClick = () => {
        container.classList.remove('active');
      };

      registerBtn.addEventListener('click', handleRegisterClick);
      loginBtn.addEventListener('click', handleLoginClick);

      // Cleanup the event listeners when the component unmounts
      return () => {
        registerBtn.removeEventListener('click', handleRegisterClick);
        loginBtn.removeEventListener('click', handleLoginClick);
      };
    }
  }, []);

  const handleSignInClick = () => {
    localStorage.setItem('token', 'test');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email and password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forget Your Password?</a>
            <button type="button" onClick={handleSignInClick}>Sign In</button>
            <div className="text-center mt-4">
              <Link to="/" className="text-blue-500 hover:underline">Back to HomePage</Link>
            </div>
          </form>
        </div>
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

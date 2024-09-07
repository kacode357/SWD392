import React, { useState } from 'react';
import '../styles/log.css'; // Remember to create this CSS file or import it correctly
import { GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

const LogRegis: React.FC = () => {
  const [isActive, setIsActive] = useState(false); // State to toggle between sign-in and sign-up

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <GoogleOutlined />
            </a>
            <a href="#" className="icon">
              <FacebookOutlined />
            </a>
            <a href="#" className="icon">
              <GithubOutlined />
            </a>
            <a href="#" className="icon">
              <LinkedinOutlined />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <GoogleOutlined />
            </a>
            <a href="#" className="icon">
              <FacebookOutlined />
            </a>
            <a href="#" className="icon">
              <GithubOutlined />
            </a>
            <a href="#" className="icon">
              <LinkedinOutlined />
            </a>
          </div>
          <span>or use your email for login</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot Your Password?</a>
          <button type="button">Sign In</button>
        </form>
      </div>

      {/* Toggle between Sign In and Sign Up */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={() => setIsActive(false)}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp" onClick={() => setIsActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogRegis;

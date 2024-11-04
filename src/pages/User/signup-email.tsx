import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const SignUpEmailAccount: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen p-5"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('https://i.pinimg.com/564x/16/3e/1a/163e1a79ab7b45324fc5b4c134665ef7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full max-w-md p-6 shadow-lg bg-white rounded-lg"
        style={{ maxWidth: "640px", margin: "150px auto", textAlign: "center" }}
      >
        <Title level={2}>Verify Account</Title>
        <Paragraph>
          You have successfully registered your email. Please check your email to verify your account.
          <br />
          <Link to="/" style={{ color: "#1890ff", fontWeight: "bold", marginRight: "8px" }}>
            Go to Homepage
          </Link>
          |
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1890ff", fontWeight: "bold", marginLeft: "8px" }}
          >
            Open Gmail
          </a>
        </Paragraph>
      </div>
    </div>
  );
};

export default SignUpEmailAccount;

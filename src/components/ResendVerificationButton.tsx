import React, { useState } from "react";
import { resendVerificationApi } from "../util/api";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ResendVerificationButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    setLoading(true);
    try {
      await resendVerificationApi(email);
      alert("A verification email has been sent to your registered email address.");
    } catch (error) {
      alert("Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-5"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('https://i.pinimg.com/564x/16/3e/1a/163e1a79ab7b45324fc5b4c134665ef7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-lg">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-semibold">Resend Verification Email</h3>
          <p className="text-gray-600">Please enter your email address to resend the verification email.</p>
        </div>
        <form onSubmit={onFinish} className="space-y-4 mt-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white bg-black rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
            >
              {loading ? "Sending..." : "Resend Verification Email"}
            </button>
          </div>
        </form>
        <button
          onClick={() => (window.location.href = "/login")}
          className="mt-4 text-black underline hover:text-gray-500"
        >
          <ArrowLeftOutlined className="mr-2" />
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default ResendVerificationButton;

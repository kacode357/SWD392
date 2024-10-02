import React, { useState, useEffect } from "react";
import { Form, Button, message } from "antd";
import { verifyUserByIdApi } from "../../util/api"; // Adjust the path to your API file
import { useParams, useNavigate } from "react-router-dom"; // For extracting id and navigation

const VerifyAccount: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Use useParams to get the id from the URL
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigation hook

  // Automatically trigger verification when the component mounts
  useEffect(() => {
    if (id) {
      handleVerify(parseInt(id, 10)); // Ensure id is converted to a number
    }
  }, [id]);

  // Handle verification
  const handleVerify = async (userId: number) => {
    setLoading(true);
    const result = await verifyUserByIdApi(userId);
    console.log(result); // Log the result to the console for debugging
    message.success(`User with ID ${userId} has been verified successfully!`);

    // Redirect to login page after 10 seconds
    setTimeout(() => {
      navigate("/login"); // Adjust the path based on your routes
    }, 10000); // 10 seconds delay
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Verify Account</h1>
      {id ? (
        <p>Verifying user with ID: {id}...</p>
      ) : (
        <p>No ID provided in the URL.</p>
      )}
      <Form>
        {/* Optionally, you can add manual verification with a button here if needed */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Verify Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyAccount;

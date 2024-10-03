import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, notification } from 'antd'; // DatePicker for DOB
import { createUserApi } from '../util/api';
import FileUploader from '../util/FileUploader';  // Import FileUploader component

const { Option } = Select;

interface RegisterFormValues {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  gender: string;
  dob: any; // Keeping 'any' type to accommodate raw ISO string conversion
  address: string;
  imgUrl?: string;  // Include imgUrl in form values
}

interface RegisterFormProps {
  onRegisterSuccess: () => void; 
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = useState<string>(''); // State to hold uploaded image URL

  const onFinish = async (values: RegisterFormValues) => {
    const { email, password, name, phone_number, gender, dob, address } = values;
    console.log('Received values:', values);
    try {
      // Pass the uploaded image URL along with other form values
      const res = await createUserApi({ 
        email, 
        password, 
        userName: name, 
        phoneNumber: phone_number, 
        gender, 
        dob: dob ? dob.toISOString() : '', // Convert to ISO string format
        address, 
        imgUrl 
      });
      
      if (res) {
        notification.success({
          message: 'Success',
          description: 'Please verify your email to activate your account',
        });
        onRegisterSuccess(); // Trigger callback to switch to login form
      }
    } catch (error) {
     
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="form-container sign-up">
      <Form
        form={form}
        name="register_form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ gender: 'male' }}  // Default values for gender
      >
        <h1>Create Account</h1>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^\d{10}$/, message: 'Please enter a valid phone number!' },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {/* Removed confirm_password field */}

        {/* Added Gender field */}
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/* Added Date of Birth field */}
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select your date of birth!' }]}
        >
          <DatePicker style={{ width: '100%' }} placeholder="Select Date of Birth" />
        </Form.Item>

        {/* Added Address field */}
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input.TextArea placeholder="Address" rows={4} />
        </Form.Item>

        <Form.Item label="Profile Image">
          {/* Integrating the FileUploader component */}
          <FileUploader
            onUploadSuccess={(url: string) => setImgUrl(url)} // Save the uploaded image URL
            defaultImage=""  // Optional default image, if needed
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;

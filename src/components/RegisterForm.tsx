import React, { useState } from 'react';
import { Form, Input, Button, Select, notification, DatePicker, Row, Col } from 'antd';
import { createUserApi } from '../util/api';
import FileUploader from '../util/FileUploader'; 
const { Option } = Select;

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  dob: string;
  address: string;
  phoneNumber: string;
  gender: string;
  imgUrl: string;
}

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>(''); // State to store uploaded image URL

  const onFinish = async (values: RegisterFormValues) => {
    const { email, password, userName, dob, address, phoneNumber, gender } = values;

    try {
      console.log('Sending data to API:', { email, password, userName, dob, address, phoneNumber, gender, imgUrl: imageUrl });

      const res = await createUserApi({ email, password, userName, dob, address, phoneNumber, gender, imgUrl: imageUrl });
     
      if (res) {
        notification.success({
          message: 'Success',
          description: 'You have verify account logged in.',
        });
        onRegisterSuccess(); // Trigger callback to switch to login form
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'User not created',
      });
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="form-container sign-up  mt-5 mb-5">
      <Form
        form={form}
        name="register_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <h1>Create Account</h1>

        {/* FileUploader at the top, centered */}
        <Form.Item label="Upload Profile Picture" style={{ textAlign: 'center' }}>
          <FileUploader
            type="image"
            onUploadSuccess={(url: string) => setImageUrl(url)} 
          />
        </Form.Item>

        {/* Email and Username on the same row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="Username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
        </Row>

        {/* Password and Confirm Password on the same row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </Col>
        </Row>

        {/* Phone Number and Gender on the same row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: /^\d{10}$/, message: 'Please enter a valid phone number!' },
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select your gender!' }]}
            >
              <Select placeholder="Select a gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Date of Birth (Full Width) */}
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please input your date of birth!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        {/* Address (Full Width at the bottom) */}
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input placeholder="Address" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
import React, { useState } from 'react';
import { Modal, Button, Form, Input, notification } from 'antd';
import { createAdminUserApi } from '../../util/api'; // Adjust the import path

interface AddUserComponentProps {
  onSuccess: () => void; // Callback to trigger after successful user creation
}

const AddUserComponent: React.FC<AddUserComponentProps> = ({ onSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
   
      const values = await form.validateFields();
      await createAdminUserApi(values);
      notification.success({ message: `User created successfully` });
      setVisible(false);
      form.resetFields(); // Reset form fields
      onSuccess(); // Trigger parent component update
   
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add User
      </Button>
      <Modal
        title="Add New User"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input the password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input the phone number!' },
              {
                pattern: /^\d{10}$/,
                message: 'Phone number must be exactly 10 digits!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserComponent;

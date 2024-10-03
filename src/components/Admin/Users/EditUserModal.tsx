import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, DatePicker, message } from 'antd';
import moment from 'moment'; // Import moment for date formatting
import { getUserByIdApi, updateUserByIdApi } from '../../../util/api'; // Ensure correct path to the API
import FileUploader from '../../../util/FileUploader'; // Ensure correct path to the FileUploader

const { Option } = Select;

interface EditUserModalProps {
  userId: number;
  visible: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ userId, visible, onClose, refreshUsers }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageUploading, setImageUploading] = useState<boolean>(false); // Track image upload state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserByIdApi(userId);
        form.setFieldsValue({
          userName: userData.userName,
          dob: userData.dob ? moment(userData.dob) : null, // Set the default date with moment
          address: userData.address,
          phoneNumber: userData.phoneNumber,
          gender: userData.gender,
        });
        setImageUrl(userData.imgUrl); // Set the default image URL
      } catch (error) {
        message.error('Failed to fetch user data');
      }
    };

    if (visible) {
      fetchUserData();
    }
  }, [userId, visible, form]);

  const handleUploadSuccess = async (url: string) => {
    setImageUploading(true); // Start image uploading state
    try {
      setImageUrl(url);
      message.success('Image uploaded successfully');
    } finally {
      setImageUploading(false); // End image uploading state
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const updatedData = {
        ...values,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : null, // Format the date to string
        imgUrl: imageUrl, // Add the uploaded image URL to the update request
      };

      await updateUserByIdApi(userId, updatedData);
      message.success('User updated successfully');
      refreshUsers(); // Refresh the user list
      onClose(); // Close the modal
    } catch (error) {
      message.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* File uploader component - moved to top */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Form.Item label="Profile Picture" style={{ display: "inline-block" }}>
            <FileUploader onUploadSuccess={handleUploadSuccess} defaultImage={imageUrl} />
          </Form.Item>
        </div>

        <Form.Item
          label="User Name"
          name="userName"
          rules={[{ required: true, message: 'Please input the user name!' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: 'Please select the date of birth!' }]}
        >
          <DatePicker
            style={{ width: '100%' }} // Ensure full-width
            placeholder="Select your date of birth"
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input placeholder="Enter your address" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select a gender!' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} disabled={imageUploading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;

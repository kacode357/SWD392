import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { getUserByIdApi, updateUserByIdApi } from '../../util/api'; 
import { Input, Button, Form, message } from 'antd';
import FileUploader from '../../util/FileUploader';
import { FormInstance } from 'antd/lib/form';

const Setting: React.FC = () => {
  const { auth } = useContext(AuthContext); 
  const [form] = Form.useForm<FormInstance>();
  const [loading, setLoading] = useState<boolean>(false); 
  const [imageUrl, setImageUrl] = useState<string>(''); 
 
  useEffect(() => {
    // Fetch user data when the component is mounted
    const fetchUserData = async () => {
      try {
        const userData = await getUserByIdApi(auth.user.id);
        console.log('userData', userData);
        form.setFieldsValue(userData);
        setImageUrl(userData.imgUrl); 
      } catch (error) {
        message.error('Failed to fetch user data.');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [auth.user.id, form]);

  const handleUpdate = async (values: any ) => {
    setLoading(true);
    try {
      const updatedUser = { ...values, imgUrl: imageUrl };
      await updateUserByIdApi(auth.user.id, updatedUser);
      message.success('User updated successfully');
    } catch (error) {
      message.error('Failed to update user.');
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url); 
    message.success('Image uploaded successfully');
  };

  return (
    <div>
      <h2>Settings</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          name="userName"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please enter your date of birth' }]}
        >
          <Input placeholder="Enter your date of birth" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
        >
          <Input placeholder="Enter your address" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
        >
          <Input placeholder="Enter your gender" />
        </Form.Item>

        <Form.Item label="Profile Picture">
          <FileUploader onUploadSuccess={handleImageUpload} defaultImage={imageUrl} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Setting;

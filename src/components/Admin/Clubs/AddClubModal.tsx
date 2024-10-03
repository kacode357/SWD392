import React, { useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, message } from 'antd'; // Import DatePicker from antd
import { createClubApi } from '../../../util/api'; // Import your API
import FileUploader from '../../../util/FileUploader'; // Import the FileUploader component

interface AddClubModalProps {
  visible: boolean;
  onClose: () => void;
  refreshClubs: () => void;
}

const AddClubModal: React.FC<AddClubModalProps> = ({ visible, onClose, refreshClubs }) => {
  const [form] = Form.useForm();
  const [clubLogo, setClubLogo] = useState<string>(''); // Store the uploaded club logo URL
  const [loading, setLoading] = useState(false);

  // Handle the submission of the form
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!clubLogo) {
        message.error('Please upload a club logo.');
        return;
      }

      // Convert the establishedYear to ISO 8601 string
      const data = {
        ...values,
        establishedYear: values.establishedYear.toISOString(), // Convert moment object to ISO string
        clubLogo, // Attach the uploaded club logo URL
      };

      setLoading(true);
      await createClubApi(data); // Call the API to create a new club
      message.success('Club created successfully!');
      refreshClubs(); // Refresh the list of clubs after creation
      onClose(); // Close the modal
      form.resetFields(); // Reset form fields
      setClubLogo(''); // Clear the logo state
      setLoading(false);
    } catch (error) {
      console.error('Failed to create club:', error);
      message.error('Failed to create club.');
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Club"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
          Add Club
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Club Name" name="name" rules={[{ required: true, message: 'Please input the club name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please input the country!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Established Year"
          name="establishedYear"
          rules={[{ required: true, message: 'Please select the established year!' }]}
        >
          {/* Use DatePicker to select only the year */}
          <DatePicker picker="year" format="YYYY" />
        </Form.Item>
        <Form.Item label="Stadium Name" name="stadiumName" rules={[{ required: true, message: 'Please input the stadium name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        {/* Club Logo Upload */}
        <Form.Item label="Club Logo" required>
          <FileUploader
            onUploadSuccess={(url: string) => setClubLogo(url)} // Capture the uploaded file URL
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClubModal;

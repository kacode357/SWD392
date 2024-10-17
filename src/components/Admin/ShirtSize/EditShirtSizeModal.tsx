import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';

interface EditShirtSizeModalProps {
  sizeId: number; // ID of the size to edit
  visible: boolean; // Modal visibility status
  onClose: () => void; // Function to close the modal
  refreshSizes: () => void; // Function to refresh size list after edit
}

const EditShirtSizeModal: React.FC<EditShirtSizeModalProps> = ({  visible, onClose, refreshSizes }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock fetching size details for demo purposes
  useEffect(() => {
    if (visible) {
      const fetchMockSizeDetails = () => {
        // Simulate API response with mock data
        const mockData = {
          name: 'Large',
          description: 'Suitable for taller individuals',
        };
        form.setFieldsValue(mockData); // Populate form with mock data
      };

      fetchMockSizeDetails();
    }
  }, [visible, form]);

  const handleOk = async () => {
    setLoading(true);
    try {
      // Simulate successful update without API call
      console.log('Updated size data:', form.getFieldsValue());
      message.success('Size updated successfully');
      refreshSizes(); // Refresh size list
      onClose(); // Close modal
    } catch (error) {
      message.error('Failed to update size');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Shirt Size"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item 
          name="name" 
          label="Size Name" 
          rules={[{ required: true, message: 'Please enter size name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditShirtSizeModal;

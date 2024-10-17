import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import { createShirtSizeApi, searchShirtApi, searchSizeApi } from '../../../util/api'; // Import API phù hợp

interface AddShirtSizeModalProps {
  visible: boolean; // Trạng thái hiển thị modal
  onClose: () => void; // Hàm để đóng modal
  refreshSizes: () => void; // Hàm để làm mới danh sách kích thước sau khi thêm mới
}

const { Option } = Select;

const AddShirtSizeModal: React.FC<AddShirtSizeModalProps> = ({ visible, onClose, refreshSizes }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [shirts, setShirts] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);

  // Fetch list of shirts and sizes for the dropdowns
  useEffect(() => {
    const fetchShirtsAndSizes = async () => {
      try {
        const shirtResponse = await searchShirtApi({
          pageNum: 1,
          pageSize: 100, // Adjust as needed
          keyWord: '',
          status: 1, // Active shirts
        });
        const sizeResponse = await searchSizeApi({
          pageNum: 1,
          pageSize: 100, // Adjust as needed
          keyWord: '',
          status: true, // Active sizes
        });
        setShirts(shirtResponse.pageData);
        setSizes(sizeResponse.pageData);
      } catch (error) {
        message.error('Failed to load shirts or sizes');
      }
    };

    if (visible) {
      fetchShirtsAndSizes();
    }
  }, [visible]);

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue();
      const data = {
        shirtId: values.shirtId,
        sizeId: values.sizeId,
        quantity: values.quantity,
        description: values.description || '',
        status: true, // Set default status to active
      };

      await createShirtSizeApi(data); // Gọi API tạo mới shirt size
      message.success('Shirt size added successfully');
      refreshSizes(); // Làm mới danh sách kích thước
      onClose(); // Đóng modal
      form.resetFields(); // Reset form sau khi thêm
    } catch (error) {
      message.error('Failed to add shirt size');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Shirt Size"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        {/* Select Shirt */}
        <Form.Item name="shirtId" label="Select Shirt" rules={[{ required: true, message: 'Please select a shirt' }]}>
          <Select placeholder="Select a shirt">
            {shirts.map((shirt) => (
              <Option key={shirt.id} value={shirt.id}>
                {shirt.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Select Size */}
        <Form.Item name="sizeId" label="Select Size" rules={[{ required: true, message: 'Please select a size' }]}>
          <Select placeholder="Select a size">
            {sizes.map((size) => (
              <Option key={size.id} value={size.id}>
                {size.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Quantity */}
        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
          <Input type="number" min={1} placeholder="Enter quantity" />
        </Form.Item>

        {/* Description */}
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter description (optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddShirtSizeModal;

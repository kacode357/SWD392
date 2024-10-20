import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { getShirtSizeByIdApi, updateShirtSizeApi, getSizeApi } from '../../../util/api'; // Đảm bảo đường dẫn chính xác đến file chứa các API

interface EditShirtSizeModalProps {
  sizeId: number; 
  visible: boolean; 
  onClose: () => void; 
  refreshSizes: () => void; 
}

const EditShirtSizeModal: React.FC<EditShirtSizeModalProps> = ({ sizeId, visible, onClose, refreshSizes }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState<any[]>([]);
  
  useEffect(() => {
    if (visible) {
      const fetchSizeDetails = async () => {
        try {
          const sizeData = await getSizeApi({
            pageNum: 1,
            pageSize: 10,
            keyWord: '',
            status: true,
          });
          setSizes(sizeData.pageData || []); 
          
          const shirtSizeDetails = await getShirtSizeByIdApi(sizeId);
          form.setFieldsValue({
            ...shirtSizeDetails,
            sizeId: shirtSizeDetails.sizeId 
          });
        } catch (error) {
          message.error('Failed to fetch size details');
        }
      };

      fetchSizeDetails();
    }
  }, [visible, sizeId, form]);

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue();
      await updateShirtSizeApi(sizeId, {
        shirtId: values.shirtId, 
        sizeId: values.sizeId, // Gửi size ID được chọn
        quantity: values.quantity, 
        description: values.description,
        status: values.status,
      });
      message.success('Size updated successfully');
      refreshSizes(); 
      onClose(); 
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
          name="sizeId" 
          label="Size" 
          rules={[{ required: true, message: 'Please select a size' }]}
        >
          <Select>
            {sizes && sizes.length > 0 ? sizes.map((size: any) => (
              <Select.Option key={size.id} value={size.id}>
                {size.name}
              </Select.Option>
            )) : <Select.Option disabled>No sizes available</Select.Option>}
          </Select>
        </Form.Item>
        <Form.Item 
          name="quantity" 
          label="Quantity" 
          rules={[{ required: true, message: 'Please enter quantity' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditShirtSizeModal;

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, message, InputNumber } from "antd";
import { getShirtByIdApi, updateShirtApi, getTypeShirtApi, getPlayerApi } from "../../../util/api"; 
import FileUploader from "../../../util/FileUploader"; 

const { Option } = Select;

interface EditShirtModalProps {
  shirtId: number;
  visible: boolean;
  onClose: () => void;
  refreshShirts: () => void;
}

const EditShirtModal: React.FC<EditShirtModalProps> = ({ shirtId, visible, onClose, refreshShirts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [typeShirts, setTypeShirts] = useState([]);
  const [players, setPlayers] = useState([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fetchTypeShirts = async (keyword = "") => {
    const data = {
      pageNum: 1,
      pageSize: 10,
      keyWord: keyword,
      status: true,
    };
    const response = await getTypeShirtApi(data);
    setTypeShirts(response.pageData);
  };

  const fetchPlayers = async (keyword = "") => {
    const data = {
      pageNum: 1,
      pageSize: 10,
      keyWord: keyword,
      status: true,
    };
    const response = await getPlayerApi(data);
    setPlayers(response.pageData);
  };

  useEffect(() => {
    if (shirtId && visible) {
      getShirtByIdApi(shirtId).then((shirt) => {
        form.setFieldsValue({
          name: shirt.name,
          number: shirt.number,
          price: shirt.price,
       
          description: shirt.description,
          typeShirtId: shirt.typeShirtId,
          playerId: shirt.playerId,
        });
        setImageUrl(shirt.urlImg || null);
      });
      fetchTypeShirts();
      fetchPlayers();
    }
  }, [shirtId, visible]);

  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();
      if (!imageUrl) {
        message.error("Please upload an image");
        return;
      }
      setLoading(true);
      await updateShirtApi(shirtId, {
        ...values,
        urlImg: imageUrl,
        status: 1,
        date : new Date().toISOString()
      });
      message.success("Shirt updated successfully");
      refreshShirts();
      onClose();
    } catch (error) {
      message.error("Failed to update shirt");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUploadSuccess = (url: string) => {
    setImageUrl(url);
    message.success("Image uploaded successfully");
  };

  return (
    <Modal
      title="Edit Shirt"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Shirt Name"
          rules={[{ required: true, message: "Please enter shirt name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="typeShirtId"
          label="Select Type Shirt"
          rules={[{ required: true, message: "Please select a type shirt" }]}
        >
          <Select
            showSearch
            placeholder="Search and select a type shirt"
            filterOption={false}
            onSearch={fetchTypeShirts}
          >
            {typeShirts.map((typeShirt: any) => (
              <Option key={typeShirt.id} value={typeShirt.id}>
                {typeShirt.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="playerId"
          label="Select Player"
          rules={[{ required: true, message: "Please select a player" }]}
        >
          <Select
            showSearch
            placeholder="Search and select a player"
            filterOption={false}
            onSearch={fetchPlayers}
          >
            {players.map((player: any) => (
              <Option key={player.id} value={player.id}>
                {player.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="number"
          label="Shirt Number"
          rules={[{ required: true, message: "Please enter shirt number" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

   

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="urlImg"
          label="Image"
        >
          <FileUploader onUploadSuccess={handleImageUploadSuccess} defaultImage={imageUrl || undefined} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditShirtModal;

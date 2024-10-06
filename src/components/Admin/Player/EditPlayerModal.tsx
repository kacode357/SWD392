import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { getPlayerByIdApi, updatePlayerApi } from "../../../util/api"; // Import the API for player details and update

interface EditPlayerModalProps {
  visible: boolean;
  playerId: number;
  onClose: () => void; // Function to close the modal
  refreshPlayers: () => void; // Function to refresh the player list
}

const EditPlayerModal: React.FC<EditPlayerModalProps> = ({ visible, playerId, onClose, refreshPlayers }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchPlayerDetails();
    }
  }, [visible]);

  const fetchPlayerDetails = async () => {
    try {
      const response = await getPlayerByIdApi(playerId);
      if (response) {
        form.setFieldsValue({
          fullName: response.fullName,
          height: response.height,
          weight: response.weight,
          birthday: response.birthday,
          nationality: response.nationality,
          clubId: response.clubId,
        });
      } else {
        message.error("Failed to fetch player details");
      }
    } catch (error) {
      message.error("Error fetching player details");
    }
  };

  const handleUpdatePlayer = async (values: any) => {
    setLoading(true);
    try {
      const response = await updatePlayerApi(playerId, values);
      setLoading(false);
      if (response) {
        message.success("Player updated successfully");
        refreshPlayers();
        onClose(); // Close the modal after successful update
      } else {
        message.error("Failed to update player");
      }
    } catch (error) {
      setLoading(false);
      message.error("Error updating player");
    }
  };

  return (
    <Modal
      title="Edit Player"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdatePlayer}>
        <Form.Item name="fullName" label="Player Name" rules={[{ required: true, message: "Please enter player name" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="height" label="Height" rules={[{ required: true, message: "Please enter player height" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="weight" label="Weight" rules={[{ required: true, message: "Please enter player weight" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="birthday" label="Birth Date" rules={[{ required: true, message: "Please enter birth date" }]}>
          <Input type="date" />
        </Form.Item>
        <Form.Item name="nationality" label="Nationality" rules={[{ required: true, message: "Please enter nationality" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="clubId" label="Club ID" rules={[{ required: true, message: "Please enter club ID" }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPlayerModal;

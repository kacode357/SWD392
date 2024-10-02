import React from "react";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import { createStaffApi, createManagerApi } from "../../util/api"; // Ensure the path is correct

const { Option } = Select;

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void; // Callback function to close modal
  refreshUsers: () => void; // Callback function to refresh the user table
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  onClose,
  refreshUsers,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const { email, password, name, role } = values;

    if (role === "manager") {
      await createManagerApi(email, password, name);
    } else {
      await createStaffApi(email, password, name);
    }

    notification.success({
      message: "Success",
      description: "User created successfully!",
    });
    form.resetFields(); // Reset the form fields
    refreshUsers(); // Refresh the user data in the table
    onClose(); // Close the modal
  };

  const handleCancel = () => {
    form.resetFields(); // Reset the form when the modal is canceled
    onClose(); // Close the modal
  };

  return (
    <Modal
      title="Add User"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="staff">Staff</Option>
            <Option value="manager">Manager</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;

import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface EditActionProps {
  userId: number;
  refreshUsers: () => void;
}

const EditAction: React.FC<EditActionProps> = ({ userId, refreshUsers }) => {
  const handleEdit = async () => {
    console.log(`Edit action for user with id: ${userId}`);
    // Giả sử có API update thông tin người dùng
  
    refreshUsers(); // Gọi lại hàm fetchUsers sau khi edit thành công
  };

  return (
    <Button
      icon={<EditOutlined />}
      onClick={handleEdit}
      type="primary"
    />
  );
};

export default EditAction;

import { Switch } from "antd";
import React from "react";

interface ToggleStatusButtonProps {
  status: boolean;
  userId: number;
  refreshUsers: () => void;
}

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({
  status,
  userId,
  refreshUsers,
}) => {
  const handleToggle = async () => {
    console.log(`Toggled status for user with id: ${userId}`);
    // Giả sử có API để đổi trạng thái người dùng
  
    refreshUsers(); // Gọi lại hàm fetchUsers sau khi đổi trạng thái thành công
  };

  return (
    <Switch
      checked={status}
      onChange={handleToggle}
      checkedChildren="Active"
      unCheckedChildren="Inactive"
    />
  );
};

export default ToggleStatusButton;

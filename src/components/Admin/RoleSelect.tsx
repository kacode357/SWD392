import { Select } from "antd";
import React from "react";

const { Option } = Select;

interface RoleSelectProps {
  role: string;
  userId: number;
  refreshUsers: () => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  role,
  userId,
  refreshUsers,
}) => {
  const handleRoleChange = async (value: string) => {
    console.log(`Role changed for user with id: ${userId}, new role: ${value}`);
    // Giả sử có API để thay đổi vai trò người dùng
   
    refreshUsers(); // Gọi lại hàm fetchUsers sau khi đổi vai trò thành công
  };

  return (
    <Select defaultValue={role} onChange={handleRoleChange}>
      <Option value="admin">Admin</Option>
      <Option value="user">User</Option>
      <Option value="editor">Editor</Option>
    </Select>
  );
};

export default RoleSelect;

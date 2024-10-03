import { Switch, message } from "antd";
import React from "react";
import { changeUserStatusApi } from "../../util/api"; // Sửa tên API phù hợp

interface ToggleStatusButtonProps {
  isDelete: boolean; // Thay đổi từ status sang isDelete
  userId: number;
  refreshUsers: () => void;
}

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({
  isDelete,
  userId,
  refreshUsers,
}) => {
  const handleToggle = async (checked: boolean) => {
    try {
      // Gọi API để thay đổi trạng thái isDelete
      await changeUserStatusApi(userId, !checked);

      // Hiển thị thông báo thành công
      message.success(`User status updated to ${checked ? "Active" : "Deleted"}`);

      // Refresh lại danh sách người dùng sau khi thay đổi trạng thái
      refreshUsers();
    } catch (error) {
      // Hiển thị lỗi nếu API thất bại
      message.error("Failed to update user status.");
      console.error("Error updating user status:", error);
    }
  };

  return (
    <Switch
      checked={!isDelete} // Hiển thị nút bật tắt theo trạng thái isDelete
      onChange={handleToggle}
      checkedChildren="Active"
      unCheckedChildren="Deleted"
    />
  );
};

export default ToggleStatusButton;

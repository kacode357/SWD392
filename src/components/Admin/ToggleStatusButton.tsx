import { Switch, message } from "antd";
import React from "react";
import { changeUserStatusApi } from "../../util/api"; // Import API to change status

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
    try {
      // Toggle the status value
      const newStatus = !status;
      
      // Call the API with true/false values for the status
      console.log("newStatus", userId);
      await changeUserStatusApi(userId, newStatus);
      
      // Show success message
      message.success(`User status updated to ${newStatus ? "Active" : "Inactive"}`);
      
      // Refresh the users list after the status change
      refreshUsers();
    } catch (error) {
      // Show error message if the API call fails
      message.error("Failed to update user status.");
      console.error("Error updating user status:", error);
    }
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

import React from "react";
import { Button, message } from "antd";
import { changePlayerStatusApi } from "../../../util/api"; // Import the API to toggle status

interface ToggleStatusButtonProps {
  isDelete: boolean;
  playerId: number;
  refreshPlayers: () => void; // Function to refresh the player list
}

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({ isDelete, playerId, refreshPlayers }) => {
  const handleToggleStatus = async () => {
    const response = await changePlayerStatusApi (playerId, isDelete );
    if (response.success) {
      message.success(isDelete ? "Player deactivated successfully" : "Player activated successfully");
      refreshPlayers(); // Refresh the player list after toggling status
    } else {
      message.error("Failed to update player status");
    }
  };

  return (
    <Button
      type={isDelete ? "default" : "primary"}
      onClick={handleToggleStatus}
    >
      {isDelete ? "Deactivate" : "Activate"}
    </Button>
  );
};

export default ToggleStatusButton;

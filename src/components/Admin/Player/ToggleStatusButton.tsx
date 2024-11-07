import React, { useState } from "react";
import { Switch, message } from "antd";
import { changePlayerStatusApi } from "../../../util/api"; // Import the actual API

interface ToggleStatusButtonProps {
  isDelete: boolean; // Initial status: true means the player is deactivated
  playerId: number; // Change this to playerId
  refreshPlayers: () => void;
}

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({ isDelete, playerId, refreshPlayers }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(!isDelete); // Track the current status locally

  // Function to toggle the player's status
  const toggleStatus = async (checked: boolean) => {
    setLoading(true);
    try {
   
      await changePlayerStatusApi(playerId, checked); // Call the API with the new status
   
      message.success(`Player ${checked ? "activated" : "deactivated"} successfully!`);
      setStatus(checked); // Update local status after successful change
      refreshPlayers(); // Refresh the list of players
    } catch (error) {
      message.error("Failed to change player status.");
      console.error("Error changing player status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={status} // Switch's checked status based on the current status
      onChange={toggleStatus} // Handle toggle action
      loading={loading} // Show loading state while processing
      checkedChildren="Active" // Label for active state
      unCheckedChildren="Inactive" // Label for inactive state
    />
  );
};

export default ToggleStatusButton;

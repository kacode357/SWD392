import React, { useState } from 'react';
import { Switch, message } from 'antd';
import { changeClubStatusApi } from '../../../util/api'; // Import the actual API

interface ToggleStatusButtonProps {
  isDelete: boolean; // If true, the club is deactivated
  clubId: number;
  refreshClubs: () => void;
}

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({ isDelete, clubId, refreshClubs }) => {
  const [loading, setLoading] = useState(false);

  // Function to toggle the club's status
  const toggleStatus = async (checked: boolean) => {
    setLoading(true);
    try {
      const newStatus = checked; // The new status is based on the checked value of the switch
      await changeClubStatusApi(clubId, newStatus); // Call the API with the new status
      message.success(`Club ${newStatus ? 'activated' : 'deactivated'} successfully!`);
      refreshClubs(); // Refresh the list of clubs after the status change
    } catch (error) {
      message.error('Failed to change club status.');
      console.error('Error changing club status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={!isDelete} // If the club is active, the switch is "checked"
      onChange={toggleStatus} // Trigger the toggle action
      loading={loading} // Show loading when the API call is in progress
      checkedChildren="Active" // Label for active status
      unCheckedChildren="Inactive" // Label for inactive status
    />
  );
};

export default ToggleStatusButton;

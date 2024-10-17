import React, { useState } from 'react';
import { Switch, message } from 'antd';

interface ToggleStatusButtonProps {
  isDelete: boolean; // true if deleted, false if active
  sizeId: number; // ID of the shirt size
  refreshSizes: () => void; // Function to refresh the size list after status change
}

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({ isDelete, sizeId, refreshSizes }) => {
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setLoading(true);
    try {
      // Simulate API call with a console log
      console.log(`Toggling size ID: ${sizeId}, new status: ${checked ? 'active' : 'inactive'}`);
      message.success(`Size ${checked ? 'activated' : 'deactivated'} successfully`);

      refreshSizes(); // Refresh the size list
    } catch (error) {
      message.error('Failed to change status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={!isDelete}
      onChange={handleToggle}
      loading={loading}
    />
  );
};

export default ToggleStatusButton;

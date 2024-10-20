import React, { useState } from 'react';
import { Switch, message } from 'antd';
import { deleteShirtSizeApi } from '../../../util/api'; // Adjust the path to your actual API file

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
      // Call the API to update the size status
      const status = !checked; // Invert the checked value for the API (if checked, it's active, otherwise it's inactive)
      await deleteShirtSizeApi(sizeId, status);

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
      checkedChildren="Active" // Label for active status
      unCheckedChildren="Inactive" // Label for inactive status
    />
  );
};

export default ToggleStatusButton;

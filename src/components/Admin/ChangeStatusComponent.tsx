import React from 'react';
import { Switch, notification } from 'antd';
import { changeUserStatusApi } from '../../util/api'; // Import API function

interface ChangeStatusComponentProps {
    userId: string;
    currentStatus: 'active' | 'inactive';
    onSuccess: () => void;
}

const ChangeStatusComponent: React.FC<ChangeStatusComponentProps> = ({ userId, currentStatus, onSuccess }) => {
    const handleToggle = async () => {
    
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        // Gọi API để thay đổi trạng thái của người dùng
        await changeUserStatusApi({ user_id: userId, status: newStatus });
        notification.success({ message: `Đã thay đổi trạng thái thành công` });

        // Sau khi API thành công, gọi lại onSuccess để load lại danh sách người dùng
        onSuccess();

    };

    return <Switch checked={currentStatus === 'active'} onChange={handleToggle} />;
};

export default ChangeStatusComponent;

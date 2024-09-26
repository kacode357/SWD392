import React from 'react';
import { Select, notification } from 'antd';
import { changeUserRoleApi } from '../../util/api'; // Import API function

const { Option } = Select;

interface ChangeRoleComponentProps {
    userId: string;
    currentRole: 'Admin' | 'user';
    onSuccess: () => void;
}

const ChangeRoleComponent: React.FC<ChangeRoleComponentProps> = ({ userId, currentRole, onSuccess }) => {
    const handleChange = async (newRole: 'Admin' | 'user') => {

        // Gọi API để thay đổi vai trò của người dùng
        await changeUserRoleApi({ user_id: userId, role: newRole });
        notification.success({ message: `Đã thay đổi vai trò thành công` });

        // Sau khi API thành công, gọi lại onSuccess để load lại danh sách người dùng
        onSuccess();

    };

    return (
        <Select value={currentRole} onChange={(value) => handleChange(value as 'Admin' | 'user')}>
            <Option value="Admin">Admin</Option>
            <Option value="user">User</Option>
        </Select>
    );
};

export default ChangeRoleComponent;

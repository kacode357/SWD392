import React from 'react';
import { Button, Popconfirm, notification } from 'antd';
import { deleteUserApi } from '../../util/api'; // Import API function

interface DeleteUserComponentProps {
    userId: string;
    onSuccess: () => void;
}

const DeleteUserComponent: React.FC<DeleteUserComponentProps> = ({ userId, onSuccess }) => {
    const handleDelete = async () => {

        // Gọi API để xóa người dùng
        await deleteUserApi(userId);
        notification.success({ message: `Đã xóa người dùng thành công` });

        // Sau khi API thành công, gọi lại onSuccess để load lại danh sách người dùng
        onSuccess();

    };

    return (
        <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
        >
            <Button type="primary" danger>
                Delete
            </Button>
        </Popconfirm>
    );
};

export default DeleteUserComponent;

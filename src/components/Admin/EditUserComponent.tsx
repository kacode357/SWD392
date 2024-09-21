import React, { useState } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';
import { updateAccountApi } from '../../util/api'; // Import API function

interface EditUserComponentProps {
    userId: string;
    userName: string;
    phoneNumber: string;
    avatar: string;
    onSuccess: () => void;
}

const EditUserComponent: React.FC<EditUserComponentProps> = ({ userId, userName, phoneNumber, avatar, onSuccess }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
        // Set initial form values with current user data
        form.setFieldsValue({
            name: userName,
            phone_number: phoneNumber,
            avatar: avatar,
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = async () => {

        const values = await form.validateFields();
        // Gọi API để cập nhật thông tin người dùng
        await updateAccountApi(userId, values);
        notification.success({ message: `Đã cập nhật thông tin người dùng thành công` });

        // Sau khi API thành công, gọi lại onSuccess để load lại danh sách người dùng
        onSuccess();
        setIsModalVisible(false);

    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal
                title="Edit User"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Submit"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name: userName,
                        phone_number: phoneNumber,
                        avatar: avatar,
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        rules={[{ required: true, message: 'Please input the phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Avatar URL"
                        name="avatar"
                        rules={[{ required: true, message: 'Please input the avatar URL!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditUserComponent;

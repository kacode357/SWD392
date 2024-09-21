import { Form, Input, Button, Select, notification } from 'antd';
import { createUserApi } from '../util/api';
const { Option } = Select;

interface RegisterFormValues {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}

interface RegisterFormProps {
  onRegisterSuccess: () => void; 
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [form] = Form.useForm();
  

  const onFinish = async (values: RegisterFormValues) => {
    const { email, password, name, role, phone_number } = values;

    try {
      const res = await createUserApi({ name, email, password, phone_number, role });
      if (res) {
        notification.success({
          message: 'Success',
          description: 'User created successfully',
        });
        onRegisterSuccess(); // Trigger callback to switch to login form
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'User not created',
      });
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="form-container sign-up">
      <Form
        form={form}
        name="register_form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ role: 'user' }}  // Default value for role
      >
        <h1>Create Account</h1>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^\d{10}$/, message: 'Please enter a valid phone number!' },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select your role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
            <Option value="staff">Staff</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;

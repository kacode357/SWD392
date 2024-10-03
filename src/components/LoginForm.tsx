import React, { useContext } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCurrentLogin, loginUserApi } from '../util/api';
import { AuthContext } from '../context/auth.context';


interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values: LoginFormValues) => {
    const { email, password } = values;
    const data = { email, password };
  
    const resDataToken = await loginUserApi(data);
    if (resDataToken) {
      localStorage.setItem('token', resDataToken.token);
  
      const resDataLogin = await getCurrentLogin();
      console.log(resDataLogin);
  
      notification.success({
        message: 'Successful',
        description: 'You have successfully logged in.',
      });
  
      setAuth({
        isAuthenticated: true,
        user: {
          id: resDataLogin?.id,
          imgUrl: resDataLogin?.imgUrl,
          email: resDataLogin?.email,
          name: resDataLogin?.name,
          role: resDataLogin?.role,
        },
      });
    
      // Redirect based on role
      if (resDataLogin?.roleName === 'Admin') {
        console.log('Admin');
        window.location.href = '/manager-user';
        return; // Ensure navigation stops here
      } else {
        
        navigate('/');
        return; // Ensure navigation stops here
      }
    } else {
      notification.error({
        message: 'Error',
        description: resDataToken.EM || 'Something went wrong!',
      });
    }
  };
  
  return (
    <div className="form-container sign-in">
      <Form<LoginFormValues> name="login_form" onFinish={onFinish} layout="vertical">
        <img src="src/assets/logo1.jfif" className="w-full" alt="" />
        <h1 className="font-bold text-2xl ">Sign In</h1>
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
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Sign In
        </Button>
        <div className="text-center mt-4">
          <button className="text-blue-500 hover:underline" onClick={() => (window.location.href = '/')}>
            Back to HomePage
          </button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

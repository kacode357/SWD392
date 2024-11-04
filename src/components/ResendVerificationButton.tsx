import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Space,
  Row,
  Col,
  notification,
} from "antd";
import { resendVerificationApi } from "../util/api";

const { Title, Text } = Typography;

const ResendVerificationButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      await resendVerificationApi(values.email);
      notification.success({
        message: "Email Sent",
        description:
          "A verification email has been sent to your registered email address.",
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Col xs={24} sm={18} md={12} lg={8}>
        <Card
          bordered={false}
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={3} style={{ textAlign: "center" }}>
              Resend Verification Email
            </Title>
            <Text type="secondary" style={{ textAlign: "center" }}>
              Please enter your email address to resend the verification email.
            </Text>
            <Form
              name="resend_verification_form"
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Resend Verification Email
                </Button>
              </Form.Item>
              <Text
  style={{
    color: "black",
    position: "absolute",
    bottom: 10,
    right: 10,
    cursor: "pointer",
    textDecoration: "underline", // Thêm gạch dưới
  }}
  onClick={() => (window.location.href = "/login")}
  onMouseEnter={(e) => (e.currentTarget.style.color = "blue")}
  onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
>
  Back to Home Page
</Text>

            </Form>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default ResendVerificationButton;

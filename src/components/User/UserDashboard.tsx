import  { useState, useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import { getDashboardUserApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState({ orderCount: 0, paymentCount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardUserApi();
        setDashboardData(response);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Row gutter={16} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            onClick={() => navigate('/user/order-history')}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #87e8de, #36cfc9)',
              color: '#00574B',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease', // Transition for smooth scaling
            }}
            hoverable
            className="zoom-card" // Add custom class for zoom effect
          >
            <ShoppingCartOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Orders</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.orderCount}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            onClick={() => navigate('/user/payment-history')}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ff9c6e, #ff7a45)',
              color: '#7f1d1d',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease', // Transition for smooth scaling
            }}
            hoverable
            className="zoom-card" // Add custom class for zoom effect
          >
            <DollarOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Payments</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.paymentCount}</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;

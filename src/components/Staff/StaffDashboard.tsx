import  { useState, useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { getDashboardStaffApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const StaffDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalPayments: 0,
    totalSalesAmount: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardStaffApi();
        setDashboardData(response);
      } catch (error) {
        console.error("Error fetching staff dashboard data:", error);
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
            onClick={() => navigate('/staff/manager-order')}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #87e8de, #36cfc9)',
              color: '#00574B',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            hoverable
            className="zoom-card"
          >
            <ShoppingCartOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Total Orders</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.totalOrders}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            onClick={() => navigate('/staff/manager-payment')}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ff9c6e, #ff7a45)',
              color: '#7f1d1d',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            hoverable
            className="zoom-card"
          >
            <DollarOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Total Payments</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.totalPayments}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffe58f, #ffc53d)',
              color: '#ad6800',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            hoverable
            className="zoom-card"
          >
            <MoneyCollectOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Total Sales Amount</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>
              {dashboardData.totalSalesAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffDashboard;

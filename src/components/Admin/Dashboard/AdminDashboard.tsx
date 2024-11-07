import { useState, useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { UserOutlined, TeamOutlined, CalendarOutlined, TrophyOutlined, ShopOutlined, TagOutlined, ShoppingCartOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { getDashboardAdminApi } from '../../../util/api';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    clubCount: 0,
    sessionCount: 0,
    playerCount: 0,
    shirtCount: 0,
    typeShirtCount: 0,
    orderCount: 0,
    totalSalesAmount: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardAdminApi();
        setDashboardData(response);
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Row gutter={16} justify="center">
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            onClick={() => navigate('/admin/manager-user')}
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
            <UserOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Users</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.userCount}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            onClick={() => navigate('/admin/manager-session')}
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
            <CalendarOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Seasons</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.sessionCount}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            onClick={() => navigate('/admin/manager-club')}
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
            <TeamOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Clubs</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.clubCount}</Text>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            onClick={() => navigate('/admin/manager-player')}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #a0d911, #73d13d)',
              color: '#237804',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            hoverable
            className="zoom-card"
          >
            <TrophyOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Players</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.playerCount}</Text>
          </Card>
        </Col>
      </Row>
      {/* Thêm khoảng cách giữa hàng 1 và hàng 2 */}
      <Row gutter={16} justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            onClick={() => navigate('/admin/manager-shirt')}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f759ab, #eb2f96)',
              color: '#9e1068',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            hoverable
            className="zoom-card"
          >
            <ShopOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Shirts</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.shirtCount}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            onClick={() => navigate('/admin/manager-type-shirt')}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #69c0ff, #40a9ff)',
              color: '#0050b3',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            hoverable
            className="zoom-card"
          >
            <TagOutlined style={{ fontSize: '40px', color: '#fff' }} />
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Type of Shirts</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.typeShirtCount}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            onClick={() => navigate('/admin/manager-order')}
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
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>{dashboardData.orderCount}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
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
            <h3 style={{ color: '#fff', marginTop: '10px' }}>Total Sales</h3>
            <Text strong style={{ fontSize: '28px', color: '#fff' }}>
              {dashboardData.totalSalesAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;

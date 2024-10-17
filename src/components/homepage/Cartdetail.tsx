import React, { useState, useEffect } from "react";
import { getCartApi } from "../../util/api"; // Import API
import { Row, Col, Image, Typography, Button } from "antd";

const { Title, Text } = Typography;

const Cartdetail: React.FC = () => {
  const [cartData, setCartData] = useState<any>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCartApi();
        console.log("Cart Data:", data);
        setCartData(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  if (!cartData) {
    return <div>Loading...</div>;
  }

  const { orderDetails, totalPrice } = cartData;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Giỏ hàng của bạn</Title>
      
      {/* Chia layout 7:3 */}
      <Row gutter={[16, 16]}>
        {/* Cột 7 phần: Hiển thị danh sách giỏ hàng */}
        <Col span={16}>
          <Row gutter={[16, 16]}>
            {orderDetails.map((item: any) => (
              <Col key={item.id} span={24}>
                <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={item.shirtUrlImg}
                    alt={item.shirtName}
                    width={120}
                    height={120}
                    style={{ objectFit: "cover", borderRadius: "8px", marginRight: '16px' }}
                  />
                  <div style={{ flex: 1 , marginLeft : "15px"}}>
                    <Title level={4} style={{ marginBottom: "8px" }}>{item.shirtName}</Title>
                    <Text>Số lượng: {item.quantity}</Text>
                    <br />
                    <Text>Giá mỗi chiếc: {item.shirtPrice}</Text>
                    <br />
                    <Text>Tổng: {item.shirtPrice * item.quantity}</Text>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Cột 3 phần: Hiển thị tổng tiền và nút thanh toán */}
        <Col span={8}>
          <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
            <Title level={3}>Tổng đơn hàng</Title>
            <div style={{ marginBottom: "16px" }}>
              <Text strong>Tổng tiền: </Text>
              <Text>{totalPrice}</Text>
            </div>
            <Button type="primary" size="large" block>
              Thanh toán
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cartdetail;

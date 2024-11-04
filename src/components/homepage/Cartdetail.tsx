import React, { useState, useEffect, useContext, useCallback } from "react";
import { getCartDetailApi, getCartApi, updateCartApi, deleteItemInCartApi, getUrlPaymentApi } from "../../util/api";
import { Row, Col, Image, Typography, Button, notification, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";

const { Title, Text } = Typography;

const CartDetail: React.FC = () => {
  const [cartData, setCartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();

  const fetchCartData = useCallback(async () => {
    try {
      const data = await getCartDetailApi();
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoading(false); // Dữ liệu đã được tải xong
    }
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }, []);

  const handleUpdateQuantity = useCallback(
    async (shirtSizeId: number, quantity: number) => {
      if (quantity <= 0) {
        notification.error({
          message: "Invalid quantity",
          description: "Quantity must be greater than 0.",
        });
        return;
      }
      try {
        await updateCartApi({ orderId: cartData.id, shirtSizeId, quantity });
        const updatedCartData = await getCartApi();
        setCartData(updatedCartData);
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        notification.error({
          message: "Update Error",
          description: "Failed to update quantity.",
        });
      }
    },
    [cartData?.id]
  );

  const handleDeleteItem = useCallback(
    async (shirtSizeId: number) => {
      try {
        await deleteItemInCartApi({ orderId: cartData.id, shirtSizeId });
        updateCart();
        const updatedCartData = await getCartApi();
        setCartData(updatedCartData);
      } catch (error) {
        console.error("Error deleting item:", error);
        notification.error({
          message: "Delete Error",
          description: "Failed to delete item.",
        });
      }
    },
    [cartData?.id, updateCart]
  );

  const handlePayment = async (values: any) => {
    try {
      const payload = {
        orderId: cartData.id,
        amount: cartData.totalPrice,
        createDate: new Date().toISOString(),
        ...values,
      };
      const response = await getUrlPaymentApi(payload);
      if (response) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Error during payment:", error);
      notification.error({
        message: "Payment Error",
        description: "An error occurred during payment. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <div style={{ padding: "20px", textAlign: "center" }}></div>;
  }

  if (!cartData || (cartData.orderDetails && cartData.orderDetails.length === 0)) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Title level={3}>Your cart is empty</Title>
        <Text style={{ display: "block", marginBottom: "20px" }}>
          No products in your cart yet. Click the button below to add products.
        </Text>
        <Button onClick={() => navigate("/")} size="large">
          Add Products
        </Button>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Your Cart</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Row gutter={[16, 16]}>
            {cartData.orderDetails.map((item: any) => (
              <Col key={item.id} span={24}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "16px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <Image
                    src={item.shirtUrlImg}
                    alt={item.shirtName}
                    width={120}
                    height={120}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "16px",
                    }}
                  />
                  <div style={{ flex: 1, marginLeft: "15px" }}>
                    <Title level={4} style={{ marginBottom: "8px" }}>
                      {item.shirtName}
                    </Title>
                    <Text>Size: {item.sizeName}</Text>
                    <br />
                    <Text>Price per item: {formatCurrency(item.shirtPrice)}</Text>
                    <br />
                    <Text>Quantity: </Text>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        onClick={() => handleUpdateQuantity(item.shirtSizeId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Text style={{ margin: "0 10px" }}>{item.quantity}</Text>
                      <Button onClick={() => handleUpdateQuantity(item.shirtSizeId, item.quantity + 1)}>
                        +
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDeleteItem(item.shirtSizeId)}
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    Remove
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col span={8}>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Title level={3}>Order Summary</Title>
            <div style={{ marginBottom: "16px" }}>
              <Text strong style={{ color: "black", fontWeight: "bold" }}>
                Total Price:
              </Text>
              <Text style={{ color: "green", fontWeight: "bold", marginLeft: "5px" }}>
                {formatCurrency(cartData.totalPrice)}
              </Text>
            </div>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "16px",
              }}
            >
              Enter shipping information
            </div>

            <Form layout="vertical" onFinish={handlePayment}>
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item label="Street" name="street" rules={[{ required: true }]}>
                <Input placeholder="Enter your street address" />
              </Form.Item>
              <Form.Item label="District" name="district" rules={[{ required: true }]}>
                <Input placeholder="Enter your district" />
              </Form.Item>
              <Form.Item label="City" name="city" rules={[{ required: true }]}>
                <Input placeholder="Enter your city" />
              </Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Proceed to Payment
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartDetail;

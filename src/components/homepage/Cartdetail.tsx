import React, { useState, useEffect, useContext } from "react";
import {
  getCartDetailApi,
  getCartDetailApiWithoutLoading, // Thêm API mới
  updateCartApi,
  deleteItemInCartApi,
  getUrlPaymentApi,
} from "../../util/api";
import { Row, Col, Image, Typography, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";

const { Title, Text } = Typography;

const Cartdetail: React.FC = () => {
  const [cartData, setCartData] = useState<any>(null);
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCartDetailApi();
        setCartData(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  if (
    !cartData ||
    (cartData.orderDetails && cartData.orderDetails.length === 0)
  ) {
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

  const { orderDetails, totalPrice, id: orderId } = cartData;

  // Hàm định dạng tiền Việt Nam Đồng
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

  // Hàm cập nhật số lượng sản phẩm
  const handleUpdateQuantity = async (
    shirtSizeId: number,
    quantity: number
  ) => {
    try {
      if (quantity <= 0) {
        notification.error({
          message: "Số lượng không hợp lệ",
          description: "Số lượng phải lớn hơn 0.",
        });
        return;
      }
      await updateCartApi({ orderId, shirtSizeId, quantity });
      const updatedCartData = await getCartDetailApiWithoutLoading(); // Gọi API không có loading
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      notification.error({
        message: "Lỗi cập nhật",
        description: "Cập nhật số lượng không thành công.",
      });
    }
  };

  // Hàm xử lý khi thay đổi số lượng sản phẩm
  const handleQuantityChange = (shirtSizeId: number, newQuantity: number) => {
    handleUpdateQuantity(shirtSizeId, newQuantity);
  };

  // Hàm xóa từng sản phẩm nhỏ trong giỏ hàng
  const handleDeleteItem = async (shirtSizeId: number) => {
    try {
      await deleteItemInCartApi({ orderId, shirtSizeId });
      updateCart();
      const updatedCartData = await getCartDetailApiWithoutLoading(); // Gọi API không có loading
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Error deleting item:", error);
      notification.error({
        message: "Lỗi xóa sản phẩm",
        description: "Xóa sản phẩm không thành công.",
      });
    }
  };

  // Hàm thanh toán
  const handlePayment = async () => {
    try {
      const payload = {
        orderId,
        amount: totalPrice,
        createDate: new Date().toISOString(),
      };
      const response = await getUrlPaymentApi(payload);
      if (response) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Error during payment:", error);
      notification.error({
        message: "Lỗi thanh toán",
        description:
          "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="py-20">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Giỏ hàng của bạn</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Row gutter={[16, 16]}>
            {orderDetails.map((item: any) => (
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
                    <Text>Kích thước: {item.sizeName}</Text>
                    <br />
                    <Text>Giá mỗi chiếc: {formatCurrency(item.shirtPrice)}</Text>
                    <br />
                    <Text>Số lượng: </Text>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        onClick={() =>
                          handleQuantityChange(item.shirtSizeId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Text style={{ margin: "0 10px" }}>{item.quantity}</Text>
                      <Button
                        onClick={() =>
                          handleQuantityChange(item.shirtSizeId, item.quantity + 1)
                        }
                      >
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
                    Xóa
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
            <Title level={3}>Tổng đơn hàng</Title>
            <div style={{ marginBottom: "16px" }}>
              <Text strong>Tổng tiền: </Text>
              <Text>{formatCurrency(totalPrice)}</Text>
            </div>
            <Button type="primary" size="large" block onClick={handlePayment}>
              Thanh toán
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cartdetail;

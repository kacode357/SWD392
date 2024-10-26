import React, { useState, useEffect, useContext } from "react";
import {
  getCartDetailApi,
  updateCartApi,
  deleteCartApi,
  deleteItemInCartApi,
  getUrlPaymentApi,
} from "../../util/api"; // Import API deleteItemInCartApi
import { Row, Col, Image, Typography, Button, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";

const { Title, Text } = Typography;

const Cartdetail: React.FC = () => {
  const [cartData, setCartData] = useState<any>(null);
  const [editedQuantities, setEditedQuantities] = useState<any>({});
  const { updateCart } = useContext(CartContext); // Sử dụng CartContext để cập nhật giỏ hàng
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
      notification.success({
        message: "Cập nhật thành công",
        description: `Số lượng sản phẩm đã được cập nhật.`,
      });
      const updatedCartData = await getCartDetailApi();
      setCartData(updatedCartData);
      setEditedQuantities({}); // Reset lại trạng thái sau khi cập nhật
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
    setEditedQuantities({
      ...editedQuantities,
      [shirtSizeId]: newQuantity,
    });
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleDeleteCart = async () => {
    try {
      await deleteCartApi(orderId, 0); // Gọi API xóa giỏ hàng với status = 0
      notification.success({
        message: "Xóa thành công",
        description: "Giỏ hàng đã được xóa.",
      });
      updateCart(); // Cập nhật lại giỏ hàng trong context
      const updatedCartData = await getCartDetailApi(); // Fetch lại giỏ hàng sau khi xóa thành công
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Error deleting cart:", error);
      notification.error({
        message: "Lỗi xóa giỏ hàng",
        description: "Xóa giỏ hàng không thành công.",
      });
    }
  };

  // Hàm xóa từng sản phẩm nhỏ trong giỏ hàng
  const handleDeleteItem = async (shirtSizeId: number) => {
    try {
      await deleteItemInCartApi({ orderId, shirtSizeId });
      notification.success({
        message: "Xóa thành công",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng.",
      });
      updateCart(); // Cập nhật lại giỏ hàng trong context
      const updatedCartData = await getCartDetailApi(); // Fetch lại giỏ hàng sau khi xóa thành công
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
      console.log(response.url);
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
        <Button type="primary" danger onClick={handleDeleteCart}>
          Xóa toàn bộ giỏ hàng
        </Button>
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
                    <Text>Giá mỗi chiếc: £{item.shirtPrice}</Text>
                    <br />
                    <Text>Số lượng: </Text>
                    <Input
                      type="number"
                      value={
                        editedQuantities[item.shirtSizeId] ?? item.quantity
                      }
                      min={1}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.shirtSizeId,
                          Number(e.target.value)
                        )
                      }
                      style={{ width: "80px" }}
                    />
                    <br />
                    <Text>Tổng giá: £{item.price}</Text>
                  </div>

                  {/* Nút cập nhật số lượng */}
                  {editedQuantities[item.shirtSizeId] !== undefined &&
                    editedQuantities[item.shirtSizeId] !== item.quantity && (
                      <Button
                        type="primary"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.shirtSizeId,
                            editedQuantities[item.shirtSizeId]
                          )
                        }
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                        }}
                      >
                        Cập nhật
                      </Button>
                    )}

                  {/* Nút xóa sản phẩm */}
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
              <Text>£{totalPrice}</Text>
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

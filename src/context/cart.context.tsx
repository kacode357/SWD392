import React, { createContext, useState, useEffect, useContext } from "react";
import { getCartApi } from "../util/api"; // Import API
import { AuthContext } from "./auth.context"; // Import AuthContext
import { ROLES } from "../constants/index"; // Import ROLES

interface CartContextProps {
  cartItemCount: number;
  updateCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cartItemCount: 0,
  updateCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const { auth } = useContext(AuthContext); // Sử dụng AuthContext

  // Hàm để cập nhật số lượng giỏ hàng bằng cách gọi API
  const updateCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || auth.user.role === ROLES.ADMIN || auth.user.role === ROLES.STAFF) {
        return; // Không gọi API nếu người dùng là Admin hoặc Staff
      }
    
      const response = await getCartApi();

      if (response && response.orderDetails) {
        const totalItems = response.orderDetails.length;
        setCartItemCount(totalItems);
      } else {
        // Nếu response là null hoặc không có orderDetails, đặt cartItemCount là 0
        setCartItemCount(0);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      // Đặt cartItemCount là 0 nếu xảy ra lỗi
      setCartItemCount(0);
    }
  };

  // Gọi hàm cập nhật giỏ hàng khi context được khởi tạo
  useEffect(() => {
    // Kiểm tra nếu role đã được gán và không phải Admin hoặc Staff thì mới gọi updateCart
    if (auth.user.role && auth.user.role !== ROLES.ADMIN && auth.user.role !== ROLES.STAFF) {
      updateCart();
    }
  }, [auth.user.role]); // Chạy lại khi role thay đổi

  return (
    <CartContext.Provider value={{ cartItemCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

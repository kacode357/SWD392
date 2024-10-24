import React, { createContext, useState, useEffect } from "react";
import { getCartApi } from "../util/api"; // Import API

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

  // Hàm để cập nhật số lượng giỏ hàng bằng cách gọi API
  const updateCart = async () => {
    try {
      console.log("Updating cart...");
      const token = localStorage.getItem("token");
      if (!token) {
        return;
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
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItemCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

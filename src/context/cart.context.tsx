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
      const token = localStorage.getItem("token");
      if (!token) {
      
        return;
      }
      const response = await getCartApi();
      const totalItems = response.orderDetails.length;
      setCartItemCount(totalItems);
    } catch (error) {
      console.error("Error updating cart:", error);
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

import React, { createContext, useState, useEffect, useContext } from "react";
import { getCartApi } from "../util/api";
import { AuthContext } from "./auth.context"; // Import AuthContext

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
  const { auth } = useContext(AuthContext); // Access the auth context

  // Function to update the cart count by calling the API
  const updateCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !auth.user) {
        return;
      }
     
     

      const response = await getCartApi();
      if (response && response.orderDetails) {
        const totalItems = response.orderDetails.length;
        setCartItemCount(totalItems);
      } else {
        // Set cartItemCount to 0 if response is null or has no orderDetails
        setCartItemCount(0);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      // Set cartItemCount to 0 in case of an error
      setCartItemCount(0);
    }
  };

  // Call updateCart when auth.user is defined and context is initialized
  useEffect(() => {
    if (auth.user) {
      updateCart();
    }
  }, [auth.user]);

  return (
    <CartContext.Provider value={{ cartItemCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

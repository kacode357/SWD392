import React from "react";
import { Select, message } from "antd";
import { updateOrderApi } from "../../../util/api"; // Import your update API function

const { Option } = Select;

interface UpdateStatusComponentProps {
  order: {
    id: string;
    userId: string;
    totalPrice: number;
    shipPrice: number;
    deposit: number;
    date: string;
    refundStatus: boolean;
    status: number;
  };
  onStatusUpdated: () => void; // Callback function to trigger reload
}

const UpdateStatusComponent: React.FC<UpdateStatusComponentProps> = ({ order, onStatusUpdated }) => {
  const handleStatusChange = async (newStatus: number) => {
    try {
      const updatedData = {
        userId: order.userId,
        totalPrice: order.totalPrice,
        shipPrice: order.shipPrice,
        deposit: order.deposit,
        date: order.date,
        refundStatus: order.refundStatus,
        status: newStatus,
      };

      await updateOrderApi(order.id, updatedData);
      message.success("Order status updated successfully!");
      onStatusUpdated(); // Trigger the parent component to reload the data
    } catch (error) {
      message.error("Failed to update order status.");
    }
  };

  return (
    <Select value={order.status} onChange={(value) => handleStatusChange(value)} style={{ width: 120 }}>
      <Option value={3}>Confirmed</Option>
      <Option value={4}>Processing</Option>
      <Option value={5}>Shipped</Option>
    </Select>
  );
};

export default UpdateStatusComponent;

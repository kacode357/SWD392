import React from "react";
import { Button, message } from "antd";
import { updateOrderApi } from "../../../util/api";

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

const UpdateStatusComponent: React.FC<UpdateStatusComponentProps> = ({
  order,
  onStatusUpdated,
}) => {
  // Determine the next status based on the current status
  const getNextStatus = (currentStatus: number) => {
    switch (currentStatus) {
      case 2:
        return { status: 3, label: "Confirm", color: "bg-yellow-500" };
      case 3:
        return { status: 4, label: "Processing", color: "bg-green-500" };
      case 4:
        return { status: 5, label: "Shipped", color: "bg-purple-500" };
      default:
        return null; // No next status
    }
  };

  const nextStatus = getNextStatus(order.status);

  const handleStatusChange = async () => {
    if (!nextStatus) return; // No next status available
    try {
      const updatedData = {
        userId: order.userId,
        totalPrice: order.totalPrice,
        shipPrice: order.shipPrice,
        deposit: order.deposit,
        date: order.date,
        refundStatus: order.refundStatus,
        status: nextStatus.status,
      };

      await updateOrderApi(order.id, updatedData);
      message.success("Order status updated successfully!");
      onStatusUpdated(); // Trigger the parent component to reload the data
    } catch (error) {
      message.error("Failed to update order status.");
    }
  };

  return (
    <div>
      {nextStatus ? (
        <Button
          type="primary"
          onClick={handleStatusChange}
          className={`${nextStatus.color} border ${nextStatus.color} text-white font-bold w-36 h-8`}
        >
          {`Move to ${nextStatus.label}`}
        </Button>
      ) : (
        <span
          className="inline-flex items-center justify-center bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded-md text-sm shadow-md"
          style={{ marginTop: "8px", height: "32px" }}
        >
          Order Completed
        </span>
      )}
    </div>
  );
};

export default UpdateStatusComponent;

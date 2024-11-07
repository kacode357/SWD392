import React from "react";
import { Button, message, Tag, Tooltip } from "antd";
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
        return { status: 3, label: "Confirm", color: "#e1c743" };
      case 3:
        return { status: 4, label: "Processing", color: "green" };
      case 4:
        return { status: 5, label: "Shipped", color: "purple" };
      default:
        return null; // No next status
    }
  };

  const nextStatus = getNextStatus(order.status);

  const handleStatusChange = async (newStatus: number) => {
    try {
      const updatedData = {
        userId: order.userId,
        totalPrice: order.totalPrice,
        shipPrice: order.shipPrice,
        deposit: order.deposit || 0,
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
    <div className="flex justify-center items-center space-x-4">
      {nextStatus ? (
        <>
          <Tooltip title={`Change status to ${nextStatus.label}`}>
            <Button
              type="primary"
              onClick={() => handleStatusChange(nextStatus.status)}
              style={{
                backgroundColor: nextStatus.color,
                borderColor: nextStatus.color,
              }}
              className="hover:scale-105 transition-transform duration-150"
            >
              {nextStatus.label}
            </Button>
          </Tooltip>
          {order.status === 2 && (
            <Tooltip title="Reject this order">
              <Button
                danger
                onClick={() => handleStatusChange(7)} // 7 is the status code for "Rejected"
                className="hover:scale-105 transition-transform duration-150"
              >
                Reject
              </Button>
            </Tooltip>
          )}
        </>
      ) : (
        <Tag
          color={order.status === 7 ? "red" : "gray"}
          style={{ fontSize: "14px", padding: "4px 12px", width: "80%" , textAlign: "center"}}
        >
          {order.status === 7 ? "Rejected" : "Order Completed"}
        </Tag>
      )}
    </div>
  );
};

export default UpdateStatusComponent;

import React from "react";
import { Tag } from "antd";

interface StatusTagProps {
  status: number;
  newStatus?: boolean;
}

const formatStatus = (status: number): string => {
  switch (status) {
    case 2:
      return "Paid";
    case 3:
      return "Confirmed";
    case 4:
      return "Processing";
    case 5:
      return "Shipped";
    case 6:
      return "Cancelled";
    case 7:
      return "Rejected";
    default:
      return "Unknown";
  }
};

const getStatusColor = (status: number): string => {
  switch (status) {
    case 2:
      return "blue";
    case 3:
      return "gold";
    case 4:
      return "green";
    case 5:
      return "purple";
    case 6:
      return "red";
    case 7:
      return "red"
    default:
      return "gray";
  }
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const tagStyle: React.CSSProperties = {
    width: "100px", // Set your desired fixed width
    textAlign: "center",
  };

  return (
    <Tag color={getStatusColor(status)} style={tagStyle}>
      {formatStatus(status)}
    </Tag>
  );
};

export default StatusTag;

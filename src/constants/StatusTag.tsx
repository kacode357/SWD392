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
    default:
      return "Unknown";
  }
};

const getStatusColor = (status: number): string => {
  switch (status) {
    case 2:
      return "green";
    case 3:
      return "gold";
    case 4:
      return "blue";
    case 5:
      return "purple";
    case 6:
      return "red";
    default:
      return "gray";
  }
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <Tag color={getStatusColor(status)}>{formatStatus(status)}</Tag>;
};

export default StatusTag;

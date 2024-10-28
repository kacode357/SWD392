import React from "react";
import { Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, RightOutlined } from "@ant-design/icons";

const StatusFlow: React.FC = () => {
  return (
    <div className="bg-gray-100 p-5 rounded-lg flex justify-between items-center">
      {/* Paid */}
      <div className="flex flex-col items-center text-center w-1/5">
        <div className="flex items-center">
          <CheckCircleOutlined className="text-blue-500 text-2xl mr-2" />
          <Tag color="blue">Paid</Tag>
        </div>
        <span className="text-sm text-gray-500 mt-2">(The payment has been received)</span>
      </div>

      {/* Arrow */}
      <RightOutlined className="text-lg text-gray-400" />

      {/* Confirmed */}
      <div className="flex flex-col items-center text-center w-1/5">
        <div className="flex items-center">
          <CheckCircleOutlined className="text-yellow-500 text-2xl mr-2" />
          <Tag color="gold">Confirmed</Tag>
        </div>
        <span className="text-sm text-gray-500 mt-2">(The order has been confirmed)</span>
      </div>

      {/* Arrow */}
      <RightOutlined className="text-lg text-gray-400" />

      {/* Processing */}
      <div className="flex flex-col items-center text-center w-1/5">
        <div className="flex items-center">
          <ClockCircleOutlined className="text-green-500 text-2xl mr-2" />
          <Tag color="green">Processing</Tag>
        </div>
        <span className="text-sm text-gray-500 mt-2">(The order is being processed)</span>
      </div>

      {/* Arrow */}
      <RightOutlined className="text-lg text-gray-400" />

      {/* Shipped */}
      <div className="flex flex-col items-center text-center w-1/5">
        <div className="flex items-center">
          <CheckCircleOutlined className="text-purple-600 text-2xl mr-2" />
          <Tag color="purple">Shipped</Tag>
        </div>
        <span className="text-sm text-gray-500 mt-2">(The order has been shipped)</span>
      </div>
    </div>
  );
};

export default StatusFlow;

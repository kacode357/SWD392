import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Button } from "antd";
import { searchOrderByCurrentUserApi } from "../../util/api";
import moment from "moment";
import { ReloadOutlined } from "@ant-design/icons";
import StatusTag from "../../constants/StatusTag";
import StatusFlow from "../StepsStatus/StepsOrderAdmin";

const { Search } = Input;

const OrdersComponent: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchOrders = async (page = 1, pageSize = 10) => {
    setLoading(true);
    const data = {
      pageNum: page,
      pageSize: pageSize,
      status: null,
    };
    const response = await searchOrderByCurrentUserApi(data);
    setOrders(response.pageData);
    setPagination({
      current: response.pageInfo.page,
      pageSize: response.pageInfo.size,
      total: response.pageInfo.totalItem,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination((prev) => ({ ...prev, current, pageSize }));
    fetchOrders(current, pageSize);
  };

  const onSearch = (value: string) => {
    setSearchKeyword(value);
    fetchOrders(1, pagination.pageSize);
  };

  const handleReset = () => {
    setSearchKeyword("");
    fetchOrders(1, pagination.pageSize);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Table columns
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "userUserName",
      key: "userUserName",
    },
    {
      title: "Order Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) =>
        date !== "0001-01-01T00:00:00" ? moment(date).format("YYYY-MM-DD") : "N/A",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => `${totalPrice.toLocaleString()} VNĐ`,
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => <StatusTag status={status} />,
    },
    {
      title: "View Detail Order",
      key: "action",
      render: () => (
        <Button type="link" onClick={showModal}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <StatusFlow />
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Space className="custom-search">
            <Search
              style={{ width: 400 }}
              placeholder="CHƯA DÙNG ĐƯỢC"
              onSearch={onSearch}
              enterButton
              allowClear
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <ReloadOutlined
              onClick={handleReset}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>ĐANG CHỜ API</p>
      </Modal>
    </div>
  );
};

export default OrdersComponent;

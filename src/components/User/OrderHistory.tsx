import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Modal, Button, List, Image } from "antd";
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
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any[]>([]);

  const fetchOrders = async (page = 1, pageSize = 10, keyword = "") => {
    setLoading(true);
    const data = {
      pageNum: page,
      pageSize,
      orderId: keyword || "", // Filtering by order ID or keyword if available
      status: null,
    };
    try {
      const response = await searchOrderByCurrentUserApi(data);
      setOrders(response.pageData || []);
      setPagination({
        current: response.pageInfo.page,
        pageSize: response.pageInfo.size,
        total: response.pageInfo.totalItem,
      });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination((prev) => ({ ...prev, current, pageSize }));
    fetchOrders(current, pageSize, searchKeyword);
  };

  const onSearch = (value: string) => {
    setSearchKeyword(value);
    fetchOrders(1, pagination.pageSize, value);
  };

  const handleReset = () => {
    setSearchKeyword("");
    fetchOrders(1, pagination.pageSize);
  };

  const showModal = (orderDetails: any[]) => {
    setSelectedOrderDetails(orderDetails);
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
      dataIndex: "userName",
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
      title: <div style={{ textAlign: "center" }}>Total Price</div>, // Canh giữa tiêu đề
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => (
        <div style={{ textAlign: "right" }}>{`${totalPrice.toLocaleString()} VNĐ`}</div>
      ),
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
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => showModal(record.orderDetails)}>
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
              placeholder="Search Orders"
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
        width={800}
      >
        <List
          itemLayout="vertical"
          dataSource={selectedOrderDetails}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Image width={100} src={item.shirtUrlImg} />}
                title={item.shirtName}
                description={item.shirtDescription}
              />
              <p>Size: {item.sizeName} ({item.sizeDescription})</p>
              <p>Price: {item.price.toLocaleString()} VNĐ</p>
              <p>Quantity: {item.quantity}</p>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default OrdersComponent;
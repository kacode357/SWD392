import React, { useEffect, useState } from "react";
import { Table, Input, Space, Row, Col, Tabs, Tag } from "antd";
import { searchPaymentApi } from "../../../util/api"; // Thay bằng API phù hợp cho payment nếu có
import { ReloadOutlined } from "@ant-design/icons";
import moment from "moment";

const { Search } = Input;
const { TabPane } = Tabs;

interface Payment {
  id: number;
  amount: number;
  date: string;
  method: string;
  status: boolean;
}

const PaymentComponent: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("activePayments");

  // Fetch payments from API
  const fetchPayments = async (page = 1, pageSize = 10, keyword = "", isDeleted = false) => {
    const data = {
      pageNum: page,
      pageSize: pageSize,
      keyword: keyword,
      status: !isDeleted,
    };
    const response = await searchPaymentApi(data); // Sử dụng API cho payment
    setPayments(response.pageData);
    setPagination({
      current: response.pageInfo.page,
      pageSize: response.pageInfo.size,
      total: response.pageInfo.totalItem,
    });
  };

  useEffect(() => {
    fetchPayments(pagination.current, pagination.pageSize);
  }, []);

  // Handle table pagination changes
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination((prev) => ({ ...prev, current, pageSize }));
    fetchPayments(current, pageSize, searchKeyword, activeTab === "deletedPayments");
  };

  // Handle search functionality
  const onSearch = (value: string) => {
    setSearchKeyword(value);
    fetchPayments(1, pagination.pageSize, value, activeTab === "deletedPayments");
  };

  // Handle reset functionality
  const handleReset = () => {
    setSearchKeyword("");
    fetchPayments(1, pagination.pageSize, "", activeTab === "deletedPayments");
  };

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    fetchPayments(1, pagination.pageSize, searchKeyword, key === "deletedPayments");
  };

  // Table columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "userUserName",
      key: "userUserName",
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: <div style={{ textAlign: "center" }}>Amount</div>, // Canh giữa tiêu đề
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <div style={{ textAlign: "right" }}>{`${amount.toLocaleString()} VND`}</div>
      ), // Canh phải giá trị
    },    
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Success" : "Failed"}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      {/* Tabs at the top */}
      <Tabs className="custom-tabs" defaultActiveKey="activePayments" onChange={handleTabChange}>
        <TabPane tab="Active Payments" key="activePayments">
          <Row justify="space-between" style={{ marginBottom: 16 }}>
            <Col>
              <Space className="custom-search">
                <Search
                  placeholder="Search by keyword"
                  onSearch={onSearch}
                  enterButton
                  allowClear
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <ReloadOutlined onClick={handleReset} style={{ fontSize: '24px', cursor: 'pointer' }} />
              </Space>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={payments}
            rowKey="id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            onChange={handleTableChange}
          />
        </TabPane>
        <TabPane tab="Deleted Payments" key="deletedPayments">
          <Row justify="space-between" style={{ marginBottom: 16 }}>
            <Col>
              <Space>
                <Search
                  placeholder="Search by keyword"
                  onSearch={onSearch}
                  enterButton
                  allowClear
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button onClick={handleReset}>Reset</button>
              </Space>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={payments}
            rowKey="id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            onChange={handleTableChange}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PaymentComponent;

import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Row, Col, Tabs } from "antd";
import { searchShirtSizeApi } from "../../../util/api"; // Thay đổi API phù hợp
import ToggleStatusButton from "./ToggleStatusButton";
import EditShirtSizeModal from "./EditShirtSizeModal";
import AddShirtSizeModal from "./AddShirtSizeModal";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";

const { Search } = Input;
const { TabPane } = Tabs;

interface ShirtSize {
  id: number;
  shirtName: string;  // Thêm trường shirtName
  sizeName: string;   // Thêm trường sizeName
  quantity: number;
  description: string;
  status: boolean;
}

const ShirtSizeComponent: React.FC = () => {
  const [shirtSizes, setShirtSizes] = useState<ShirtSize[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("activeSizes");
  const [isAddShirtSizeModalVisible, setIsAddShirtSizeModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingSizeId, setEditingSizeId] = useState<number | null>(null);

  // Fetch shirt sizes from API
  const fetchShirtSizes = async (page = 1, pageSize = 10, keyword = "", isDeleted = false) => {
    setLoading(true);
    const data = {
      pageNum: page,
      pageSize: pageSize,
      keyWord: keyword,
      status: !isDeleted,
    };
    const response = await searchShirtSizeApi(data); // Thay đổi API phù hợp
    setShirtSizes(response.pageData);
    setPagination({
      current: response.pageInfo.page,
      pageSize: response.pageInfo.size,
      total: response.pageInfo.totalItem,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchShirtSizes(pagination.current, pagination.pageSize);
  }, []);

  // Handle table pagination changes
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination((prev) => ({ ...prev, current, pageSize }));
    fetchShirtSizes(current, pageSize, searchKeyword, activeTab === "deletedSizes");
  };

  // Handle search functionality
  const onSearch = (value: string) => {
    setSearchKeyword(value);
    fetchShirtSizes(1, pagination.pageSize, value, activeTab === "deletedSizes");
  };

  // Handle reset functionality
  const handleReset = () => {
    setSearchKeyword("");
    fetchShirtSizes(1, pagination.pageSize, "", activeTab === "deletedSizes");
  };

  // Handle Add Shirt Size button click
  const handleAddShirtSize = () => {
    setIsAddShirtSizeModalVisible(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsAddShirtSizeModalVisible(false);
    setIsEditModalVisible(false);
    setEditingSizeId(null);
  };

  // Open EditShirtSizeModal
  const handleEditShirtSize = (sizeId: number) => {
    setEditingSizeId(sizeId);
    setIsEditModalVisible(true);
  };

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    fetchShirtSizes(1, pagination.pageSize, searchKeyword, key === "deletedSizes");
  };

  // Table columns
  const columns = [
    {
      title: "Shirt Name",  // Cột hiển thị shirtName
      dataIndex: "shirtName",
      key: "shirtName",
    },
    {
      title: "Size Name",   // Cột hiển thị sizeName
      dataIndex: "sizeName",
      key: "sizeName",
    },
    {
      title: "Quantity",    // Cột hiển thị quantity
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Description", // Cột hiển thị description
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",      // Cột hiển thị status
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: ShirtSize) => (
        <ToggleStatusButton
          isDelete={!status} // Pass whether the size is deactivated (true) or active (false)
          sizeId={record.id}  // Pass the size's ID
          refreshSizes={() => fetchShirtSizes(pagination.current, pagination.pageSize, searchKeyword, activeTab === "deletedSizes")} // Refresh sizes after toggling status
        />
      ),
    },
    {
      title: "Action",      // Cột Action để chỉnh sửa
      key: "action",
      render: (_: any, record: ShirtSize) => (
        <EditOutlined
          onClick={() => handleEditShirtSize(record.id)}
          style={{ color: 'black', cursor: 'pointer' }}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Tabs at the top */}
      <Tabs className="custom-tabs" defaultActiveKey="activeSizes" onChange={handleTabChange}>
        <TabPane tab="Active Shirt Sizes" key="activeSizes">
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
            <Col>
              <button className="custom-button" onClick={handleAddShirtSize}>Add Shirt Size</button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={shirtSizes}
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
        </TabPane>
        <TabPane tab="Deleted Shirt Sizes" key="deletedSizes">
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
                <Button onClick={handleReset}>Reset</Button>
              </Space>
            </Col>
            <Col>
              <Button type="primary" onClick={handleAddShirtSize}>Add Shirt Size</Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={shirtSizes}
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
        </TabPane>
      </Tabs>

      {/* AddShirtSizeModal Component */}
      <AddShirtSizeModal
        visible={isAddShirtSizeModalVisible}
        onClose={handleCloseModal}
        refreshSizes={() => fetchShirtSizes(pagination.current, pagination.pageSize, searchKeyword, activeTab === "deletedSizes")}
      />

      {/* EditShirtSizeModal Component */}
      {editingSizeId && (
        <EditShirtSizeModal
          sizeId={editingSizeId}
          visible={isEditModalVisible}
          onClose={handleCloseModal}
          refreshSizes={() => fetchShirtSizes(pagination.current, pagination.pageSize, searchKeyword, activeTab === "deletedSizes")}
        />
      )}
    </div>
  );
};

export default ShirtSizeComponent;

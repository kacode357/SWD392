import React, { useEffect, useState } from "react";
import { Table, Avatar, Input, Button, Space, Row, Col } from "antd";
import { getAllUserApi } from "../../util/api";
import ToggleStatusButton from "./ToggleStatusButton";
import EditUserModal from "./EditUserModal"; // Correct Import for EditUserModal
import AddUserModal from "./AddUserButton"; // Correct Import for AddUserModal

const { Search } = Input;

interface User {
  id: number;
  email: string;
  userName: string;
  status: boolean;
  imgUrl: string;
}

const UserComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false); // State to control AddUserModal visibility
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State to control EditUserModal visibility
  const [editingUserId, setEditingUserId] = useState<number | null>(null); // State to track which user is being edited

  // Fetch users from API
  const fetchUsers = async (page = 1, pageSize = 10, keyword = "") => {
    setLoading(true);
    const data = {
      pageNum: page,
      pageSize: pageSize,
      keyWord: keyword,
      role: "all",
      status: true,
      is_Verify: true,
      is_Delete: false,
    };
    const response = await getAllUserApi(data);
    console.log("API Response", response);

    setUsers(response.pageData);
    setPagination({
      current: response.pageInfor.page,
      pageSize: response.pageInfor.size,
      total: response.pageInfor.totalItem,
    });
    setLoading(false);
  };

  // Fetch users on component mount and when pagination changes
  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on component mount

  // Handle table pagination changes
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination((prev) => ({ ...prev, current, pageSize }));
    fetchUsers(current, pageSize, searchKeyword);
  };

  // Handle search functionality
  const onSearch = (value: string) => {
    setSearchKeyword(value);
    fetchUsers(1, pagination.pageSize, value);
  };

  // Handle reset functionality
  const handleReset = () => {
    setSearchKeyword("");
    fetchUsers(1, pagination.pageSize, "");
  };

  // Handle Add User button click
  const handleAddUser = () => {
    setIsAddUserModalVisible(true); // Open the AddUserModal
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsAddUserModalVisible(false); // Close the AddUserModal
    setIsEditModalVisible(false); // Close the EditUserModal
    setEditingUserId(null); // Reset the editing user ID
  };

  // Open EditUserModal
  const handleEditUser = (userId: number) => {
    setEditingUserId(userId); // Set the ID of the user being edited
    setIsEditModalVisible(true); // Open the EditUserModal
  };

  // Table columns
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: User) => (
        <ToggleStatusButton
          status={status}
          userId={record.id}
          refreshUsers={() => fetchUsers(pagination.current, pagination.pageSize, searchKeyword)}
        />
      ),
    },
    {
      title: "Avatar",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (imgUrl: string) => <Avatar src={imgUrl} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Button type="link" onClick={() => handleEditUser(record.id)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
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
          <Button type="primary" onClick={handleAddUser}>Add User</Button> {/* Add User Button */}
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={users}
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

      {/* AddUserModal Component */}
      <AddUserModal
        visible={isAddUserModalVisible}
        onClose={handleCloseModal}
        refreshUsers={() => fetchUsers(pagination.current, pagination.pageSize, searchKeyword)}
      />

      {/* EditUserModal Component */}
      {editingUserId && (
        <EditUserModal
          userId={editingUserId}
          visible={isEditModalVisible}
          onClose={handleCloseModal}
          refreshUsers={() => fetchUsers(pagination.current, pagination.pageSize, searchKeyword)}
        />
      )}
    </div>
  );
};

export default UserComponent;

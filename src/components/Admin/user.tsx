import React, { useEffect, useState } from 'react';
import { Table, Avatar, Tabs, PaginationProps, Row, Col } from 'antd'; // Import Ant Design components
import { ColumnsType } from 'antd/lib/table'; // Import the type for columns
import { getAllUserApi } from '../../util/api'; // Adjust the import paths

// Import new components
import ChangeStatusComponent from './ChangeStatusComponent';
import ChangeRoleComponent from './ChangeRoleComponent';
import EditUserComponent from './EditUserComponent';
import DeleteUserComponent from './DeleteUserComponent';
import SearchComponent from './SearchComponent'; // Import the SearchComponent
import AddUserComponent from './AddUserComponent';

const { TabPane } = Tabs;

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone_number: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  is_deleted: boolean;
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to hold user data
  const [activeTab, setActiveTab] = useState<string>('allUsers'); // To track the selected tab
  const [keyword, setKeyword] = useState<string>(''); // To hold the search keyword
  const [pagination, setPagination] = useState({ // State to hold pagination data
    pageNum: 1,
    pageSize: 7,
    totalItems: 0,
    totalPages: 0
  });

  // Function to fetch users based on the selected tab and search keyword
  const fetchUsers = async (pageNum: number, pageSize: number, status: 'active' | 'inactive', isDeleted: boolean, searchKeyword: string = '') => {
    const data = {
      searchCondition: {
        keyword: searchKeyword,
        role: 'all',
        status: status,
        is_deleted: isDeleted,
      },
      pageInfo: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
    };

    const response = await getAllUserApi(data); // Call API
    setUsers(response.users); // Assuming response.users holds the user list
    setPagination({
      pageNum: response.pageNum,
      pageSize: response.pageSize,
      totalItems: response.totalItems,
      totalPages: response.totalPages
    });
  };

  useEffect(() => {
    // Call fetchUsers based on the activeTab and pagination
    if (activeTab === 'allUsers') {
      fetchUsers(pagination.pageNum, pagination.pageSize, 'active', false, keyword);  // Fetch only active users with search keyword
    } else if (activeTab === 'inactiveUsers') {
      fetchUsers(pagination.pageNum, pagination.pageSize, 'inactive', false, keyword);  // Fetch inactive users with search keyword
    } else if (activeTab === 'deletedUsers') {
      fetchUsers(pagination.pageNum, pagination.pageSize, 'active', true, keyword);  // Fetch deleted users with search keyword
    }
  }, [activeTab, pagination.pageNum, pagination.pageSize, keyword]);

  // Handle search
  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword); // Set the search keyword and trigger the fetch
  };

  // Handle reset
  const handleReset = () => {
    setKeyword(''); // Reset the keyword and fetch all users
  };

  // Handle pagination change
  const handleTableChange: PaginationProps['onChange'] = (pageNum, pageSize) => {
    setPagination({
      ...pagination,
      pageNum: pageNum,
      pageSize: pageSize
    });
  };

  // Columns for the Ant Design Table component
  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar src={avatar} size="large" />,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: 'admin' | 'user', record: User) => (
        <ChangeRoleComponent userId={record._id} currentRole={role} onSuccess={() => fetchUsers(pagination.pageNum, pagination.pageSize, activeTab === 'allUsers' ? 'active' : 'inactive', activeTab === 'deletedUsers', keyword)} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive', record: User) => (
        <ChangeStatusComponent userId={record._id} currentStatus={status} onSuccess={() => fetchUsers(pagination.pageNum, pagination.pageSize, activeTab === 'allUsers' ? 'active' : 'inactive', activeTab === 'deletedUsers', keyword)} />
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_text: any, record: User) => ( // Explicitly set _text type as 'any'
        <EditUserComponent
          userId={record._id}
          userName={record.name}
          phoneNumber={record.phone_number}
          avatar={record.avatar}
          onSuccess={() => fetchUsers(pagination.pageNum, pagination.pageSize, activeTab === 'allUsers' ? 'active' : 'inactive', activeTab === 'deletedUsers', keyword)}
        />
      ),
    },
    // Conditionally render the Delete column if not in Deleted Users tab
    ...(activeTab !== 'deletedUsers'
      ? [
          {
            title: 'Delete',
            key: 'delete',
            render: (_text: any, record: User) => ( // Explicitly set _text type as 'any'
              <DeleteUserComponent
                userId={record._id}
                onSuccess={() =>
                  fetchUsers(
                    pagination.pageNum,
                    pagination.pageSize,
                    activeTab === 'allUsers' ? 'active' : 'inactive',
                    activeTab === 'deletedUsers',
                    keyword
                  )
                }
              />
            ),
          },
        ]
      : []), // If in Deleted Users tab, do not show the Delete column
  ];

   return (
    <div>
      {/* Tabs for different user categories */}
      <Tabs defaultActiveKey="allUsers" onChange={setActiveTab}>
        <TabPane tab="All Users" key="allUsers"></TabPane>
        <TabPane tab="Inactive Users" key="inactiveUsers"></TabPane>
        <TabPane tab="Deleted Users" key="deletedUsers"></TabPane>
      </Tabs>

      {/* Search and Add User components */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <SearchComponent onSearch={handleSearch} onReset={handleReset} />
        </Col>
        <Col>
          <AddUserComponent onSuccess={() => fetchUsers(pagination.pageNum, pagination.pageSize, activeTab === 'allUsers' ? 'active' : 'inactive', activeTab === 'deletedUsers', keyword)} />
        </Col>
      </Row>

      {/* Table displaying users with pagination */}
      <Table<User>
        dataSource={users}
        columns={columns}
        rowKey="_id"
        pagination={{
          current: pagination.pageNum,
          pageSize: pagination.pageSize,
          total: pagination.totalItems,
          onChange: handleTableChange,
        }}
      />
    </div>
  );

};

export default UserPage;

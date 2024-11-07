import { useEffect, useState } from 'react';
import { Table, Tag, Input, Button, Space } from 'antd'; 
import { ReloadOutlined } from '@ant-design/icons'; // Import icon reload
import { paymentByCurrentUserApi } from '../../util/api';


const { Search } = Input;

const HistoryPaymentUser = () => {
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchKey, setSearchKey] = useState(''); 

  const fetchPayments = async (pageNum: number, pageSize: number, keyWord?: string) => {
    try {
      const data = await paymentByCurrentUserApi({ pageNum, pageSize, keyWord });
      setPayments(data.pageData);
      setPagination({
        current: data.pageInfo.page,
        pageSize: data.pageInfo.size,
        total: data.pageInfo.totalItem,
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  // Chỉ fetch khi tìm kiếm thay đổi hoặc reload
  useEffect(() => {
    fetchPayments(pagination.current, pagination.pageSize, searchKey);
  }, [searchKey]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination, // Cập nhật lại pagination khi thay đổi trang
    });
    fetchPayments(pagination.current, pagination.pageSize, searchKey);
  };

  const handleSearch = (value: string) => {
    setSearchKey(value);
    setPagination({ ...pagination, current: 1 }); // Reset về trang 1 khi có từ khóa tìm kiếm
  };

  const handleReload = () => {
    setSearchKey(''); // Xóa từ khóa tìm kiếm
    fetchPayments(1, pagination.pageSize, ""); // Reset lại về trang đầu tiên và không có từ khóa tìm kiếm
  };
  
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'User',
      dataIndex: 'userUserName',
      key: 'userUserName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    
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
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Success' : 'Failed'}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div>
      {/* Thêm thanh tìm kiếm và nút reload */}
      <Space className="custom-search mb-4" >
        <Search 
          placeholder="Search by Order ID" 
          enterButton="Search" 
          onSearch={handleSearch} 
          style={{ width: 440 }} 
          allowClear
        />
        <Button 
          icon={<ReloadOutlined />} 
          onClick={handleReload} 
        >
    
        </Button>
      </Space>

      <Table 
        columns={columns} 
        dataSource={payments} 
        rowKey="id" 
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default HistoryPaymentUser;

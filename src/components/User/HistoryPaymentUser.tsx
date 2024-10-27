import  { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { getPaymentByCurrentUserApi } from '../../util/api'; // Đảm bảo import đúng đường dẫn

const HistoryPaymentUser = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPaymentByCurrentUserApi();
        setPayments(data.pageData);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

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
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount.toLocaleString()} VND`,
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
    <Table 
      columns={columns} 
      dataSource={payments} 
      rowKey="id" 
      pagination={{ pageSize: 10 }}
    />
  );
};

export default HistoryPaymentUser;

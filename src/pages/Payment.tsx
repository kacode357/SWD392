import { useEffect, useState } from 'react';
import { notification, Spin, Card, Descriptions, Row, Col, Result, Button } from 'antd'; // Sử dụng các thành phần từ Ant Design
import { createPaymentApi } from '../util/api'; // Đảm bảo đường dẫn chính xác đến file chứa createPaymentApi
import { CheckCircleOutlined } from '@ant-design/icons'; // Import icon thành công

const Payment = () => {
  interface PaymentDetails {
    amount: string | null;
    bankCode: string | null;
    bankTranNo: string | null;
    cardType: string | null;
    orderInfo: string | null;
    payDate: string | null;
    responseCode: string | null;
    tmnCode: string | null;
    transactionNo: string | null;
    transactionStatus: string | null;
    txnRef: string | null;
    secureHash: string | null;
  }

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: null,
    bankCode: null,
    bankTranNo: null,
    cardType: null,
    orderInfo: null,
    payDate: null,
    responseCode: null,
    tmnCode: null,
    transactionNo: null,
    transactionStatus: null,
    txnRef: null,
    secureHash: null,
  });

  const [loading, setLoading] = useState(true); // Để hiển thị trạng thái loading
  const [apiResponse, setApiResponse] = useState<any>(null); // Để lưu kết quả từ API

  useEffect(() => {
    const currentUrl = window.location.href;
    const params = new URLSearchParams(currentUrl.split('?')[1]);

    const newPaymentDetails = {
      amount: params.get('vnp_Amount'),
      bankCode: params.get('vnp_BankCode'),
      bankTranNo: params.get('vnp_BankTranNo'),
      cardType: params.get('vnp_CardType'),
      orderInfo: params.get('vnp_OrderInfo'),
      payDate: params.get('vnp_PayDate'),
      responseCode: params.get('vnp_ResponseCode'),
      tmnCode: params.get('vnp_TmnCode'),
      transactionNo: params.get('vnp_TransactionNo'),
      transactionStatus: params.get('vnp_TransactionStatus'),
      txnRef: params.get('vnp_TxnRef'),
      secureHash: params.get('vnp_SecureHash'),
    };

    setPaymentDetails(newPaymentDetails);

    // Gọi API khi đã có paymentDetails
    const fetchData = async () => {
      try {
        const response = await createPaymentApi({
          vnp_Amount: newPaymentDetails.amount || '',
          vnp_BankCode: newPaymentDetails.bankCode || '',
          vnp_BankTranNo: newPaymentDetails.bankTranNo || '',
          vnp_CardType: newPaymentDetails.cardType || '',
          vnp_OrderInfo: newPaymentDetails.orderInfo || '',
          vnp_PayDate: newPaymentDetails.payDate || '',
          vnp_ResponseCode: newPaymentDetails.responseCode || '',
          vnp_TmnCode: newPaymentDetails.tmnCode || '',
          vnp_TransactionNo: newPaymentDetails.transactionNo || '',
          vnp_TransactionStatus: newPaymentDetails.transactionStatus || '',
          vnp_TxnRef: newPaymentDetails.txnRef || '',
          vnp_SecureHash: newPaymentDetails.secureHash || '',
        });
        console.log('API Response>>>:', response);
        setApiResponse(response); // Lưu kết quả từ API

        if (response) {
          notification.success({
            message: 'Payment Success',
            description: 'Your payment was successful.',
          });
        }
      } catch (error) {
        console.error('Error fetching payment API:', error);

        // Hiển thị thông báo lỗi
        notification.error({
          message: 'Payment Failed',
          description: 'There was an error processing your payment. Please try again.',
        });
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchData();
  }, []);

  // Hàm format amount cho đúng đơn vị tiền tệ (chia cho 100)
  const formatAmount = (amount: string | null) => {
    if (!amount) return 'N/A';
    const formattedAmount = (parseFloat(amount) / 100).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formattedAmount;
  };

  // Hàm format ngày thanh toán
  const formatPayDate = (payDate: string | null) => {
    if (!payDate) return 'N/A';
    const date = new Date(payDate.slice(0, 4) + '-' + payDate.slice(4, 6) + '-' + payDate.slice(6, 8));
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="py-20 flex justify-center items-center min-h-screen">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Result
          status="success"
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} // Icon thành công
          title="Payment Success!"
          subTitle={`Your payment of ${formatAmount(paymentDetails.amount)} was successful on ${formatPayDate(paymentDetails.payDate)}.`}
          extra={[
            <Button type="primary" key="dashboard" href="/dashboard">
              Go to Dashboard
            </Button>,
            <Button key="home" href="/">
              Back to Home
            </Button>,
          ]}
        >
          <Card
            title="Payment Details"
            bordered={false}
            style={{ width: '100%', maxWidth: '600px', textAlign: 'center', marginTop: '20px' }}
          >
            <Row justify="center">
              <Col>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Amount">{formatAmount(paymentDetails.amount)}</Descriptions.Item>
                  <Descriptions.Item label="Bank Code">{paymentDetails.bankCode || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Transaction No">{paymentDetails.transactionNo || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Transaction Status">{paymentDetails.transactionStatus || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Pay Date">{formatPayDate(paymentDetails.payDate)}</Descriptions.Item>
                  <Descriptions.Item label="Card Type">{paymentDetails.cardType || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Order Info">{paymentDetails.orderInfo || 'N/A'}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        </Result>
      )}
    </div>
  );
};

export default Payment;

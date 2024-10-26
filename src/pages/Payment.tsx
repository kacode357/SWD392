import { useEffect, useState } from 'react';
import { notification, Spin, Card, Descriptions, Row, Col } from 'antd'; // Sử dụng các thành phần từ Ant Design
import { createPaymentApi } from '../util/api'; // Đảm bảo đường dẫn chính xác đến file chứa createPaymentApi

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

  return (
    <div className="py-20 flex justify-center items-center min-h-screen">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Card
          title="Payment Details"
          bordered={false}
          style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}
        >
          <Row justify="center">
            <Col>
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Amount">{paymentDetails.amount}</Descriptions.Item>
                <Descriptions.Item label="Bank Code">{paymentDetails.bankCode}</Descriptions.Item>
                <Descriptions.Item label="Transaction No">{paymentDetails.transactionNo}</Descriptions.Item>
                <Descriptions.Item label="Transaction Status">{paymentDetails.transactionStatus}</Descriptions.Item>
                <Descriptions.Item label="Pay Date">{paymentDetails.payDate}</Descriptions.Item>
                <Descriptions.Item label="Card Type">{paymentDetails.cardType}</Descriptions.Item>
                <Descriptions.Item label="Order Info">{paymentDetails.orderInfo}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default Payment;

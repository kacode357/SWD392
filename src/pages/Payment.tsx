import { useEffect, useState } from 'react';
import { notification } from 'antd'; // Import notification từ Ant Design
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

        // Kiểm tra nếu response có message và hiển thị thông báo
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
    <div className="py-20">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Details</h1>
      {loading ? (
        <p className="text-center">Loading payment details...</p>
      ) : (
        <>
          <div className="text-center">
            <p><strong>Amount:</strong> {paymentDetails.amount}</p>
            <p><strong>Bank Code:</strong> {paymentDetails.bankCode}</p>
            <p><strong>Bank Transaction No:</strong> {paymentDetails.bankTranNo}</p>
            <p><strong>Card Type:</strong> {paymentDetails.cardType}</p>
            <p><strong>Order Info:</strong> {paymentDetails.orderInfo}</p>
            <p><strong>Pay Date:</strong> {paymentDetails.payDate}</p>
            <p><strong>Response Code:</strong> {paymentDetails.responseCode}</p>
            <p><strong>Tmn Code:</strong> {paymentDetails.tmnCode}</p>
            <p><strong>Transaction No:</strong> {paymentDetails.transactionNo}</p>
            <p><strong>Transaction Status:</strong> {paymentDetails.transactionStatus}</p>
            <p><strong>Txn Ref:</strong> {paymentDetails.txnRef}</p>
            <p><strong>Secure Hash:</strong> {paymentDetails.secureHash}</p>
          </div>

          {apiResponse && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">API Response:</h2>
              <pre className="text-left p-4 bg-gray-100 rounded">{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Payment;

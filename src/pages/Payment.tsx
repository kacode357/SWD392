import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    // Lấy URL hiện tại từ window.location
    const currentUrl = window.location.href;
    
    // Sử dụng URLSearchParams để lấy các field từ URL
    const params = new URLSearchParams(currentUrl.split('?')[1]);

    // Cập nhật state với các giá trị từ URL
    setPaymentDetails({
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
    });
  }, []);

  return (
    <div className="py-20">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Details</h1>
      {paymentDetails.amount ? (
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
      ) : (
        <p className="text-center">Loading payment details...</p>
      )}
    </div>
  );
};

export default Payment;

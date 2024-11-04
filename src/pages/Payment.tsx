import { useContext, useEffect, useState } from "react";
import { notification, Spin, Card, Descriptions, Result, Button } from "antd";
import { createPaymentApi } from "../util/api";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CartContext } from "../context/cart.context";

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
  const { updateCart } = useContext(CartContext);
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateCart();
    const currentUrl = window.location.href;
    const params = new URLSearchParams(currentUrl.split("?")[1]);

    const newPaymentDetails = {
      amount: params.get("vnp_Amount"),
      bankCode: params.get("vnp_BankCode"),
      bankTranNo: params.get("vnp_BankTranNo"),
      cardType: params.get("vnp_CardType"),
      orderInfo: params.get("vnp_OrderInfo"),
      payDate: params.get("vnp_PayDate"),
      responseCode: params.get("vnp_ResponseCode"),
      tmnCode: params.get("vnp_TmnCode"),
      transactionNo: params.get("vnp_TransactionNo"),
      transactionStatus: params.get("vnp_TransactionStatus"),
      txnRef: params.get("vnp_TxnRef"),
      secureHash: params.get("vnp_SecureHash"),
    };

    setPaymentDetails(newPaymentDetails);

    const fetchData = async () => {
      try {
        const response = await createPaymentApi({
          vnp_Amount: newPaymentDetails.amount || "",
          vnp_BankCode: newPaymentDetails.bankCode || "",
          vnp_BankTranNo: newPaymentDetails.bankTranNo || "",
          vnp_CardType: newPaymentDetails.cardType || "",
          vnp_OrderInfo: newPaymentDetails.orderInfo || "",
          vnp_PayDate: newPaymentDetails.payDate || "",
          vnp_ResponseCode: newPaymentDetails.responseCode || "",
          vnp_TmnCode: newPaymentDetails.tmnCode || "",
          vnp_TransactionNo: newPaymentDetails.transactionNo || "",
          vnp_TransactionStatus: newPaymentDetails.transactionStatus || "",
          vnp_TxnRef: newPaymentDetails.txnRef || "",
          vnp_SecureHash: newPaymentDetails.secureHash || "",
        });
        console.log("API Response>>>:", response);

        if (response) {
          notification.success({
            message: "Payment Success",
            description: "Your payment was successful.",
          });
        }
      } catch (error) {
        console.error("Error fetching payment API:", error);

        notification.error({
          message: "Payment Failed",
          description:
            "There was an error processing your payment. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatAmount = (amount: string | null) => {
    if (!amount) return "N/A";
    const formattedAmount = (parseFloat(amount) / 100).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedAmount;
  };

  const formatPayDate = (payDate: string | null) => {
    if (!payDate) return "N/A";
    const date = new Date(
      payDate.slice(0, 4) +
        "-" +
        payDate.slice(4, 6) +
        "-" +
        payDate.slice(6, 8)
    );
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-10 bg-gray-100">
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="flex flex-col md:flex-row justify-center w-full px-4">
          <div className="md:w-6/12 w-full p-4">
            <Card className="shadow-lg" title="Payment Details">
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Amount">
                  {formatAmount(paymentDetails.amount)}
                </Descriptions.Item>
                <Descriptions.Item label="Bank Code">
                  {paymentDetails.bankCode || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Pay Date">
                  {formatPayDate(paymentDetails.payDate)}
                </Descriptions.Item>
                <Descriptions.Item label="Card Type">
                  {paymentDetails.cardType || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Order Info">
                  {paymentDetails.orderInfo || "N/A"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>

          <div className="md:w-4/12 w-full p-4">
            <Result
              status="success"
              icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              title="Payment Success!"
              subTitle={`Your payment of ${formatAmount(
                paymentDetails.amount
              )} was successful on ${formatPayDate(paymentDetails.payDate)}.`}
              extra={[
                <Button type="primary" key="dashboard" href="/user/order-history">
                  Go to order history
                </Button>,
                <Button key="home" href="/">
                  Back to Home
                </Button>,
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;

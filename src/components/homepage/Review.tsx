// ReviewComponent.tsx
import React, { useState, useEffect } from "react";
import { Rate, Input, Button, notification } from "antd";
import { searchOrderByCurrentUserApi, createReviewApi } from "../../util/api";

const { TextArea } = Input;

interface OrderDetail {
  orderId: string;
  id: number; // orderDetailId
  shirtId: number;
}

interface ReviewComponentProps {
  shirtId: number;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ shirtId }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await searchOrderByCurrentUserApi({
          pageNum: 1,
          pageSize: 100,
          orderId: "",
          status: null,
        });

        // Log dữ liệu để kiểm tra
        console.log("Current shirtId from page:", shirtId);
        response.pageData.forEach((order: any) => {
          order.orderDetails.forEach((detail: OrderDetail) => {
            console.log("Returned shirtId:", detail.shirtId, "OrderDetail:", detail);
          });
        });

        // Lọc các `orderDetails` có `shirtId` khớp với sản phẩm hiện tại
        const itemsToReview = response.pageData
          .flatMap((order: any) => order.orderDetails)
          .filter((detail: OrderDetail) => detail.shirtId === shirtId);

        setOrderDetails(itemsToReview);
      } catch (error) {
        console.error("Error fetching orders:", error);
        notification.error({
          message: "Error",
          description: "Failed to load orders for review.",
        });
      }
    };

    fetchOrderDetails();
  }, [shirtId]);

  const handleReviewSubmit = async () => {
    if (rating === 0) {
      notification.warning({
        message: "Rating Required",
        description: "Please provide a rating before submitting your review.",
      });
      return;
    }

    if (orderDetails.length === 0) {
      notification.error({
        message: "No Order Found",
        description: "Cannot submit review as no matching order was found.",
      });
      return;
    }

    const reviewData = {
      orderId: orderDetails[0].orderId,
      orderDetailId: orderDetails[0].id,
      scoreRating: rating,
      comment: comment,
    };

    try {
      await createReviewApi(reviewData);
      notification.success({
        message: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      notification.error({
        message: "Error",
        description: "Failed to submit review. Please try again.",
      });
    }
  };

  // Kiểm tra nếu không có `orderDetails` nào phù hợp với `shirtId`, ẩn phần review
  if (orderDetails.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Submit Your Review</h2>
      <Rate value={rating} onChange={(value) => setRating(value)} />
      <TextArea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here..."
        className="mt-2"
      />
      <Button
        type="primary"
        className="mt-4"
        onClick={handleReviewSubmit}
        disabled={orderDetails.length === 0}
      >
        Submit Review
      </Button>
    </div>
  );
};

export default ReviewComponent;

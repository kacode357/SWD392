import React, { useState, useEffect } from "react";
import { Rate, Button, notification, List, Skeleton, Avatar } from "antd";
import {
  searchOrderByCurrentUserApi,
  createReviewApi,
  getReviewByShirtApi,
} from "../../util/api";
import TinyMCEEditorComponent from "../../util/TinyMCEEditor";

interface OrderDetail {
  orderId: string;
  id: number;
  shirtId: number;
}

interface Review {
  userName: string;
  scoreRating: number;
  comment: string;
  imgUrl: string;
}

interface ReviewComponentProps {
  shirtId: number;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ shirtId }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchOrderDetails = async () => {
      try {
        const response = await searchOrderByCurrentUserApi({
          pageNum: 1,
          pageSize: 1000,
          orderId: "",
          status: null,
        });

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
  }, [shirtId, token]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getReviewByShirtApi(shirtId);
      setReviews(response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [shirtId, reloadFlag]);

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
      setReloadFlag(!reloadFlag);
    } catch (error) {
      console.error("Error submitting review:", error);
      notification.error({
        message: "Error",
        description: "Failed to submit review. Please try again.",
      });
    }
  };

  return (
    <div className="review-container">
      {/* List of Reviews */}
      <div className="reviews-list-container">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available</p>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={reviews}
            loading={loading}
            renderItem={(review) => (
              <List.Item>
                <Skeleton avatar title={false} loading={loading} active>
                  <div className="flex items-start space-x-4 w-full">
                    {/* Avatar */}
                    <Avatar
                      src={review.imgUrl || "https://via.placeholder.com/150"}
                      size={50}
                    />
                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">
                          {review.userName}
                        </span>
                      </div>
                      <Rate
                        disabled
                        defaultValue={review.scoreRating}
                        className="mt-1"
                      />
                      <div
                        className="mt-2 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: review.comment }}
                      />
                    </div>
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        )}
      </div>

      {/* Conditional Submit Review Form */}
      {token && orderDetails.length > 0 && (
        <div className="submit-review-container">
          <h2 className="text-xl font-semibold mb-4">Submit Your Review</h2>
          <Rate value={rating} onChange={(value) => setRating(value)} />
          <TinyMCEEditorComponent
            value={comment}
            onEditorChange={(content) => setComment(content)}
          />
          <div className="flex justify-end mt-4">
            <Button
              type="primary"
              className="bg-black hover:bg-gray-500 text-white"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;

import React, { useState, useEffect, useContext } from "react";
import { Rate, Button, Input, List, Skeleton, Avatar, notification } from "antd";
import {
  searchOrderByCurrentUserApi,
  createReviewApi,
  getReviewByShirtApi,
  getUserByIdApi,
} from "../../util/api";
import { AuthContext } from "../../context/auth.context";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

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
  const [userImgUrl, setUserImgUrl] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const { auth } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!auth || !auth.user.id) return;

    const fetchUserData = async () => {
      try {
        const userData = await getUserByIdApi(auth.user.id);
        setUserImgUrl(userData.imgUrl);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [auth]);

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

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setComment((prevComment) => prevComment + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="py-6 px-4 bg-gray-50 rounded-md shadow-md">
      {token && orderDetails.length > 0 && (
        <div className="bg-gray-100 rounded-lg mb-6 p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Submit Your Review</h2>
          <div className="flex items-start space-x-4">
            <Avatar
              size={40}
              className="flex-shrink-0"
              src={userImgUrl || "https://via.placeholder.com/150"}
            />
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <span className="font-bold mr-3">Rating:</span>
                <Rate value={rating} onChange={(value) => setRating(value)} />
              </div>
              <Input
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ borderRadius: "6px", padding: "8px" }}
                suffix={
                  <SmileOutlined
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    style={{ cursor: "pointer", fontSize: "20px" }}
                  />
                }
              />
              {showEmojiPicker && (
                <div className="absolute mt-2 z-10">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  className="bg-black hover:bg-gray-600 text-white"
                  onClick={handleReviewSubmit}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-4 border-b">
        <h2 className=" text-xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available</p>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <List
              itemLayout="horizontal"
              dataSource={reviews}
              loading={loading}
              renderItem={(review) => (
                <List.Item>
                  <Skeleton avatar title={false} loading={loading} active>
                    <div className="flex items-start space-x-4 w-full">
                      <Avatar
                        src={review.imgUrl || "https://via.placeholder.com/150"}
                        size={50}
                      />
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
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    </div>
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;

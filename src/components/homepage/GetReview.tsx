// ReviewComponent.tsx
import React, { useEffect, useState } from 'react';
import { getReviewByShirtApi } from '../../util/api'; // Giả sử bạn có API này để lấy review dựa vào shirtId
import { List, Rate, Skeleton, Avatar } from 'antd';

interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewComponentProps {
  shirtId: number;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ shirtId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

    fetchReviews();
  }, [shirtId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      <List
        itemLayout="horizontal"
        dataSource={reviews}
        loading={loading}
        renderItem={(review) => (
          <List.Item>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar src="https://via.placeholder.com/150" />} // Placeholder avatar hoặc từ data
                title={<span className="font-semibold">{review.reviewerName}</span>}
                description={
                  <div>
                    <Rate disabled defaultValue={review.rating} />
                    <p>{review.comment}</p>
                    <small className="text-gray-500">{new Date(review.date).toLocaleDateString()}</small>
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReviewComponent;

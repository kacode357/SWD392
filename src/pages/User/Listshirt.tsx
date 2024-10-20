import React, { useEffect, useState } from 'react';
import { Card, notification } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { searchShirtApi } from '../../util/api'; // Đảm bảo đường dẫn nhập chính xác
import { useParams } from 'react-router-dom'; // Import useParams

interface ShirtProps {
    id: number;
    name: string;
    price: string;
    salePrice: string;
    imageUrl: string;
    isLiked: boolean;
}

const Listshirt: React.FC = () => {
    const { clubId } = useParams<{ clubId: string }>(); // Nhận ID câu lạc bộ từ đường dẫn
    const [shirts, setShirts] = useState<ShirtProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchShirts = async () => {
            try {
                const data = await searchShirtApi({ pageNum: 1, pageSize: 20, keyWord: '', status: 1 });

                if (data && data.pageData) {
                    const filteredShirts = data.pageData.filter((shirt: any) => shirt.clubId === Number(clubId));

                    // Kiểm tra nếu không có áo phông nào cho câu lạc bộ
                    if (filteredShirts.length === 0) {
                        notification.error({
                            message: 'Error',
                            description: 'No shirts found for the selected club.',
                        });
                    }

                    // Map the fetched shirt data to the expected format
                    const mappedShirts = filteredShirts.map((shirt: any) => ({
                        id: shirt.id,
                        name: shirt.name,
                        price: `£${shirt.price}`, // Điều chỉnh định dạng nếu cần
                        salePrice: `£${shirt.salePrice || shirt.price}`, // Điều chỉnh cho giá bán nếu có
                        imageUrl: shirt.urlImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2NAjCcjjk7ac57mKCQvgWVTmP0ysxnzQnQ&s', // Placeholder nếu không có URL hình ảnh
                        isLiked: false, // Khởi tạo trạng thái liked theo nhu cầu
                    }));

                    setShirts(mappedShirts);
                } else {
                    console.error('Unexpected data format:', data);
                    notification.error({
                        message: 'Error',
                        description: 'Failed to fetch shirts data.',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch shirts:', error);
                notification.error({
                    message: 'Error',
                    description: 'Unable to load shirt data.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchShirts();
    }, [clubId]);

    if (loading) {
        return <div>Loading...</div>; // Thay thế bằng component loading đẹp hơn nếu cần
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-8 py-20">
            {shirts.map((shirt) => (
                <Card
                    key={shirt.id}
                    className="relative border border-gray-200 shadow-sm"
                    cover={<img alt={shirt.name} src={shirt.imageUrl} />}
                >
                    <div className="absolute top-2 right-2">
                        {shirt.isLiked ? (
                            <HeartFilled className="text-red-500" />
                        ) : (
                            <HeartOutlined />
                        )}
                    </div>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 line-through">{shirt.price}</p>
                        <p className="text-xl font-semibold text-red-600">{shirt.salePrice}</p>
                        <p className="text-sm text-gray-700 mt-2">{shirt.name}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default Listshirt;

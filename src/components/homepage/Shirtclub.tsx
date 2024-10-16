import React, { useEffect, useState } from 'react';
import { searchShirtApi } from '../../util/api';

const Shirtclub: React.FC = () => {
    const [shirts, setShirts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const defaultImageUrl = 'https://images-cdn.ubuy.com.sa/65e14cc2c9e589405149a28b-error-404-costume-not-found-t-shirt.jpg'; // URL ảnh mặc định

    const fetchShirts = async () => {
        setLoading(true);
        const data = {
            pageNum: 1,
            pageSize: 5, // Lấy tối đa 5 áo
            keyWord: "",
            status: 1, // Chỉ lấy áo đang active
        };

        try {
            const response = await searchShirtApi(data);

            if (response?.pageData) {
                const formattedShirts = response.pageData
                    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sắp xếp theo ngày tạo giảm dần
                    .slice(0, 5) // Chỉ lấy 5 áo đầu tiên
                    .map((shirt: any) => ({
                        name: shirt.playerName,
                        imageUrl: shirt.urlImg && shirt.urlImg.startsWith('http') ? shirt.urlImg : defaultImageUrl, // Kiểm tra và sử dụng ảnh mặc định nếu thiếu
                    }));

                setShirts(formattedShirts);
            }
        } catch (error) {
            console.error("Failed to fetch shirts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShirts();
    }, []);

    return (
        <div className="px-20 py-10">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-5 gap-6">
                    {shirts.map((shirt, index) => (
                        <div key={index} className="text-center">
                            <div className="relative w-full h-80 overflow-hidden">
                                <img
                                    src={shirt.imageUrl}
                                    alt={shirt.name}
                                    className="w-full h-full object-cover transition duration-300 hover:scale-110"
                                />
                                <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2">
                                    {shirt.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shirtclub;

import React, { useEffect, useState } from 'react';
import { Card, notification } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { searchShirtApi, searchClientClubApi } from '../../util/api'; // Import thêm API để lấy dữ liệu câu lạc bộ
import { useNavigate, useParams } from 'react-router-dom';
import BreadcrumbComponent from '../../layout/Breadcrumb';

interface ShirtProps {
    id: number;
    name: string;
    price: string;
    salePrice: string;
    imageUrl: string;
    isLiked: boolean;
}

const Listshirt: React.FC = () => {
    const { clubId, playerId } = useParams<{ clubId?: string; playerId?: string }>();
    const [shirts, setShirts] = useState<ShirtProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [clubName, setClubName] = useState<string>(''); // State để lưu tên câu lạc bộ
    const navigate = useNavigate();

    useEffect(() => {
        if (!clubId) return;

        const fetchClubName = async () => {
            try {
                const data = await searchClientClubApi({ pageNum: 1, pageSize: 10, keyWord: '', status: true });
                const club = data.pageData.find((club: any) => club.id === Number(clubId));
                if (club) {
                    setClubName(club.name); // Lưu tên câu lạc bộ vào state
                }
            } catch (error) {
                console.error('Failed to fetch club name:', error);
            }
        };

        fetchClubName();

        const fetchShirtsByClub = async () => {
            try {
                setLoading(true);
                const data = await searchShirtApi({ pageNum: 1, pageSize: 20, keyWord: '', status: 1 });

                if (data && data.pageData) {
                    const filteredShirts = data.pageData.filter(
                        (shirt: any) => shirt.clubId === Number(clubId)
                    );

                    if (filteredShirts.length === 0) {
                        notification.error({
                            message: 'Error',
                            description: 'No shirts found for the selected club.',
                        });
                    }

                    const mappedShirts = filteredShirts.map((shirt: any) => ({
                        id: shirt.id,
                        name: shirt.name,
                        price: `£${shirt.price}`,
                        salePrice: `£${shirt.salePrice || shirt.price}`,
                        imageUrl: shirt.urlImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2NAjCcjjk7ac57mKCQvgWVTmP0ysxnzQnQ&s',
                        isLiked: false,
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

        fetchShirtsByClub();
    }, [clubId]);

    useEffect(() => {
        if (!playerId) return;

        const fetchShirtsByPlayer = async () => {
            try {
                setLoading(true);
                const data = await searchShirtApi({ pageNum: 1, pageSize: 20, keyWord: '', status: 1 });

                if (data && data.pageData) {
                    const filteredShirts = data.pageData.filter(
                        (shirt: any) => shirt.playerId === Number(playerId)
                    );

                    if (filteredShirts.length === 0) {
                        notification.error({
                            message: 'Error',
                            description: 'No shirts found for the selected player.',
                        });
                    }

                    const mappedShirts = filteredShirts.map((shirt: any) => ({
                        id: shirt.id,
                        name: shirt.name,
                        price: `£${shirt.price}`,
                        salePrice: `£${shirt.salePrice || shirt.price}`,
                        imageUrl: shirt.urlImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2NAjCcjjk7ac57mKCQvgWVTmP0ysxnzQnQ&s',
                        isLiked: false,
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

        fetchShirtsByPlayer();
    }, [playerId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-5 gap-4 p-8 py-20">
            <BreadcrumbComponent />
            {shirts.map((shirt) => (
                <Card
                    key={shirt.id}
                    className="relative border border-gray-200 shadow-sm w-64 "
                    cover={<img className='h-64 rounded ' alt={shirt.name} src={shirt.imageUrl} />}
                    onClick={() => navigate(`/shirt-details/${shirt.id}`)}
                >
                    <div className="absolute top-2 right-2">
                        {shirt.isLiked ? (
                            <HeartFilled className="text-red-500" />
                        ) : (
                            <HeartOutlined />
                        )}
                    </div>
                    <div className="mt-2">
                        <p className="text-xl text-gray-700 mt-2">{shirt.name}</p>
                        <p className="text-sm text-gray-500">Club: {clubName}</p> {/* Hiển thị tên câu lạc bộ */}
                        <p className="text-xl font-semibold text-red-600">{shirt.price}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default Listshirt;

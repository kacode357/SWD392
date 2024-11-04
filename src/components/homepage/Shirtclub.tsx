import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { searchClientShirtApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';

const Shirtclub: React.FC = () => {
    const [shirts, setShirts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShirts = async () => {
            try {
                const response = await searchClientShirtApi({ pageNum: 1, pageSize: 100, keyWord: '', status: 1 });
       
                if (response.pageData && Array.isArray(response.pageData)) {
                    setShirts(response.pageData);
                } else {
                    setShirts([]);
                }
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch shirts.');
                setLoading(false);
            }
        };

        fetchShirts();
    }, []);

    if (loading) {
        return (
            <div className="px-20 py-10">
                <div className="grid grid-cols-5 gap-6">
                    {Array(5).fill(0).map((_, index) => (
                        <div key={index} className="text-center">
                            <Skeleton.Image active={true} className="w-full h-80" />
                            <Skeleton.Input style={{ width: '100%' }} active={true} size="default" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) return <div>{error}</div>;

    // Định nghĩa ba câu lạc bộ cần hiển thị
    const specificClubs = ['Manchester City', 'FC Barcelona', 'Real Madrid'];

    // Lưu trữ áo của từng câu lạc bộ
    const shirtsByClub = specificClubs.map(club => {
        const filteredShirts = shirts.filter(shirt => shirt.clubName === club);
        return {
            clubName: club,
            shirts: filteredShirts.slice(0, 5), // Lấy tối đa 5 chiếc áo cho mỗi câu lạc bộ
        };
    });

    return (
        <div className="px-20 py-10">
            {shirtsByClub.length > 0 ? (
                shirtsByClub.map((clubData, index) => (
                    <div key={index}>
                        <h2
                            className="text-xl mb-4 font-bold cursor-pointer underline hover:no-underline"
                            onClick={() => navigate(`/listshirt?nameclub=${encodeURIComponent(clubData.clubName)}`)}
                        >
                            {clubData.clubName}
                        </h2>
                        {clubData.shirts.length > 0 ? (
                            <div className="grid grid-cols-5 gap-6 mb-8">
                                {clubData.shirts.map((shirt, shirtIndex) => (
                                    <div
                                        key={shirtIndex}
                                        className="text-center cursor-pointer"
                                        onClick={() => navigate(`listshirt/shirt-details/${shirt.id}`)}
                                    >
                                        <div className="relative w-full h-80 overflow-hidden">
                                            <img
                                                src={
                                                    shirt.urlImg && (shirt.urlImg.startsWith('http://') || shirt.urlImg.startsWith('https://'))
                                                        ? shirt.urlImg
                                                        : 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                                                }
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
                        ) : (
                            <div className="text-center">Không có áo nào để hiển thị.</div>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center">Không có áo nào để hiển thị.</div>
            )}
        </div>
    );
};

export default Shirtclub;

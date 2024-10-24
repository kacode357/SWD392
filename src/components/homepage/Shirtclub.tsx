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
                const response = await searchClientShirtApi({ pageNum: 1, pageSize: 5, keyWord: '', status: 1 });
                console.log(response);
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

    return (
        <div className="px-20 py-10">
            <div className="grid grid-cols-5 gap-6"> 
                {shirts.map((shirt, index) => (
                    <div
                        key={index}
                        className="text-center cursor-pointer" 
                        onClick={() => navigate(`/shirt-details/${shirt.id}`)} 
                    >
                        <div className="relative w-full h-80 overflow-hidden"> {/* Increased height */}
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
        </div>
    );
};

export default Shirtclub;

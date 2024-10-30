import React from 'react';
import { useNavigate } from 'react-router-dom';

const Shirtnew: React.FC = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleAllShirtsClick = () => {
        navigate('/allshirts'); // Điều hướng đến trang AllShirts
    };

    return (
        <div className="px-20">
            <div className="grid grid-cols-3 gap-4">
                {/* Main Image Section */}
                <div
                    className="col-span-2 relative cursor-pointer overflow-hidden" // Thêm overflow-hidden vào container chính
                    onClick={handleAllShirtsClick}
                >
                    <img
                        src="https://static1.cdn-subsidesports.com/2/media/resized/860_500/m/a/mag2-homeslide_newseason2425_3.jpg"
                        alt="New Season Kits"
                        className="w-full h-[400px] object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-80" // Thêm hover:scale-105 và hover:opacity-80
                    />
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-4">
                        All Shirt
                    </div>
                </div>

                {/* Side Image Section */}
                <div className="flex flex-col justify-between">
                    <div className="relative overflow-hidden w-full h-[190px]">
                        <img
                            src="https://static1.cdn-subsidesports.com/2/media/pixiemedia/featureblocks/fblock/image//h/o/hompage500x500_latest011024.jpg"
                            alt="Latest Additions"
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-80" // Hover effect added
                        />
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2">
                            Types Shirts
                        </div>
                    </div>

                    <div className="relative overflow-hidden w-full h-[190px] mt-4">
                        <img
                            src="https://static1.cdn-subsidesports.com/2/media/pixiemedia/featureblocks/fblock/image//h/o/hompage500x500_eng-away35off_copy_2.jpg"
                            alt="Special Offers"
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-80" // Hover effect added
                        />
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2">
                            Session
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shirtnew;

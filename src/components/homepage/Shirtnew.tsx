import React from 'react';
import { useNavigate } from 'react-router-dom';

const Shirtnew: React.FC = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleAllShirtsClick = () => {
        navigate('/allshirts'); // Điều hướng đến trang AllShirts
    };
    return (
        <div className="px-20 ">
            <div className="grid grid-cols-3 gap-4 ">
                {/* Main Image Section */}
                <div
                    className="col-span-2 relative cursor-pointer hover:opacity-80" // Cursor change and hover opacity for blur effect
                    onClick={handleAllShirtsClick}
                >
                    <img
                        src="https://static1.cdn-subsidesports.com/2/media/resized/860_500/m/a/mag2-homeslide_newseason2425_3.jpg"
                        alt="New Season Kits"
                        className="w-full h-[400px] object-cover transition duration-300 ease-in-out " // Smooth transition for hover effect
                    />
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-4">
                        All Shirt
                    </div>
                </div>

                {/* Side Image Section */}
                <div className="flex flex-col justify-between">
                    <div className="relative">
                        <img
                            src="https://static1.cdn-subsidesports.com/2/media/pixiemedia/featureblocks/fblock/image//h/o/hompage500x500_latest011024.jpg"
                            alt="Latest Additions"
                            className="w-full h-[190px] object-cover" // Set fixed height
                        />
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2">
                            Types Shirts
                        </div>
                    </div>

                    <div className="relative mt-4">
                        <img
                            src="https://static1.cdn-subsidesports.com/2/media/pixiemedia/featureblocks/fblock/image//h/o/hompage500x500_eng-away35off_copy_2.jpg"
                            alt="Special Offers"
                            className="w-full h-[190px] object-cover" // Set fixed height
                        />
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2 flex justify-between items-center">
                            Session
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Shirtnew;

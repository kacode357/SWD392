import React from 'react';

const Shirtnew: React.FC = () => {
    return (
        <div className="flex justify-center items-center ">
            <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
                {/* Main Image Section */}
                <div className="col-span-2 relative">
                    <img
                        src="https://i.pinimg.com/564x/18/64/c0/1864c0de39d6fdfdefbe639dc716718b.jpg"
                        alt="New Season Kits"
                        className="w-full h-[400px] object-cover" // Set fixed height
                    />
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-4">
                        New Season Kits!
                    </div>
                </div>

                {/* Side Image Section */}
                <div className="flex flex-col justify-between">
                    <div className="relative">
                        <img
                            src="https://i.pinimg.com/564x/18/64/c0/1864c0de39d6fdfdefbe639dc716718b.jpg"
                            alt="Latest Additions"
                            className="w-full h-[190px] object-cover" // Set fixed height
                        />
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2">
                            Latest Additions
                        </div>
                    </div>

                    <div className="relative mt-4">
                        <img
                            src="https://i.pinimg.com/564x/18/64/c0/1864c0de39d6fdfdefbe639dc716718b.jpg"
                            alt="Special Offers"
                            className="w-full h-[190px] object-cover" // Set fixed height
                        />
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-lg p-2 flex justify-between items-center">
                            Special Offers
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shirtnew;

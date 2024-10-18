import React from 'react';

const NavigationComponent: React.FC = () => {
    return (
        <nav className="bg-black text-white p-4">
            <ul className="flex justify-between items-center">
                <li className="px-4">
                    <span className="relative">LATEST
                        <div className="absolute w-full h-1 bg-green-500 mt-1"></div>
                    </span>
                </li>
                <li className="px-4">
                    <span className="relative">OFFERS
                        <div className="absolute w-full h-1 bg-red-500 mt-1"></div>
                    </span>
                </li>
                <li className="px-4">EURO 2024</li>
                <li className="px-4">UCL</li>
                <li className="px-4">CLUB <span className="ml-1">▼</span></li>
                <li className="px-4">NATIONAL <span className="ml-1">▼</span></li>
                <li className="px-4">PATCHES & PRINTING</li>
                <li className="px-4">PRODUCTS <span className="ml-1">▼</span></li>
                <li className="px-4">PLAYERS <span className="ml-1">▼</span></li>
                <li className="px-4">AUTHENTICS</li>
                <li className="px-4">RETRO <span className="ml-1">▼</span></li>
            </ul>
        </nav>
    );
};

export default NavigationComponent;

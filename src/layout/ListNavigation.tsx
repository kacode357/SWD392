import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NavigationComponent: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/clubshirt'); // Điều hướng đến trang clubshirt
    };
    return (
        <div>
            <nav className="fixed top-0 w-full bg-black text-white py-4 z-50" style={{ backgroundColor: 'black', color: 'white', padding: '16px', marginTop: '64px' }}>
                <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', padding: 0 }}>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            <span style={{ position: 'relative' }}>
                                LATEST
                                <div style={{ position: 'absolute', width: '100%', height: '4px', backgroundColor: '#22c55e', marginTop: '4px' }}></div>
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            <span style={{ position: 'relative' }}>
                                OFFERS
                                <div style={{ position: 'absolute', width: '100%', height: '4px', backgroundColor: '#ef4444', marginTop: '4px' }}></div>
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            EURO 2024
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            UCL
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }} onClick={handleNavigate}>
                            CLUB
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            NATIONAL
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            PATCHES & PRINTING
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            PRODUCTS
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            PLAYERS
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            AUTHENTICS
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            RETRO
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationComponent;

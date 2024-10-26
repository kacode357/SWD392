import React from 'react';
import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import ClubMenuComponent from '../components/Menu/ClubMenu';
import PlayerMenuComponent from '../components/Menu/PlayerMenu';
import SessionComponent from '../components/Menu/SessionMenu';

const NavigationComponent: React.FC = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleAllShirtsClick = () => {
        navigate('/allshirts'); // Điều hướng đến trang AllShirts
    };

    return (
        <div style={{ position: 'relative' }}>
            <nav
                className="fixed top-0 w-full bg-black text-white py-4 z-50 border-t border-white"
                style={{ backgroundColor: 'black', color: 'white', padding: '16px', marginTop: '64px' }}
            >
                <ul
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        listStyle: 'none',
                        padding: 0,
                    }}
                >
                    <li>
                        <Button type="text" style={{ color: 'white' }} onClick={handleAllShirtsClick}>
                            ALL SHIRTS
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            OFFERS
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            EURO 2024
                        </Button>
                    </li>
                    <li>
                        <Dropdown overlay={<SessionComponent />} trigger={['hover']}>
                            <Button type="text" style={{ color: 'white' }}>
                                SESSION <DownOutlined />
                            </Button>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown overlay={<ClubMenuComponent />} trigger={['hover']}>
                            <Button type="text" style={{ color: 'white' }}>
                                CLUB <DownOutlined />
                            </Button>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown overlay={<PlayerMenuComponent />} trigger={['hover']}>
                            <Button type="text" style={{ color: 'white' }}>
                                PLAYERS <DownOutlined />
                            </Button>
                        </Dropdown>
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

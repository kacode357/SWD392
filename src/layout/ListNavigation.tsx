import React, { useState } from 'react';
import { Button, Dropdown, Menu, Skeleton } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { searchClientClubApi } from '../util/api';
import PlayerMenu from '../components/Menu/PlayerMenu';

interface Club {
    id: number;
    name: string;
    country: string;
    establishedYear: string;
    stadiumName: string;
    clubLogo: string;
    description: string;
    status: boolean;
}

const NavigationComponent: React.FC = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(false);
    const [showPlayerMenu, setShowPlayerMenu] = useState(false); // State for displaying player menu
    const [selectedLetter, setSelectedLetter] = useState('A'); // Chữ cái mặc định là 'A'
    const navigate = useNavigate();

    const handleClubMouseEnter = async () => {
        try {
            setLoading(true);
            const data = { pageNum: 1, pageSize: 10, keyWord: '', status: true };
            const result = await searchClientClubApi(data);

            if (result && Array.isArray(result.pageData)) {
                setClubs(result.pageData);
            } else {
                setClubs([]);
            }
        } catch (error) {
            console.error('Error fetching clubs', error);
            setClubs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleClubClick = (clubId: number) => {
        navigate(`/listshirt/${clubId}`);
    };

    const handleViewAllClick = (sectionTitle: string) => {
        alert(`You clicked "View all" for section: ${sectionTitle}`);
    };

    const handleMouseEnter = (letter: string) => {
        setSelectedLetter(letter);
        setShowPlayerMenu(true);
    };

    const playerMenu = (
        <div
            onMouseLeave={() => setShowPlayerMenu(false)}
            style={{
                position: 'absolute',
                top: '50px',
                left: '50%', // Căn giữa theo chiều ngang
                transform: 'translateX(-50%)', // Dịch chuyển menu sang trái 50% để căn giữa
                zIndex: 1000,
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'white', // Đảm bảo có màu nền để dễ nhìn thấy menu
            }}
        >
            <PlayerMenu onViewAllClick={handleViewAllClick} initialLetter={selectedLetter} />
        </div>
    );

    const clubMenu = (
        <Menu>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} style={{ padding: '8px', textAlign: 'center' }}>
                            <Skeleton.Avatar active size="large" shape="circle" />
                            <Skeleton.Input style={{ width: '80px', marginTop: '8px' }} active size="small" />
                        </div>
                    ))
                ) : (
                    clubs.map((club) => (
                        <div
                            key={club.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px',
                                borderRight: '1px solid #ccc',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleClubClick(club.id)}
                        >
                            <img
                                src={club.clubLogo}
                                alt={club.name}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    marginRight: '8px',
                                    paddingRight: '8px',
                                }}
                            />
                            <span>{club.name}</span>
                        </div>
                    ))
                )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Button type="link" onClick={() => navigate('/clubshirt')}>
                    View All
                </Button>
            </div>
        </Menu>
    );

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
                        <Button type="text" style={{ color: 'white' }}>
                            <span style={{ position: 'relative' }}>
                                LATEST
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '4px',
                                        backgroundColor: '#22c55e',
                                        marginTop: '4px',
                                    }}
                                ></div>
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            <span style={{ position: 'relative' }}>
                                OFFERS
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '4px',
                                        backgroundColor: '#ef4444',
                                        marginTop: '4px',
                                    }}
                                ></div>
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
                        <Dropdown overlay={clubMenu} trigger={['hover']} onVisibleChange={handleClubMouseEnter}>
                            <Button type="text" style={{ color: 'white' }}>
                                CLUB <DownOutlined />
                            </Button>
                        </Dropdown>
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('A')} // Di chuột vào để hiển thị PlayerMenu
                        style={{ position: 'relative' }}
                    >
                        <Button type="text" style={{ color: 'white' }}>
                            PLAYERS <DownOutlined />
                        </Button>
                        {showPlayerMenu && playerMenu}
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

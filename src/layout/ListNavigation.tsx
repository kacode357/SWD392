import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons'; // Import DownOutlined for dropdown icon
import { useNavigate } from 'react-router-dom';
import { searchClientClubApi } from '../util/api';

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
    const navigate = useNavigate();

    const handleClubMouseEnter = async () => {
        try {
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
        }
    };

    const handleClubClick = (clubId: number) => {
        navigate(`/clubshirt/${clubId}`);
    };

    const clubMenu = (
        <Menu>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {clubs.map((club) => (
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
                                width: '24px',
                                height: '24px',
                                marginRight: '8px',
                                borderRight: '1px solid #ddd',
                                paddingRight: '8px',
                            }}
                        />
                        <span>{club.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Button type="link" onClick={() => navigate('/clubshirt')}>
                    View All
                </Button>
            </div>
        </Menu>
    );

    return (
        <div>
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
                                CLUB <DownOutlined /> {/* Add dropdown icon */}
                            </Button>
                        </Dropdown>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            NATIONAL <DownOutlined /> {/* Add dropdown icon */}
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            PATCHES & PRINTING
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            PRODUCTS <DownOutlined /> {/* Add dropdown icon */}
                        </Button>
                    </li>
                    <li>
                        <Button type="text" style={{ color: 'white' }}>
                            PLAYERS <DownOutlined /> {/* Add dropdown icon */}
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

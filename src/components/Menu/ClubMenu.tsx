import React, { useEffect, useState } from 'react';
import { Button, Menu, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

import { searchClientClubApi } from '../../util/api'; // Import API

interface Club {
    id: number;
    name: string;
    clubLogo: string;
}

const ClubMenuComponent: React.FC = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClubs = async () => {
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

        fetchClubs();
    }, []); // Gọi API khi component được render



    return (
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
                            onClick={() => navigate(`/listshirt?nameclub=${encodeURIComponent(club.name)}`)}
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
};

export default ClubMenuComponent;

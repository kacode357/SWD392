import React, { useEffect, useState } from 'react';
import { Button, Menu, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getSessionApi } from '../../util/api'; // Import API

interface Session {
    id: number;
    name: string;
 
}

const SessionMenuComponent: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const data = { pageNum: 1, pageSize: 10, keyWord: '', status: true };
                const result = await getSessionApi(data);

                if (result && Array.isArray(result.pageData)) {
                    setSessions(result.pageData);
                } else {
                    setSessions([]);
                }
            } catch (error) {
                console.error('Error fetching sessions', error);
                setSessions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []); // Gọi API khi component được render

    const handleSessionClick = (sessionsName: string) => {
        navigate(`/listshirt?namesession=${encodeURIComponent(sessionsName)}`);
    };
   
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
                    sessions.map((session) => (
                        <div
                            key={session.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px',
                                borderRight: '1px solid #ccc',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleSessionClick(session.name)}
                        >
                            <span>{session.name}</span>
                        </div>
                    ))
                )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Button type="link" onClick={() => navigate('/allsessions')}>
                    View All
                </Button>
            </div>
        </Menu>
    );
};

export default SessionMenuComponent;

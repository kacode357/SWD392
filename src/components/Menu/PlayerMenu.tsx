import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { getPlayerApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';

interface Player {
    id: number;
    name: string;
}

interface MenuSection {
    title: string;
    players: Player[];
}

interface PlayerMenuProps {
    onViewAllClick: (sectionTitle: string) => void;
    initialLetter: string; // Thêm prop initialLetter
}

const PlayerMenu: React.FC<PlayerMenuProps> = ({ onViewAllClick, initialLetter }) => {
    const [sections, setSections] = useState<MenuSection[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const columnMappings = [
        { title: 'A - E', range: /^[A-Ea-e]/ },
        { title: 'F - J', range: /^[F-Jf-j]/ },
        { title: 'K - M', range: /^[K-Mk-m]/ },
        { title: 'N - R', range: /^[N-Rn-r]/ },
        { title: 'S - Z', range: /^[S-Zs-z]/ },
    ];

    const fetchPlayers = async () => {
        try {
            setLoading(true);
            const data = {
                pageNum: 1,
                pageSize: 100,
                keyWord: '',
                status: true,
            };
            const response = await getPlayerApi(data);

            if (response && response.pageData) {
                const players = response.pageData.map((player: any) => ({
                    id: player.id,
                    name: player.fullName,
                }));

                const sectionsData: MenuSection[] = columnMappings.map(mapping => ({
                    title: mapping.title,
                    players: players.filter((player: { name: string; }) => mapping.range.test(player.name)),
                }));

                setSections(sectionsData);
            } else {
                notification.error({
                    message: 'Error',
                    description: 'No player data found.',
                });
                setSections([]);
            }
        } catch (error) {
            console.error('Error fetching players:', error);
            notification.error({
                message: 'Error',
                description: 'Unable to load player data.',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, [initialLetter]); // Có thể sử dụng initialLetter để cập nhật dữ liệu nếu cần

    const handlePlayerClick = (playerId: number) => {
        navigate(`/listshirt/${playerId}`);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '1000px',
                margin: '0 auto',
                overflow: 'hidden',
            }}
        >
            {loading ? (
                <div style={{ textAlign: 'center', width: '100%' }}>Loading...</div>
            ) : sections.length === 0 ? (
                <div style={{ textAlign: 'center', width: '100%' }}>No players found</div>
            ) : (
                sections.map((section, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            margin: '0 10px',
                            minWidth: '150px',
                            maxWidth: '180px',
                            textAlign: 'center',
                        }}
                    >
                        <h3
                            style={{
                                borderBottom: '2px solid grey',
                                paddingBottom: '4px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: 'black',
                            }}
                        >
                            {section.title}
                        </h3>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: '8px 0',
                                maxHeight: '250px',
                                overflowY: 'auto',
                            }}
                        >
                            {section.players.map((player) => (
                                <li
                                    key={player.id}
                                    onClick={() => handlePlayerClick(player.id)}
                                    style={{
                                        padding: '4px 0',
                                        color: 'black',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {player.name}
                                </li>
                            ))}
                        </ul>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onViewAllClick(section.title);
                            }}
                            style={{
                                color: 'black',
                                textDecoration: 'underline',
                                fontSize: '14px',
                                display: 'block',
                                marginTop: '8px',
                            }}
                        >
                            View all &gt;
                        </a>
                    </div>
                ))
            )}
        </div>
    );
};

export default PlayerMenu;

import React, { useEffect, useState } from 'react';
import { Button, Menu, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getPlayerApi } from '../../util/api'; // Giả sử bạn có API getPlayerApi

interface Player {
    id: number;
    fullName: string;
    position: string;
    club: string;
}

const PlayerMenuComponent: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Helper function to group players by initial letters
    const groupPlayers = (players: Player[]) => {
        const groups = {
            'A-E': [] as Player[],
            'F-J': [] as Player[],
            'K-M': [] as Player[],
            'N-R': [] as Player[],
            'S-Z': [] as Player[],
        };

        players.forEach((player) => {
            const firstLetter = player.fullName.charAt(0).toUpperCase();
            if (/[A-E]/.test(firstLetter)) {
                groups['A-E'].push(player);
            } else if (/[F-J]/.test(firstLetter)) {
                groups['F-J'].push(player);
            } else if (/[K-M]/.test(firstLetter)) {
                groups['K-M'].push(player);
            } else if (/[N-R]/.test(firstLetter)) {
                groups['N-R'].push(player);
            } else if (/[S-Z]/.test(firstLetter)) {
                groups['S-Z'].push(player);
            }
        });

        return groups;
    };

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);
                const data = { pageNum: 1, pageSize: 100, keyWord: '', status: true }; // Tăng pageSize để lấy nhiều cầu thủ hơn
                const result = await getPlayerApi(data); // Giả sử API trả về danh sách player

                if (result && Array.isArray(result.pageData)) {
                    setPlayers(result.pageData);
                } else {
                    setPlayers([]);
                }
            } catch (error) {
                console.error('Error fetching players', error);
                setPlayers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []); // Gọi API khi component được render

    const handlePlayerClick = (playerName: string) => {
        navigate(`/listshirt?nameplayer=${encodeURIComponent(playerName)}`);
    };

    const groupedPlayers = groupPlayers(players);

    return (
        <Menu>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} style={{ padding: '8px', textAlign: 'center' }}>
                            <Skeleton.Input style={{ width: '80px', marginTop: '8px' }} active size="small" />
                        </div>
                    ))
                ) : (
                    Object.keys(groupedPlayers).map((group) => (
                        <div key={group}>
                            <h4 style={{ textAlign: 'center', fontWeight: 'bold', margin: '16px 0' }}>{group}</h4>
                            {groupedPlayers[group as keyof typeof groupedPlayers].map((player) => (
                                <div
                                    key={player.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px',
                                        borderRight: '1px solid #ccc',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handlePlayerClick(player.fullName)}
                                >
                                    <span>{player.fullName}</span>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Button type="link" onClick={() => navigate('/player')}>
                    View All
                </Button>
            </div>
        </Menu>
    );
};

export default PlayerMenuComponent;

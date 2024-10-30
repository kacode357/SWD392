import React, { useState, useEffect } from 'react';
import { Collapse, Radio, Tag } from 'antd';
import { getShirtByMultipleNamesApi } from '../../util/api';

const { Panel } = Collapse;

interface Shirt {
    id: string;
    clubName: string;
    sessionName: string;
    fullName: string;
    typeShirtName: string;
    urlImg: string;
    price: number;
}

interface ApiResponse {
    pageData: Shirt[];
    totalItems: number;
}

interface ShoppingOptionsProps {
    onClubChange: (club: string) => void;
    onSessionChange: (session: string) => void;
    onPlayerChange: (player: string) => void;
}

const ShoppingOptions: React.FC<ShoppingOptionsProps> = ({
    onClubChange,
    onSessionChange,
    onPlayerChange,
}) => {
    const [filteredClubList, setFilteredClubList] = useState<string[]>([]);
    const [filteredSessionList, setFilteredSessionList] = useState<string[]>([]);
    const [filteredPlayerList, setFilteredPlayerList] = useState<string[]>([]);

    const [selectedClub, setSelectedClub] = useState<string | null>(null);
    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

    const updateFilteredLists = async () => {
        try {
            const data = {
                pageNum: 1,
                pageSize: 1000,
                nameShirt: '',
                nameClub: selectedClub || '',
                nameSeason: selectedSession || '',
                namePlayer: selectedPlayer || '',
                status: 1,
            };

            const result: ApiResponse = await getShirtByMultipleNamesApi(data as any);
            const pageData = result.pageData;

            const relatedClubs = Array.from(new Set(pageData.map((shirt) => shirt.clubName).filter(Boolean)));
            const relatedSessions = Array.from(new Set(pageData.map((shirt) => shirt.sessionName).filter(Boolean)));
            const relatedPlayers = Array.from(new Set(pageData.map((shirt) => shirt.fullName).filter(Boolean)));

            setFilteredClubList(relatedClubs);
            setFilteredSessionList(relatedSessions);
            setFilteredPlayerList(relatedPlayers);
        } catch (error) {
            console.error('Error updating filtered lists', error);
        }
    };

    useEffect(() => {
        updateFilteredLists();
    }, [selectedClub, selectedSession, selectedPlayer]);

    const handleClubChange = (e: any) => {
        const club = e.target.value || '';
        setSelectedClub(club);
        onClubChange(club);
    };

    const handleSessionChange = (e: any) => {
        const session = e.target.value || '';
        setSelectedSession(session);
        onSessionChange(session);
    };

    const handlePlayerChange = (e: any) => {
        const player = e.target.value || '';
        setSelectedPlayer(player);
        onPlayerChange(player);
    };

    return (
        <div style={{ padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <h3>Shopping Options</h3>
            <Collapse defaultActiveKey={['1', '2', '3']}>
                {/* Club Selection */}
                <Panel header="Club" key="1">
                    {selectedClub ? (
                        <Tag
                            closable
                            onClose={() => handleClubChange({ target: { value: '' } })}
                            style={{
                                fontSize: '14px',
                                padding: '5px 10px',
                                maxWidth: '100%',
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                            }}
                        >
                            <strong>Team:</strong> {selectedClub}
                        </Tag>
                    ) : (
                        <Radio.Group onChange={handleClubChange} value={selectedClub} style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            {filteredClubList.map((club, index) => (
                                <Radio key={index} value={club} style={{ display: 'block', marginBottom: '8px' }}>
                                    {club}
                                </Radio>
                            ))}
                        </Radio.Group>
                    )}
                </Panel>

                {/* Session Selection */}
                <Panel header="Session" key="2">
                    {selectedSession ? (
                        <Tag
                            closable
                            onClose={() => handleSessionChange({ target: { value: '' } })}
                            style={{
                                fontSize: '14px',
                                padding: '5px 10px',
                                maxWidth: '100%',
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                            }}
                        >
                            <strong>Session:</strong> {selectedSession}
                        </Tag>
                    ) : (
                        <Radio.Group onChange={handleSessionChange} value={selectedSession} style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            {filteredSessionList.map((session, index) => (
                                <Radio key={index} value={session} style={{ display: 'block', marginBottom: '8px' }}>
                                    {session}
                                </Radio>
                            ))}
                        </Radio.Group>
                    )}
                </Panel>

                {/* Player Selection */}
                <Panel header="Player" key="3">
                    {selectedPlayer ? (
                        <Tag
                            closable
                            onClose={() => handlePlayerChange({ target: { value: '' } })}
                            style={{
                                fontSize: '14px',
                                padding: '5px 10px',
                                maxWidth: '100%',
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                            }}
                        >
                            <strong>Player:</strong> {selectedPlayer}
                        </Tag>
                    ) : (
                        <Radio.Group onChange={handlePlayerChange} value={selectedPlayer} style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            {filteredPlayerList.map((player, index) => (
                                <Radio key={index} value={player} style={{ display: 'block', marginBottom: '8px' }}>
                                    {player}
                                </Radio>
                            ))}
                        </Radio.Group>
                    )}
                </Panel>
            </Collapse>
        </div>
    );
};

export default ShoppingOptions;

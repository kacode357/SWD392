import React, { useState, useEffect } from 'react';
import { Collapse, Radio, Tag } from 'antd';
import { getShirtByMultipleNamesApi } from '../../util/api';

const { Panel } = Collapse;

interface ShirtData {
    clubName: string;
    sessionName: string;
    fullName: string;
    typeShirtName: string;
}

interface ApiResponse {
    pageData: ShirtData[];
}

interface ShoppingOptionsProps {
    onClubChange: (club: string) => void;
    onSessionChange: (session: string) => void;
    onPlayerChange: (player: string) => void;
    onTypeChange: (type: string) => void;
}

const ShoppingOptions: React.FC<ShoppingOptionsProps> = ({
    onClubChange,
    onSessionChange,
    onPlayerChange,
    onTypeChange,
}) => {
    const [clubList, setClubList] = useState<string[]>([]);
    const [sessionList, setSessionList] = useState<string[]>([]);
    const [playerList, setPlayerList] = useState<string[]>([]);
    const [typeList, setTypeList] = useState<string[]>([]);

    const [filteredClubList, setFilteredClubList] = useState<string[]>([]);
    const [filteredSessionList, setFilteredSessionList] = useState<string[]>([]);
    const [filteredPlayerList, setFilteredPlayerList] = useState<string[]>([]);
    const [filteredTypeList, setFilteredTypeList] = useState<string[]>([]);

    const [selectedClub, setSelectedClub] = useState<string | null>(null);
    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // Lấy danh sách ban đầu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    pageNum: 1,
                    pageSize: 1000,
                    nameShirt: '',
                    nameClub: '',
                    nameSeason: '',
                    namePlayer: '',
                    status: 1,
                };

                const result: ApiResponse = await getShirtByMultipleNamesApi(data);
                const pageData = result.pageData;

                const clubs = Array.from(new Set(pageData.map((shirt) => shirt.clubName).filter(Boolean)));
                const sessions = Array.from(new Set(pageData.map((shirt) => shirt.sessionName).filter(Boolean)));
                const players = Array.from(new Set(pageData.map((shirt) => shirt.fullName).filter(Boolean)));
                const types = Array.from(new Set(pageData.map((shirt) => shirt.typeShirtName).filter(Boolean)));

                setClubList(clubs);
                setSessionList(sessions);
                setPlayerList(players);
                setTypeList(types);

                setFilteredClubList(clubs);
                setFilteredSessionList(sessions);
                setFilteredPlayerList(players);
                setFilteredTypeList(types);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    // Cập nhật danh sách đã lọc
    const updateFilteredLists = async () => {
        try {
            const data = {
                pageNum: 1,
                pageSize: 1000,
                nameShirt: '',
                nameClub: selectedClub || '',
                nameSeason: selectedSession || '',
                namePlayer: selectedPlayer || '',
                typeShirt: selectedType || '',
                status: 1,
            };

            const result: ApiResponse = await getShirtByMultipleNamesApi(data);
            const pageData = result.pageData;

            const relatedClubs = Array.from(new Set(pageData.map((shirt) => shirt.clubName).filter(Boolean)));
            const relatedSessions = Array.from(new Set(pageData.map((shirt) => shirt.sessionName).filter(Boolean)));
            const relatedPlayers = Array.from(new Set(pageData.map((shirt) => shirt.fullName).filter(Boolean)));
            const relatedTypes = Array.from(new Set(pageData.map((shirt) => shirt.typeShirtName).filter(Boolean)));

            setFilteredClubList(relatedClubs);
            setFilteredSessionList(relatedSessions);
            setFilteredPlayerList(relatedPlayers);
            setFilteredTypeList(relatedTypes);
        } catch (error) {
            console.error('Error updating filtered lists', error);
        }
    };

    useEffect(() => {
        updateFilteredLists();
    }, [selectedClub, selectedSession, selectedPlayer, selectedType]);

    const handleClubChange = (e: any) => {
        const selectedClub = e.target.value;
        setSelectedClub(selectedClub);
        onClubChange(selectedClub);
    };

    const handleSessionChange = (e: any) => {
        const selectedSession = e.target.value;
        setSelectedSession(selectedSession);
        onSessionChange(selectedSession);
    };

    const handlePlayerChange = (e: any) => {
        const selectedPlayer = e.target.value;
        setSelectedPlayer(selectedPlayer);
        onPlayerChange(selectedPlayer);
    };

    const handleTypeChange = (e: any) => {
        const selectedType = e.target.value;
        setSelectedType(selectedType);
        onTypeChange(selectedType);
    };

    return (
        <div style={{ padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <h3>Shopping Options</h3>
            <Collapse defaultActiveKey={['1', '2', '3', '4']}>

                {/* Club Selection */}
                <Panel header="Club" key="1">
                    {selectedClub ? (
                        <Tag closable onClose={() => setSelectedClub(null)} style={{ fontSize: '14px', padding: '5px 10px' }}>
                            <strong>Team:</strong> {selectedClub}
                        </Tag>
                    ) : (
                        <Radio.Group onChange={handleClubChange} value={selectedClub}>
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
                        <Tag closable onClose={() => setSelectedSession(null)} style={{ fontSize: '14px', padding: '5px 10px' }}>
                            <strong>Session:</strong> {selectedSession}
                        </Tag>
                    ) : (
                        <Radio.Group onChange={handleSessionChange} value={selectedSession}>
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
                        <Tag closable onClose={() => setSelectedPlayer(null)} style={{ fontSize: '14px', padding: '5px 10px' }}>
                            <strong>Player:</strong> {selectedPlayer}
                        </Tag>
                    ) : (
                        <Radio.Group onChange={handlePlayerChange} value={selectedPlayer}>
                            {filteredPlayerList.map((player, index) => (
                                <Radio key={index} value={player} style={{ display: 'block', marginBottom: '8px' }}>
                                    {player}
                                </Radio>
                            ))}
                        </Radio.Group>
                    )}
                </Panel>

                {/* Type Selection */}
                <Panel header="Type" key="4">
                    {selectedType ? (
                        <Tag closable onClose={() => setSelectedType(null)} style={{ fontSize: '14px', padding: '5px 10px' }}>
                            <strong>Type:</strong> {selectedType}
                        </Tag>
                    ) : (
                        <Radio.Group onChange={handleTypeChange} value={selectedType}>
                            {filteredTypeList.map((type, index) => (
                                <Radio key={index} value={type} style={{ display: 'block', marginBottom: '8px' }}>
                                    {type}
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

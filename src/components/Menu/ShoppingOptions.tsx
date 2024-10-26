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
    onTypeChange: (type: string) => void;
}

const ShoppingOptions: React.FC<ShoppingOptionsProps> = ({
    onClubChange,
    onSessionChange,
    onPlayerChange,
    onTypeChange,
}) => {
    const [filteredClubList, setFilteredClubList] = useState<string[]>([]);
    const [filteredSessionList, setFilteredSessionList] = useState<string[]>([]);
    const [filteredPlayerList, setFilteredPlayerList] = useState<string[]>([]);
    const [filteredTypeList, setFilteredTypeList] = useState<string[]>([]);

    const [selectedClub, setSelectedClub] = useState<string | null>(null);
    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // Hàm fetch và cập nhật các danh sách đã lọc
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

            // Tạo danh sách liên quan dựa trên dữ liệu trả về từ API
            const relatedClubs = Array.from(new Set(pageData.map((shirt) => shirt.clubName).filter(Boolean)));
            const relatedSessions = Array.from(new Set(pageData.map((shirt) => shirt.sessionName).filter(Boolean)));
            const relatedPlayers = Array.from(new Set(pageData.map((shirt) => shirt.fullName).filter(Boolean)));
            const relatedTypes = Array.from(new Set(pageData.map((shirt) => shirt.typeShirtName).filter(Boolean)));

            // Cập nhật danh sách lọc dựa trên lựa chọn hiện tại
            setFilteredClubList(relatedClubs);
            setFilteredSessionList(relatedSessions);
            setFilteredPlayerList(relatedPlayers);
            setFilteredTypeList(relatedTypes);
        } catch (error) {
            console.error('Error updating filtered lists', error);
        }
    };

    // Cập nhật danh sách đã lọc khi bất kỳ bộ lọc nào thay đổi
    useEffect(() => {
        updateFilteredLists();
    }, [selectedClub, selectedSession, selectedPlayer, selectedType]);

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

    const handleTypeChange = (e: any) => {
        const type = e.target.value || '';
        setSelectedType(type);
        onTypeChange(type);
    };

    return (
        <div style={{ padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <h3>Shopping Options</h3>
            <Collapse defaultActiveKey={['1', '2', '3', '4']}>

                {/* Club Selection */}
                <Panel header="Club" key="1">
                    {selectedClub ? (
                        <Tag closable onClose={() => handleClubChange({ target: { value: '' } })} style={{ fontSize: '14px', padding: '5px 10px' }}>
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
                        <Tag closable onClose={() => handleSessionChange({ target: { value: '' } })} style={{ fontSize: '14px', padding: '5px 10px' }}>
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
                        <Tag closable onClose={() => handlePlayerChange({ target: { value: '' } })} style={{ fontSize: '14px', padding: '5px 10px' }}>
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
                        <Tag closable onClose={() => handleTypeChange({ target: { value: '' } })} style={{ fontSize: '14px', padding: '5px 10px' }}>
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

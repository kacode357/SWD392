import React, { useState, useEffect } from 'react';
import { Collapse, Radio } from 'antd';
import { getShirtByMultipleNamesApi } from '../../util/api';

const { Panel } = Collapse;

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
    const [selectedClub, setSelectedClub] = useState<string | null>(null);
    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // Lấy dữ liệu từ API
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
                const result = await getShirtByMultipleNamesApi(data);
                const clubs = result.pageData.map((shirt: any) => shirt.clubName).filter((club: any) => typeof club === 'string');
                const sessions = result.pageData.map((shirt: any) => shirt.sessionName).filter((session: any) => typeof session === 'string');
                const players = result.pageData.map((shirt: any) => shirt.fullName).filter((player: any) => typeof player === 'string');
                const types = result.pageData.map((shirt: any) => shirt.typeShirtName).filter((type: any) => typeof type === 'string');

                // Loại bỏ trùng lặp
                const uniqueClubs = Array.from(new Set(clubs)) as string[];
                const uniqueSessions = Array.from(new Set(sessions)) as string[];
                const uniquePlayers = Array.from(new Set(players)) as string[];
                const uniqueTypes = Array.from(new Set(types)) as string[];

                // Cập nhật state
                setClubList(uniqueClubs);
                setSessionList(uniqueSessions);
                setPlayerList(uniquePlayers);
                setTypeList(uniqueTypes);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleClubChange = (e: any) => {
        const selectedClub = e.target.value;
        setSelectedClub(selectedClub);
        onClubChange(selectedClub); // Gọi hàm callback khi câu lạc bộ được chọn
    };

    const handleSessionChange = (e: any) => {
        const selectedSession = e.target.value;
        setSelectedSession(selectedSession);
        onSessionChange(selectedSession); // Gọi hàm callback khi phiên được chọn
    };

    const handlePlayerChange = (e: any) => {
        const selectedPlayer = e.target.value;
        setSelectedPlayer(selectedPlayer);
        onPlayerChange(selectedPlayer); // Gọi hàm callback khi cầu thủ được chọn
    };

    const handleTypeChange = (e: any) => {
        const selectedType = e.target.value;
        setSelectedType(selectedType);
        onTypeChange(selectedType); // Gọi hàm callback khi loại áo được chọn
    };

    return (
        <div style={{ padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <h3>Shopping Options</h3>
            <Collapse defaultActiveKey={['1', '2', '3', '4']}>
                <Panel header="Club" key="1">
                    <Radio.Group onChange={handleClubChange} value={selectedClub}>
                        {clubList.map((club, index) => (
                            <Radio key={index} value={club} style={{ display: 'block', marginBottom: '8px' }}>
                                {club}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Panel>
                <Panel header="Session" key="2">
                    <Radio.Group onChange={handleSessionChange} value={selectedSession}>
                        {sessionList.map((session, index) => (
                            <Radio key={index} value={session} style={{ display: 'block', marginBottom: '8px' }}>
                                {session}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Panel>
                <Panel header="Player" key="3">
                    <Radio.Group onChange={handlePlayerChange} value={selectedPlayer}>
                        {playerList.map((player, index) => (
                            <Radio key={index} value={player} style={{ display: 'block', marginBottom: '8px' }}>
                                {player}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Panel>
                <Panel header="Type" key="4">
                    <Radio.Group onChange={handleTypeChange} value={selectedType}>
                        {typeList.map((type, index) => (
                            <Radio key={index} value={type} style={{ display: 'block', marginBottom: '8px' }}>
                                {type}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    );
};

export default ShoppingOptions;

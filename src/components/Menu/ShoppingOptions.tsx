import React, { useState, useEffect } from 'react';
import { Collapse, Checkbox } from 'antd';
import { getShirtByMultipleNamesApi } from '../../util/api'; // Import hàm API

const { Panel } = Collapse;

const ShoppingOptions: React.FC = () => {
    const [setSelectedFilters] = useState<any>({});
    const [clubList, setClubList] = useState<string[]>([]);
    const [sessionList, setSessionList] = useState<string[]>([]);
    const [playerList, setPlayerList] = useState<string[]>([]);
    const [typeList, setTypeList] = useState<string[]>([]); // Thêm state cho loại áo

    // Lấy dữ liệu từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    pageNum: 1,
                    pageSize: 1000, // Giả sử lấy hết tất cả dữ liệu
                    nameShirt: '',
                    nameClub: '',
                    nameSeason: '',
                    namePlayer: '',
                    status: 1, // Giả sử 1 là trạng thái active
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

    const handleFilterChange = (category: string, value: string, checked: boolean) => {
        setSelectedFilters((prevFilters: { [x: string]: never[]; }) => {
            const categoryFilters = prevFilters[category] || [];
            const updatedCategoryFilters = checked
                ? [...categoryFilters, value]
                : categoryFilters.filter((item: string) => item !== value);
            return {
                ...prevFilters,
                [category]: updatedCategoryFilters,
            };
        });
    };

    return (
        <div style={{ padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <h3>Shopping Options</h3>
            <Collapse defaultActiveKey={['1', '2', '3', '4']}>
                <Panel header="Club" key="1">
                    {clubList.map((club, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            <Checkbox
                                onChange={e => handleFilterChange('club', club, e.target.checked)}
                            >
                                {club}
                            </Checkbox>
                        </div>
                    ))}
                </Panel>
                <Panel header="Session" key="2">
                    {sessionList.map((session, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            <Checkbox
                                onChange={e => handleFilterChange('session', session, e.target.checked)}
                            >
                                {session}
                            </Checkbox>
                        </div>
                    ))}
                </Panel>
                <Panel header="Player" key="3">
                    {playerList.map((player, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            <Checkbox
                                onChange={e => handleFilterChange('player', player, e.target.checked)}
                            >
                                {player}
                            </Checkbox>
                        </div>
                    ))}
                </Panel>
                <Panel header="Type" key="4">
                    {typeList.map((type, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            <Checkbox
                                onChange={e => handleFilterChange('type', type, e.target.checked)}
                            >
                                {type}
                            </Checkbox>
                        </div>
                    ))}
                </Panel>
            </Collapse>
        </div>
    );
};

export default ShoppingOptions;

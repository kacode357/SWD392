import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Row, Col, Pagination } from 'antd';
import { getShirtByMultipleNamesApi } from '../../util/api';
import ShoppingOptions from '../../components/Menu/ShoppingOptions';

const AllShirts: React.FC = () => {
    const [shirts, setShirts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // Các state cho bộ lọc
    const [selectedClub, setSelectedClub] = useState<string>('');
    const [selectedSession, setSelectedSession] = useState<string>('');
    const [selectedPlayer, setSelectedPlayer] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const pageSize = 10;

    // Hàm fetch dữ liệu dựa trên các bộ lọc
    const fetchShirts = async () => {
        try {
            setLoading(true);
            const data = {
                pageNum: currentPage,
                pageSize: pageSize,
                nameShirt: '',
                nameClub: selectedClub,
                nameSeason: selectedSession,
                namePlayer: selectedPlayer,
                typeShirt: selectedType,
                status: 1,
            };
            const result = await getShirtByMultipleNamesApi(data);
            setShirts(result.pageData);
            setTotalItems(result.totalItems);
        } catch (error) {
            console.error('Error fetching shirts', error);
        } finally {
            setLoading(false);
        }
    };

    // Gọi lại fetchShirts mỗi khi một bộ lọc hoặc trang hiện tại thay đổi
    useEffect(() => {
        fetchShirts();
    }, [selectedClub, selectedSession, selectedPlayer, selectedType, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="py-20 px-20">
            <div style={{ display: 'flex' }}>
                <div style={{ width: '250px', marginRight: '20px' }}>
                    <ShoppingOptions
                        onClubChange={setSelectedClub}
                        onSessionChange={setSelectedSession}
                        onPlayerChange={setSelectedPlayer}
                        onTypeChange={setSelectedType}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <h1 className='py-5'>All Shirts</h1>
                    <Row gutter={[16, 16]}>
                        {loading
                            ? Array.from({ length: pageSize }).map((_, index) => (
                                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                    <Card hoverable style={{ width: '100%' }}>
                                        <Skeleton.Image style={{ width: '100%', height: '300px' }} />
                                        <Skeleton active paragraph={{ rows: 2 }} />
                                    </Card>
                                </Col>
                            ))
                            : shirts.map((shirt: any) => (
                                <Col key={shirt.id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        hoverable
                                        cover={<img alt={shirt.name} src={shirt.urlImg} style={{ height: '300px', objectFit: 'cover' }} />}
                                        style={{ width: '100%', position: 'relative' }}
                                    >
                                        <Card.Meta
                                            title={shirt.name}
                                            description={
                                                <>
                                                    <div>Club: {shirt.clubName}</div>
                                                    <div>Player: {shirt.fullName}</div>
                                                    <div>Number: {shirt.number}</div>
                                                    <div>Type: {shirt.typeShirtName}</div>
                                                    <div>Session: {shirt.sessionName}</div>
                                                </>
                                            }
                                        />
                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                                            ${shirt.price}
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Pagination current={currentPage} pageSize={pageSize} total={totalItems} onChange={handlePageChange} showSizeChanger={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllShirts;

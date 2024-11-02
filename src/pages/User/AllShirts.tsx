import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Row, Col, Pagination, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getShirtByMultipleNamesApi } from '../../util/api';
import ShoppingOptions from '../../components/Menu/ShoppingOptions';

const { Search } = Input;

const AllShirts: React.FC = () => {
    const [shirts, setShirts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const [selectedClub, setSelectedClub] = useState<string>('');
    const [selectedSession, setSelectedSession] = useState<string>('');
    const [selectedPlayer, setSelectedPlayer] = useState<string>('');

    const pageSize = 12;

    // Hàm định dạng giá tiền VND
    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const fetchShirts = async () => {
        try {
            setLoading(true);
            const data = {
                pageNum: currentPage,
                pageSize: pageSize,
                nameShirt: searchKeyword,
                nameClub: selectedClub,
                nameSeason: selectedSession,
                namePlayer: selectedPlayer,
                nameTypeShirt: '',
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

    useEffect(() => {
        fetchShirts();
    }, [selectedClub, selectedSession, selectedPlayer, currentPage, searchKeyword]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (value: string) => {
        setSearchKeyword(value);
        setCurrentPage(1);
    };

    return (
        <div className="py-20 ">
            <div style={{ display: 'flex' }}>
                <div style={{ width: '250px', marginRight: '20px' }}>
                    <ShoppingOptions
                        onClubChange={(club) => { setSelectedClub(club); setCurrentPage(1); }}
                        onSessionChange={(session) => { setSelectedSession(session); setCurrentPage(1); }}
                        onPlayerChange={(player) => { setSelectedPlayer(player); setCurrentPage(1); }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 className='py-5 text-gray-800 font-bold text-xl'>All Shirts</h1>
                        <Search className="custom-search"
                            placeholder="Search shirts"
                            allowClear
                            onSearch={handleSearch}
                            enterButton
                            style={{ width: 300, marginBottom: 20 }}
                        />
                    </div>
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
                                        onClick={() => navigate(`/listshirt/shirt-details/${shirt.id}`)}
                                        cover={<img alt={shirt.name} src={shirt.urlImg} style={{ height: '300px', objectFit: 'cover' }} />}
                                        style={{ width: '100%', position: 'relative' }}
                                    >
                                        <Card.Meta
                                            title={shirt.name}
                                            description={
                                                <>

                                                    <p><span className="font-medium text-gray-800">Club: </span>
                                                        <span className="font-medium">{shirt.clubName}</span></p>

                                                    <p><span className="font-medium text-gray-800">Player: </span>
                                                        <span className="font-medium">{shirt.fullName}</span></p>

                                                    <p><span className="font-medium text-gray-800">Number: </span>
                                                        <span className="font-medium">{shirt.number}</span></p>

                                                    <p> <span className="font-medium text-gray-800">Type: </span>
                                                        <span className="font-medium">{shirt.typeShirtName}</span></p>

                                                    <p> <span className="font-medium text-gray-800">Session: </span>
                                                        <span className="font-medium">{shirt.sessionName}</span></p>




                                                    <div className='flex gap-2'>
                                                        <img
                                                            src={shirt.clubLogo}
                                                            alt={shirt.clubName}
                                                            style={{
                                                                width: '30px',
                                                                height: '30px',

                                                            }}
                                                        />
                                                        <span style={{ fontWeight: 'bold' }}>{shirt.clubName}</span>
                                                    </div>

                                                </>
                                            }
                                        />
                                        <div className='pt-5'>
                                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                                                {formatPrice(shirt.price)}
                                            </div>
                                        </div>

                                    </Card>
                                </Col>
                            ))}
                    </Row>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalItems}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllShirts;

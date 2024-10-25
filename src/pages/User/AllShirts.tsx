import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Row, Col, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getShirtByMultipleNamesApi } from '../../util/api'; // Import API
import ShoppingOptions from '../../components/Menu/ShoppingOptions';

const AllShirts: React.FC = () => {
    const navigate = useNavigate();
    const [shirts, setShirts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const pageSize = 10; // Số lượng áo hiển thị trên mỗi trang

    useEffect(() => {
        const fetchShirts = async () => {
            try {
                setLoading(true);
                const data = {
                    pageNum: currentPage,
                    pageSize: pageSize,
                    nameShirt: '',
                    nameClub: '',
                    nameSeason: '',
                    namePlayer: '',
                    status: 1, // Giả sử 1 là trạng thái active
                };
                const result = await getShirtByMultipleNamesApi(data);
                setShirts(result.pageData); // Giả sử `pageData` là mảng chứa kết quả
                setTotalItems(result.totalItems); // Giả sử `totalItems` là tổng số áo
            } catch (error) {
                console.error('Error fetching shirts', error);
            } finally {
                setLoading(false);
            }
        };

        fetchShirts();
    }, [currentPage]);

    const handleCardClick = (id: number) => {
        navigate(`/listshirt/shirt-details/${id}`);
    };

    const formatPrice = (price: number | null | undefined) => {
        return price ? `$${new Intl.NumberFormat().format(price)}` : 'Liên hệ';
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="py-20 px-20">
            <div style={{ display: 'flex' }}>
                {/* Bộ lọc bên trái */}
                <div style={{ width: '250px', marginRight: '20px' }}>
                    <ShoppingOptions />
                </div>
                {/* Danh sách áo */}
                <div style={{ flex: 1 }}>
                    <h1 className='py-5 '>All Shirts</h1>
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
                                        onClick={() => handleCardClick(shirt.id)}
                                        cover={
                                            loading ? (
                                                <Skeleton.Image style={{ width: '100%', height: '300px' }} />
                                            ) : (
                                                <img
                                                    alt={shirt.name}
                                                    src={shirt.urlImg}
                                                    style={{ height: '300px', objectFit: 'cover' }}
                                                />
                                            )
                                        }
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
                                                    <div>Session: {shirt.sessionName}</div> {/* Thêm session */}
                                                </>
                                            }
                                        />
                                        <div
                                            style={{
                                                marginTop: '10px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <img
                                                src={shirt.clubLogo}
                                                alt={shirt.clubName}
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    marginRight: '10px',
                                                }}
                                            />
                                            <span>{shirt.clubName}</span>
                                        </div>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                right: '10px',
                                                backgroundColor: '#fff',
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                fontWeight: 'bold',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            {formatPrice(shirt.price)}
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                    {/* Phân trang */}
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

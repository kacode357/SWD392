import React, { useEffect, useState } from 'react';
import { Button, Menu, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getTypeShirtApi } from '../../util/api'; // Import API

interface TypeShirt {
    id: number;
    name: string;
}

const TypeShirtMenu: React.FC = () => {
    const [typeShirts, setTypeShirts] = useState<TypeShirt[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTypeShirts = async () => {
            try {
                setLoading(true);
                const data = { pageNum: 1, pageSize: 10, keyWord: '', status: true };
                const result = await getTypeShirtApi(data);

                if (result && Array.isArray(result.pageData)) {
                    setTypeShirts(result.pageData);
                } else {
                    setTypeShirts([]);
                }
            } catch (error) {
                console.error('Error fetching type shirts', error);
                setTypeShirts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTypeShirts();
    }, []); // Gọi API khi component được render

    const handleTypeShirtClick = (typeShirtName: string) => {
        navigate(`/listshirt?nametypeshirt=${encodeURIComponent(typeShirtName)}`);
    };
    

    return (
        <Menu>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} style={{ padding: '8px', textAlign: 'center' }}>
                            <Skeleton.Avatar active size="large" shape="circle" />
                            <Skeleton.Input style={{ width: '80px', marginTop: '8px' }} active size="small" />
                        </div>
                    ))
                ) : (
                    typeShirts.map((typeShirt) => (
                        <div
                            key={typeShirt.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px',
                                borderRight: '1px solid #ccc',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleTypeShirtClick(typeShirt.name)}
                        >
                            <span>{typeShirt.name}</span>
                        </div>
                    ))
                )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Button type="link" onClick={() => navigate('/alltypeshirts')}>
                    View All
                </Button>
            </div>
        </Menu>
    );
};

export default TypeShirtMenu;

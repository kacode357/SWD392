import React, { useState, useEffect } from "react";
import { Row, Col, } from "antd";

import { getTypeShirtApi } from "../../util/api"; // Assuming you have the getTypeShirtApi in util/api
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../../layout/Breadcrumb";

// Define the TypeShirt interface
interface TypeShirt {
    id: number;
    name: string;
}

const TypeShirt: React.FC = () => {
    const [typeShirts, setTypeShirts] = useState<TypeShirt[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTypeShirts = async () => {
            try {

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
            }
        };

        fetchTypeShirts();
    }, []);

    const handleTypeClick = (typeName: string) => {
        navigate(`/listshirt?typeshirt=${encodeURIComponent(typeName)}`);
    };

    return (
        <div className="mx-auto px-4 py-20">
            <BreadcrumbComponent />

            {/* Title */}
            <div className="text-center mb-8">
                <img className="w-full h-full py-2" src="https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/1200_265/Mag2-PlayerHeader.jpg" />
                <h1 className="text-xl font-bold text-gray-700">
                    Football Shirt Types
                </h1>
                <p className="text-md text-gray-500 italic">
                    Explore a variety of shirt types for football fans.
                </p>
            </div>

            {/* Grid Layout */}
            <Row gutter={[16, 16]} className="text-center">
                {typeShirts.length === 0 ? (
                    <div className="text-gray-600">No types available.</div>
                ) : (
                    typeShirts.map((typeShirt) => (
                        <Col
                            key={typeShirt.id}
                            xs={12}
                            sm={8}
                            md={6}
                            lg={4}
                            className="flex justify-center items-center"
                        >
                            <div
                                className="text-center space-y-2 cursor-pointer"
                                onClick={() => handleTypeClick(typeShirt.name)}
                            >
                                <p className="text-gray-600 font-semibold">{typeShirt.name}</p>

                            </div>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};

export default TypeShirt;

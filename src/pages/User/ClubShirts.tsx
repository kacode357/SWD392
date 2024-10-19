import React, { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, notification } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { searchClubApi } from "../../util/api"; // Assuming you have the searchClubApi in util/api

const ClubShirts: React.FC = () => {
    const [clubs, setClubs] = useState<any[]>([]);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const data = { pageNum: 1, pageSize: 20, keyWord: "", status: true };
                const response = await searchClubApi(data);
                if (response) {
                    setClubs(response.pageData);
                }
            } catch (error) {
                console.error("Error fetching clubs:", error);
                notification.error({
                    message: "Error",
                    description: "Unable to load club data.",
                });
            }
        };

        fetchClubs();
    }, []);

    return (
        <div className="mx-auto px-4 py-20">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>CLUB</Breadcrumb.Item>
            </Breadcrumb>

            {/* Title */}
            <div className="text-center mb-8">
                <h1 className="text-xl font-bold text-gray-700">
                    OFFICIAL CHAMPIONS LEAGUE SHIRTS
                </h1>
                <p className="text-md text-gray-500 italic">
                    The Greatest Club Tournament in the World
                </p>
                <p className="text-gray-500 mt-2">
                    New Champions League shirts for the top European club teams along with
                    official shirt printing for all the top players. Subside Sports will
                    be keeping the best range of Champions League kits from adidas, Nike,
                    Puma, and New Balance.
                </p>
            </div>

            {/* Grid Layout */}
            <Row gutter={[16, 16]} className="text-center">
                {clubs.map((club) => (
                    <Col
                        key={club.id}
                        xs={12}
                        sm={8}
                        md={6}
                        lg={4}
                        className="flex justify-center items-center"
                    >
                        <div className="text-center space-y-2">
                            <img
                                src={club.clubLogo}
                                alt={club.name}
                                className="w-16 h-16 mx-auto"
                            />
                            <p className="text-gray-600">{club.name}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ClubShirts;

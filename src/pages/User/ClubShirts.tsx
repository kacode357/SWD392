import React, { useState, useEffect } from "react";
import { Row, Col, notification } from "antd";

import { searchClubApi } from "../../util/api"; // Assuming you have the searchClubApi in util/api
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BreadcrumbComponent from "../../layout/Breadcrumb";

// Define the Club interface
interface Club {
    id: number;
    name: string;
    clubLogo: string;
}

const ClubShirts: React.FC = () => {
    const [clubs, setClubs] = useState<Club[]>([]); // Use the Club interface
    const navigate = useNavigate(); // Khai báo useNavigate

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const data = { pageNum: 1, pageSize: 100, keyWord: "", status: true };
                const response = await searchClubApi(data);
                if (response && response.pageData) {
                    setClubs(response.pageData);
                } else {
                    notification.error({
                        message: "Error",
                        description: "No club data found.",
                    });
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

    const handleClubClick = (clubName: string) => {
        navigate(`/listshirt?nameclub=${encodeURIComponent(clubName)}`);
    };

    return (

        <div className="mx-auto px-4 py-20">


            <BreadcrumbComponent />

            {/* Title */}
            <div className="text-center mb-8">
                <img className="w-full h-full py-2" src="https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/1200_265/UK-CL2122-topbanner_1.jpg" />
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
                {clubs.length === 0 ? (
                    <div className="text-gray-600">No clubs available.</div>
                ) : (
                    clubs.map((club) => (
                        <Col
                            key={club.id}
                            xs={12}
                            sm={8}
                            md={6}
                            lg={4}
                            className="flex justify-center items-center"
                        >
                            <div
                                className="text-center space-y-2 cursor-pointer"
                                onClick={() => handleClubClick(club.name)} // Sử dụng club.name thay vì club.id
                            >
                                <img
                                    src={club.clubLogo}
                                    alt={club.name}
                                    className="w-16 h-16 mx-auto"
                                />
                                <p className="text-gray-600 font-semibold">{club.name}</p>
                            </div>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};

export default ClubShirts;

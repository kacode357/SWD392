

import React, { useState, useEffect } from "react";
import { Row, Col, notification } from "antd";

import { getSessionApi } from "../../util/api"; // Assuming you have the getSessionApi in util/api
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../../layout/Breadcrumb";

// Define the Session interface
interface Session {
    id: number;
    name: string;

}

const Session: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = { pageNum: 1, pageSize: 100, keyWord: "", status: true };
                const response = await getSessionApi(data);
                if (response && response.pageData) {
                    setSessions(response.pageData);
                } else {
                    notification.error({
                        message: "Error",
                        description: "No session data found.",
                    });
                }
            } catch (error) {
                console.error("Error fetching sessions:", error);
                notification.error({
                    message: "Error",
                    description: "Unable to load session data.",
                });
            }
        };

        fetchSessions();
    }, []);

    const handleSessionClick = (sessionName: string) => {
        navigate(`/listshirt?namesession=${encodeURIComponent(sessionName)}`);
    };

    return (
        <div className="mx-auto px-4 py-20">
            <BreadcrumbComponent />

            {/* Title */}
            <div className="text-center mb-8">
                <img className="w-full h-full py-2" src="https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/1200_265/Mag2-PlayerHeader.jpg" />
                <h1 className="text-xl font-bold text-gray-700">
                    Football Seasons
                </h1>
                <p className="text-md text-gray-500 italic">
                    Explore different football seasons and their unique kits.
                </p>
            </div>

            {/* Grid Layout */}
            <Row gutter={[16, 16]} className="text-center">
                {sessions.length === 0 ? (
                    <div className="text-gray-600">No sessions available.</div>
                ) : (
                    sessions.map((session) => (
                        <Col
                            key={session.id}
                            xs={12}
                            sm={8}
                            md={6}
                            lg={4}
                            className="flex justify-center items-center"
                        >
                            <div
                                className="text-center space-y-2 cursor-pointer"
                                onClick={() => handleSessionClick(session.name)}
                            >

                                <p className="text-gray-600">{session.name}</p>
                            </div>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};

export default Session;

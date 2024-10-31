import React, { useState, useEffect } from "react";
import { Row, Col, notification } from "antd";

import { getPlayerApi } from "../../util/api"; // Assuming you have the getPlayerApi in util/api
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../../layout/Breadcrumb";

// Define the Player interface
interface Player {
    id: number;
    fullName: string;

}

const PlayerComponent: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = { pageNum: 1, pageSize: 100, keyWord: "", status: true };
                const response = await getPlayerApi(data);
                if (response && response.pageData) {
                    setPlayers(response.pageData);
                } else {
                    notification.error({
                        message: "Error",
                        description: "No player data found.",
                    });
                }
            } catch (error) {
                console.error("Error fetching players:", error);
                notification.error({
                    message: "Error",
                    description: "Unable to load player data.",
                });
            }
        };

        fetchPlayers();
    }, []);

    const handlePlayerClick = (playerName: string) => {
        navigate(`/listshirt?nameplayer=${encodeURIComponent(playerName)}`);
    };

    return (
        <div className="mx-auto px-4 py-20">
            <BreadcrumbComponent />

            {/* Title */}
            <div className="text-center mb-8">
                <img className="w-full h-full py-2" src="https://static1.cdn-subsidesports.com/2/media/resized/catalog/category/1200_265/Mag2-PlayerHeader.jpg" />
                <h1 className="text-xl font-bold text-gray-700">
                    Top Football Players
                </h1>
                <p className="text-md text-gray-500 italic">
                    Featuring your favorite players from top leagues.
                </p>
            </div>

            {/* Grid Layout */}
            <Row gutter={[16, 16]} className="text-center">
                {players.length === 0 ? (
                    <div className="text-gray-600">No players available.</div>
                ) : (
                    players.map((player) => (
                        <Col
                            key={player.id}
                            xs={12}
                            sm={8}
                            md={6}
                            lg={4}
                            className="flex justify-center items-center"
                        >
                            <div
                                className="text-center space-y-2 cursor-pointer"
                                onClick={() => handlePlayerClick(player.fullName)}
                            >

                                <p className="text-gray-600">{player.fullName}</p>
                            </div>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};

export default PlayerComponent;

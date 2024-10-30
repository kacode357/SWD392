import React, { useEffect, useState } from "react";
import { Card, Skeleton, Row, Col } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getShirtByMultipleNamesApi } from "../../util/api";
import SortOptions from "../../components/Menu/SortOptions";

const ListShirtPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Extracting query parameters
  const nameClub = searchParams.get("nameclub");
  const namePlayer = searchParams.get("nameplayer");
  const nameSession = searchParams.get("namesession");
  const nametypeshirt = searchParams.get("nametypeshirt");

  const [shirts, setShirts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to update shirts list based on filters
  const fetchShirts = async () => {
    try {
      setLoading(true);
      const data = {
        pageNum: 1,
        pageSize: 10,
        nameShirt: "",
        nameClub: nameClub || "",
        nameSeason: nameSession || "",
        namePlayer: namePlayer || "",
        nameTypeShirt: nametypeshirt || "",
        status: 1,
      };
      const result = await getShirtByMultipleNamesApi(data);
      setShirts(result.pageData);
    } catch (error) {
      console.error("Error fetching shirts", error);
    } finally {
      setLoading(false);
    }
  };

  // Triggers API call whenever a filter changes
  useEffect(() => {
    fetchShirts();
  }, [nameClub, namePlayer, nameSession, nametypeshirt]);

  // Update URL parameter and navigate with updated filters
  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate({ search: params.toString() });
  };

  // Filter change handlers
  const handleClubChange = (club: string) => updateQueryParam("nameclub", club);
  const handleSessionChange = (session: string) => updateQueryParam("namesession", session);
  const handlePlayerChange = (player: string) => updateQueryParam("nameplayer", player);
  const handleTypeChange = (type: string) => updateQueryParam("nametypeshirt", type);

  // Format price with commas
  const formatPrice = (price: number | null | undefined) => {
    return price ? `$${new Intl.NumberFormat().format(price)}` : "Liên hệ";
  };

  const handleCardClick = (id: number) => {
    navigate(`shirt-details/${id}`);
  };

  return (
    <div className="py-20">
      <div style={{ display: 'flex' }}>
        <div style={{ width: '250px', marginRight: '20px' }}>
          {/* Passing filter handlers to SortOptions */}
          <SortOptions
            onClubChange={handleClubChange}
            onSessionChange={handleSessionChange}
            onPlayerChange={handlePlayerChange}
            onTypeChange={handleTypeChange}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1>
            {nameClub
              ? `Shirts for ${nameClub}`
              : namePlayer
                ? `Shirts for player ${namePlayer}`
                : "No matching shirt found"}
          </h1>

          <Row gutter={[16, 16]}>
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card hoverable style={{ width: "100%" }}>
                    <Skeleton.Image style={{ width: "100%", height: "300px" }} />
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                </Col>
              ))
              : shirts.map((shirt: any) => (
                <Col key={shirt.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      loading ? (
                        <Skeleton.Image
                          style={{ width: "100%", height: "300px" }}
                        />
                      ) : (
                        <img
                          alt={shirt.name}
                          src={shirt.urlImg}
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                      )
                    }
                    style={{ width: "100%", position: "relative" }}
                    onClick={() => handleCardClick(shirt.id)}
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
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={shirt.clubLogo}
                        alt={shirt.clubName}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <span>{shirt.clubName}</span>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        backgroundColor: "#fff",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {formatPrice(shirt.price)}
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ListShirtPage;

import React, { useEffect, useState } from "react";
import { Card, Skeleton, Row, Col, Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getShirtByMultipleNamesApi } from "../../util/api";
import SortOptions from "../../components/Menu/SortOptions";

const ListShirtPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const nameClub = searchParams.get("nameclub");
  const namePlayer = searchParams.get("nameplayer");
  const nameSession = searchParams.get("namesession");
  const nametypeshirt = searchParams.get("nametypeshirt");

  const [shirts, setShirts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });

  const fetchShirts = async (page = 1, pageSize = 12) => {
    try {
      setLoading(true);
      const data = {
        pageNum: page,
        pageSize: pageSize,
        nameShirt: "",
        nameClub: nameClub || "",
        nameSeason: nameSession || "",
        namePlayer: namePlayer || "",
        nameTypeShirt: nametypeshirt || "",
        status: 1,
      };
      const result = await getShirtByMultipleNamesApi(data);
      setShirts(result.pageData);
      setPagination({
        current: result.pageInfo.page,
        pageSize: result.pageInfo.size,
        total: result.pageInfo.totalItem,
      });
    } catch (error) {
      console.error("Error fetching shirts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShirts(pagination.current, pagination.pageSize);
  }, [nameClub, namePlayer, nameSession, nametypeshirt, pagination.current]);

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate({ search: params.toString() });
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  const handleClubChange = (club: string) => updateQueryParam("nameclub", club);
  const handleSessionChange = (session: string) => updateQueryParam("namesession", session);
  const handlePlayerChange = (player: string) => updateQueryParam("nameplayer", player);
  const handleTypeChange = (type: string) => updateQueryParam("nametypeshirt", type);

  const formatPrice = (price: number | null | undefined) => {
    return price ? `${new Intl.NumberFormat().format(price)} ₫` : "Liên hệ";
  };

  const handleCardClick = (id: number) => {
    navigate(`shirt-details/${id}`);
  };

  return (
    <div className="py-20">
      <div style={{ display: "flex" }}>
        <div style={{ width: "250px", marginRight: "20px" }}>
          <SortOptions
            onClubChange={handleClubChange}
            onSessionChange={handleSessionChange}
            onPlayerChange={handlePlayerChange}
            onTypeChange={handleTypeChange}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1 className="py-5 text-gray-800 font-bold text-xl">
            {nameClub
              ? `Shirts for ${nameClub}`
              : namePlayer
                ? `Shirts for player ${namePlayer}`
                : nameSession
                  ? `Shirts for session ${nameSession}`
                  : nametypeshirt
                    ? `Shirts of type ${nametypeshirt}`
                    : "No matching shirt found"}
          </h1>

          <Row gutter={[16, 16]}>
            {loading
              ? Array.from({ length: pagination.pageSize }).map((_, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card hoverable style={{ width: "100%" }}>
                    <Skeleton.Image style={{ width: "100%", height: "300px" }} />
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                </Col>
              ))
              : shirts.map((shirt) => (
                <Col key={shirt.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={shirt.name}
                        src={shirt.urlImg}
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                    }
                    style={{ width: "100%", position: "relative" }}
                    onClick={() => handleCardClick(shirt.id)}
                  >
                    <Card.Meta
                      title={shirt.name}
                      description={
                        <>
                          <p><span className="font-medium text-gray-800">Club: </span>{shirt.clubName}</p>
                          <p><span className="font-medium text-gray-800">Player: </span>{shirt.fullName}</p>
                          <p><span className="font-medium text-gray-800">Number: </span>{shirt.number}</p>
                          <p><span className="font-medium text-gray-800">Type: </span>{shirt.typeShirtName}</p>
                          <p><span className="font-medium text-gray-800">Session: </span>{shirt.sessionName}</p>
                        </>
                      }
                    />
                    <div className="pt-5">
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
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>

          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListShirtPage;

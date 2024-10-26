import React, { useEffect, useState } from "react";
import { Card, Skeleton, Row, Col } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getShirtByMultipleNamesApi } from "../../util/api"; // Import API

const ListShirtPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const searchParams = new URLSearchParams(location.search);
  const nameClub = searchParams.get("nameclub");
  const namePlayer = searchParams.get("nameplayer");
  const nameSession = searchParams.get("namesession");

  const [shirts, setShirts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
          nameTypeShirt: "",
          status: 1, // Giả sử 1 là trạng thái active
        };
        const result = await getShirtByMultipleNamesApi(data);
        setShirts(result.pageData); // Giả sử `pageData` là mảng chứa kết quả
      } catch (error) {
        console.error("Error fetching shirts", error);
      } finally {
        setLoading(false);
      }
    };

    if (nameClub || namePlayer || nameSession) {
      fetchShirts();
    }
  }, [nameClub, namePlayer, nameSession]);

  const handleCardClick = (id: number) => {
    navigate(`shirt-details/${id}`);
  };

  // Hàm định dạng giá với dấu phẩy
  const formatPrice = (price: number | null | undefined) => {
    return price ? `$${new Intl.NumberFormat().format(price)}` : "Liên hệ";
  };

  return (
    <div className="py-20">
      <h1>
        {nameClub
          ? `Shirts for ${nameClub}`
          : namePlayer
            ? `Shirts for player ${namePlayer}`
            : "No club or player selected"}
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
                    <Skeleton.Image style={{ width: "100%", height: "300px" }} />
                  ) : (
                    <img alt={shirt.name} src={shirt.urlImg} style={{ height: "300px", objectFit: "cover" }} />
                  )
                }
                style={{ width: "100%", position: "relative" }} // Thêm position: relative để xử lý giá
                onClick={() => handleCardClick(shirt.id)}
              >
                <Card.Meta
                  title={shirt.name}
                  description={
                    <>
                      <div>Club: {shirt.clubName}</div>
                      <div>Player: {shirt.fullName}</div>
                      <div>Number: {shirt.number}</div>
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
                {/* Hiển thị giá ở góc phải dưới cùng */}
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
  );
};

export default ListShirtPage;

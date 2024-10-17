import React, { useState, useEffect, useContext } from "react";
import { Breadcrumb, Collapse, notification } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getShirtByIdApi, addToCartApi } from "../../util/api";
import { CartContext } from "../../context/cart.context"; 

const { Panel } = Collapse;

const Shirtdetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { updateCart } = useContext(CartContext);
  const [shirtData, setShirtData] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchShirtDetail = async () => {
      try {
        const data = await getShirtByIdApi(Number(id));
        console.log("Shirt Data:", data);
        setShirtData(data);
        setMainImage(data.urlImg);
      } catch (error) {
        console.error("Error fetching shirt data:", error);
      }
    };

    if (id) {
      fetchShirtDetail();
    }
  }, [id]);

  const handleAddToBasket = async () => {
    try {
      const cartData = {
        shirtId: Number(id),
        quantity: quantity,
      };
      const response = await addToCartApi(cartData);
      console.log("Add to cart success:", response);
      notification.success({
        message: "Success",
        description: "Added to basket successfully.",
      });

      updateCart(); // Gọi hàm updateCart sau khi thêm sản phẩm thành công
    } catch (error) {
      console.error("Error adding to cart:", error);
      notification.error({
        message: "Error",
        description: "Failed to add to basket.",
      });
    }
  };

  if (!shirtData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            href: "/",
            title: (
              <>
                <HomeOutlined />
                <span>Home</span>
              </>
            ),
          },
          {
            title: "Detail",
          },
        ]}
      />

      {/* Thông tin chi tiết áo */}
      <div className="flex flex-col lg:flex-row items-start p-4 max-w-6xl mx-auto">
        {/* Ảnh chính */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="relative w-full">
            <img
              src={mainImage}
              alt={shirtData.name}
              className="w-full h-auto object-contain shadow-lg rounded-lg"
            />
          </div>
        </div>

        {/* Thông tin áo */}
        <div className="w-full lg:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{shirtData.name}</h1>
          <p className="text-3xl font-semibold text-green-600">£{shirtData.price}</p>

          {/* Thông tin chung */}
          <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">Thông tin chung</h2>
            <p className="text-lg mt-2">Player: {shirtData.playerName}</p>
            <p className="text-lg">Number: {shirtData.number}</p>
            <p className="text-lg">Type: {shirtData.typeShirtName}</p>
            <p className="text-lg">Status: {shirtData.status === 1 ? "Available" : "Out of stock"}</p>
          </div>

          {/* Kích thước */}
          <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">Kích thước và Số lượng</h2>
            <div className="flex flex-wrap mt-2">
              {shirtData.listSize.map((size: any) => (
                <div key={size.id} className="mr-4 mb-2">
                  <p className="text-lg">
                    {size.sizeName} - <span className="font-semibold">{size.quantity}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Thêm vào giỏ hàng */}
          <div className="flex items-center space-x-4 mt-6">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-2 border rounded shadow-sm"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow-lg w-full"
              onClick={handleAddToBasket}
            >
              Add to Basket
            </button>
          </div>

          {/* Collapse cho thông tin khác */}
          <Collapse defaultActiveKey={["1"]} className="mt-6">
            <Panel header="Câu lạc bộ" key="1">
              <p>Club Name: {shirtData.clubName}</p>
              <p>Established Year: {new Date(shirtData.clubEstablishedYear).getFullYear()}</p>
              <img src={shirtData.clubLogo} alt={shirtData.clubName} className="w-16 h-16 mt-2" />
            </Panel>
            <Panel header="Mô tả" key="2">
              <p>{shirtData.description}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Shirtdetail;

import React, { useState, useEffect, useContext, useCallback } from "react";
import { Collapse } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getShirtByIdApi, addToCartApi } from "../../util/api";
import { CartContext } from "../../context/cart.context";
import BreadcrumbComponent from "../../layout/Breadcrumb";
import GetReview from "./GetReview";

const { Panel } = Collapse;

const Shirtdetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { updateCart } = useContext(CartContext);
  const [shirtData, setShirtData] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const fetchShirtDetail = useCallback(async () => {
    try {
      const data = await getShirtByIdApi(Number(id));
      if (data) {
        setShirtData(data);
        setMainImage(data.urlImg);
      }
    } catch (error) {
      console.error("Error fetching shirt data:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id && !shirtData) {
      fetchShirtDetail();
    }
  }, [id, shirtData, fetchShirtDetail]);

  const handleAddToBasket = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    if (!selectedSizeId) {
      setShowSizeError(true);
      return;
    }

    const cartData = {
      shirtId: Number(id),
      quantity: quantity,
      sizeId: selectedSizeId,
    };

    try {
      const response = await addToCartApi(cartData);
      if (response) {
        setShowSuccessMessage(true);
        updateCart();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [id, quantity, selectedSizeId, updateCart, navigate]);

  if (!shirtData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-20">
      <BreadcrumbComponent />

      <div className="flex flex-col lg:flex-row items-start p-4 max-w-6xl mx-auto gap-4">
        <div className="w-full lg:w-1/2 p-4 mt-2">
          <div className="relative w-full">
            <img
              src={mainImage}
              className="w-full h-full object-contain shadow-lg rounded-lg"
              alt={shirtData.name}
            />
          </div>
          <GetReview shirtId={Number(id)} />
        </div>

        <div className="w-full lg:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{shirtData.name}</h1>
          <p className="text-3xl font-semibold text-green-600">
            {shirtData.price.toLocaleString("vi-VN")}₫
          </p>

          <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">General Information</h2>
            <p className="text-lg mt-2">
              <span className="font-semibold">Shirt Name:</span>{" "}
              <span className="font-medium">{shirtData.name}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Player: </span>
              <span
                className="text-sky-500 cursor-pointer hover:underline transition-all duration-200"
                onClick={() =>
                  navigate(
                    `/listshirt?nameplayer=${encodeURIComponent(
                      shirtData.fullName
                    )}`
                  )
                }
              >
                {shirtData.fullName}
              </span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Number: </span>{" "}
              <span className="font-medium">{shirtData.number}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Type:</span>
              <span className="font-medium"> {shirtData.typeShirtName}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Session:</span>
              <span className="font-medium">{shirtData.sessionName}</span>
            </p>
          
          </div>

          <div
            className={`mt-6 p-4 border rounded-lg shadow-sm bg-white ${
              showSizeError ? "border-red-500" : ""
            }`}
          >
            <h2 className="text-xl font-semibold">Size and Quantity</h2>
            <div className="flex flex-wrap mt-2">
              {shirtData.listSize.map((size: any) => (
                <div
                  key={size.sizeId}
                  onClick={() => {
                    if (selectedSizeId === size.sizeId) {
                      setSelectedSizeId(null);
                    } else {
                      setSelectedSizeId(size.sizeId);
                      setShowSizeError(false);
                    }
                  }}
                  className={`cursor-pointer border rounded-lg p-1 m-2 ${
                    selectedSizeId === size.sizeId
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-green-400"
                  }`}
                  style={{
                    minWidth: "50px",
                    textAlign: "center",
                    height: "30px",
                  }}
                >
                  <p>{size.sizeName}</p>
                </div>
              ))}
            </div>
            {showSizeError && (
              <p className="text-red-500 mt-2">Please select a size</p>
            )}
          </div>

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
              Add to Cart
            </button>
          </div>

          {showSuccessMessage && (
            <p
              className="text-green-500 mt-2 font-bold text-center transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: showSuccessMessage ? 1 : 0,
                transform: showSuccessMessage ? "translateY(0)" : "translateY(-10px)",
              }}
            >
              Added to cart successfully!
            </p>
          )}

          <Collapse defaultActiveKey={["1"]} className="mt-6">
            <Panel header="Club" key="1">
              <div className="flex justify-between">
                <div className="mt-2">
                  <p className="font-semibold">
                    Club Name: <span className="font-normal">{shirtData.clubName}</span>
                  </p>
                  <p className="font-semibold">
                    Club Country: <span className="font-normal">{shirtData.clubCountry}</span>
                  </p>
                  <p className="font-semibold">
                    Established Year:{" "}
                    <span className="font-normal">
                      {new Date(shirtData.clubEstablishedYear).getFullYear()}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col items-center text-center mr-32">
                  <img
                    src={shirtData.clubLogo}
                    alt={shirtData.clubName}
                    className="w-16 h-16 mt-2 items-center text-center"
                  />
                </div>
              </div>
            </Panel>
            <Panel header="Description" key="2">
              <p>{shirtData.description}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Shirtdetail;

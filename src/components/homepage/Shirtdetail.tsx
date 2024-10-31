import React, { useState, useEffect, useContext, useCallback } from "react";
import { Collapse, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getShirtByIdApi, addToCartApi } from "../../util/api";
import { CartContext } from "../../context/cart.context";
import BreadcrumbComponent from "../../layout/Breadcrumb";

const { Panel } = Collapse;

const Shirtdetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { updateCart } = useContext(CartContext);
  const [shirtData, setShirtData] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [showSizeError, setShowSizeError] = useState(false); // For size selection error
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShirtDetail = async () => {
      try {
        const data = await getShirtByIdApi(Number(id));
        if (data) {
          setShirtData(data);
          setMainImage(data.urlImg);
        }
      } catch (error) {
        console.error("Error fetching shirt data:", error);
        notification.error({
          message: "Error",
          description: "Unable to load shirt details.",
        });
      }
    };

    if (id) {
      fetchShirtDetail();
    }
  }, [id]);

  // Function to handle add to basket
  const handleAddToBasket = useCallback(async () => {
    const token = localStorage.getItem("token"); // Check if token exists

    if (!token) {
      notification.warning({
        message: "Please Login",
        description: "You need to login before adding items to the basket.",
      });
      navigate("/login"); // Redirect to login page
      return;
    }
    if (!selectedSizeId) {
      setShowSizeError(true); // Highlight size selection area
      return;
    }

    const cartData = {
      shirtId: Number(id),
      quantity: quantity,
      sizeId: selectedSizeId, // Send sizeId directly
    };

    try {
      const response = await addToCartApi(cartData);
      if (response) {
        notification.success({
          message: "Success",
          description: "Added to basket successfully.",
        });
        updateCart(); // Update cart after success
        console.log("Added to cart:");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      notification.error({
        message: "Error",
        description: "Failed to add to basket.",
      });
    }
  }, [id, quantity, selectedSizeId, updateCart, navigate]);

  // Early return for loading state
  if (!shirtData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-20">
      {/* Breadcrumb */}
      <BreadcrumbComponent />

      {/* Shirt details */}
      <div className="flex flex-col lg:flex-row items-start p-4 max-w-6xl mx-auto gap-4">
        {/* Main Image */}
        <div className="w-full lg:w-1/2 p-4 mt-12 lg:mt-28">
          <div className="relative w-full h-80">
            <img
              src={
                mainImage &&
                  (mainImage.startsWith("http://") ||
                    mainImage.startsWith("https://"))
                  ? mainImage
                  : "https://m.media-amazon.com/images/I/B1HVVUyLAhL._CLa%7C2140%2C2000%7C51TfbGiVkfL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png"
              }
              className="w-full h-full object-contain shadow-lg rounded-lg"
            />
          </div>
        </div>

        {/* Shirt Information */}
        <div className="w-full lg:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{shirtData.name}</h1>
          <p className="text-3xl font-semibold text-green-600">
            {shirtData.price.toLocaleString("vi-VN")}₫ {/* Price in VND */}
          </p>

          {/* General Information */}
          <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">General Information</h2>
            <p className="text-lg mt-2">
              <span className="font-semibold">Shirt Name:</span> {shirtData.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Player:</span>
              <span
                className="cursor-pointer hover:font-bold transition-all duration-200"
                onClick={() => navigate(`/listshirt?nameplayer=${encodeURIComponent(shirtData.fullName)}`)}
              >
                {shirtData.fullName}
              </span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Number:</span> {shirtData.number}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Type:</span> {shirtData.typeShirtName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Session:</span> {shirtData.sessionName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Status:</span> {shirtData.status === 1 ? "Available" : "Out of stock"}
            </p>
          </div>

          {/* Size and Quantity */}
          <div
            className={`mt-6 p-4 border rounded-lg shadow-sm bg-white ${showSizeError ? "border-red-500" : ""
              }`}
          >
            <h2 className="text-xl font-semibold">Size and Quantity</h2>
            <div className="flex flex-wrap mt-2">
              {shirtData.listSize.map((size: any) => (
                <div
                  key={size.sizeId}
                  onClick={() => {
                    if (selectedSizeId === size.sizeId) {
                      setSelectedSizeId(null); // Nếu size đang chọn trùng với size đã chọn thì bỏ chọn
                    } else {
                      setSelectedSizeId(size.sizeId); // Ngược lại, chọn size mới
                      setShowSizeError(false); // Xóa thông báo lỗi nếu có
                    }
                  }}

                  className={`cursor-pointer border rounded-lg p-4 m-2 ${selectedSizeId === size.sizeId
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                    }`}
                  style={{ minWidth: "80px", textAlign: "center" }}
                >
                  <p>{size.sizeName}</p>
                  <p className="text-sm text-gray-600">Quantity : {size.quantity}</p>
                </div>
              ))}
            </div>
            {showSizeError && (
              <p className="text-red-500 mt-2">Please select a size</p>
            )}
          </div>

          {/* Add to Basket */}
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

          {/* Collapse for Additional Info */}
          <Collapse defaultActiveKey={["1"]} className="mt-6">
            <Panel header="Club" key="1">
              <p>Club Name: {shirtData.clubName}</p>
              <p>Club Country: {shirtData.clubCountry}</p>
              <p>
                Established Year:{" "}
                {new Date(shirtData.clubEstablishedYear).getFullYear()}
              </p>
              <img
                src={shirtData.clubLogo}
                alt={shirtData.clubName}
                className="w-16 h-16 mt-2"
              />
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

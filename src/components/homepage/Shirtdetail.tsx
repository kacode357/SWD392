import React, { useState, useEffect, useContext, useCallback } from "react";
import {  Collapse, notification } from "antd";

import { useParams } from "react-router-dom";
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
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null); // State to store sizeId

  // Fetch shirt details when component is mounted
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
    if (!selectedSizeId) {
      notification.error({
        message: "Error",
        description: "Please select a size before adding to basket.",
      });
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
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      notification.error({
        message: "Error",
        description: "Failed to add to basket.",
      });
    }
  }, [id, quantity, selectedSizeId, updateCart]);

  // Early return for loading state
  if (!shirtData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-20">
      {/* Breadcrumb */}
      <BreadcrumbComponent />

      {/* Shirt details */}
      <div className="flex flex-col lg:flex-row items-start p-4 max-w-6xl mx-auto gap-4"> {/* Added gap-4 for spacing */}

        {/* Main Image */}
        <div className="w-full lg:w-1/2 p-4 mt-12 lg:mt-28"> {/* Adjusted margin to align with price */}
          <div className="relative w-full h-80">
            <img
              src={
                mainImage && (mainImage.startsWith('http://') || mainImage.startsWith('https://'))
                  ? mainImage
                  : 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
              }
              className="w-full h-full object-contain shadow-lg rounded-lg"
            />
          </div>
        </div>

        {/* Shirt Information */}
        <div className="w-full lg:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{shirtData.name}</h1>
          <p className="text-3xl font-semibold text-green-600">£{shirtData.price}</p>

          {/* General Information */}
          <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">General Information</h2>
            <p className="text-lg mt-2">Player: {shirtData.playerName}</p>
            <p className="text-lg">Number: {shirtData.number}</p>
            <p className="text-lg">Type: {shirtData.typeShirtName}</p>
            <p className="text-lg">Status: {shirtData.status === 1 ? "Available" : "Out of stock"}</p>
          </div>

          {/* Size Selection */}
          <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">Size and Quantity</h2>
            <div className="flex flex-wrap mt-2">
              <select
                value={selectedSizeId || ""}
                onChange={(e) => setSelectedSizeId(Number(e.target.value))}
                className="p-2 border rounded shadow-sm"
              >
                <option value="" disabled>
                  Select size
                </option>
                {shirtData.listSize.map((size: any) => (
                  <option key={size.sizeId} value={size.sizeId}>
                    {size.sizeName} - {size.quantity} available
                  </option>
                ))}
              </select>
            </div>
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
              Add to Basket
            </button>
          </div>

          {/* Collapse for Additional Info */}
          <Collapse defaultActiveKey={["1"]} className="mt-6">
            <Panel header="Club" key="1">
              <p>Club Name: {shirtData.clubName}</p>
              <p>Established Year: {new Date(shirtData.clubEstablishedYear).getFullYear()}</p>
              <img src={shirtData.clubLogo} alt={shirtData.clubName} className="w-16 h-16 mt-2" />
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

import React, { useState } from 'react';

const Shirtdetail: React.FC = () => {
    const thumbnails = [
        'https://www.soccer777.ru/images/Ajax/Miami-23-24-Joint-edition-black-soccer-jersey-shirt.jpg',
        'https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/d/9dd134b10a45ee5b477a5e0beaf4e16a2d5104c8ffecd2d5e3af02d55a78dfbb.jpeg',
        'https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/d/9dd134b10a45ee5b477a5e0beaf4e16a2d5104c8ffecd2d5e3af02d55a78dfbb.jpeg',
        'https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/d/9dd134b10a45ee5b477a5e0beaf4e16a2d5104c8ffecd2d5e3af02d55a78dfbb.jpeg',
    ];

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    // State để lưu ảnh chính, chỉ số ảnh và kích cỡ đã chọn
    const [mainImage, setMainImage] = useState<string>(thumbnails[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState<string>(''); // Kích cỡ đã chọn

    // Chuyển đến ảnh kế tiếp
    const nextImage = () => {
        const newIndex = (currentImageIndex + 1) % thumbnails.length;
        setCurrentImageIndex(newIndex);
        setMainImage(thumbnails[newIndex]);
    };

    // Quay lại ảnh trước đó
    const prevImage = () => {
        const newIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
        setCurrentImageIndex(newIndex);
        setMainImage(thumbnails[newIndex]);
    };

    return (
        <div className="flex flex-col lg:flex-row items-start p-4 max-w-6xl mx-auto">
            {/* Ảnh chính và điều hướng */}
            <div className="w-full lg:w-1/2 p-4">
                <div className="relative w-full">
                    {/* Nút điều hướng */}
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded p-2 w-12 h-12 flex items-center justify-center"
                        onClick={prevImage}
                    >
                        ←
                    </button>
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded p-2 w-12 h-12 flex items-center justify-center"
                        onClick={nextImage}
                    >
                        →
                    </button>

                    {/* Ảnh chính */}
                    <img
                        src={mainImage}
                        alt="Puma AC Milan Home Shirt 2024-2025"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Ảnh thumbnail */}
                <div className="flex justify-center mt-4 space-x-2">
                    {thumbnails.map((thumbnail, index) => (
                        <img
                            key={index}
                            src={thumbnail}
                            alt={`thumbnail-${index}`}
                            className={`w-20 h-20 cursor-pointer border hover:border-gray-500 ${currentImageIndex === index ? 'border-gray-500' : ''
                                }`}
                            onClick={() => {
                                setMainImage(thumbnail);
                                setCurrentImageIndex(index);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Chi tiết sản phẩm */}
            <div className="w-full lg:w-1/2 p-4">
                <h1 className="text-2xl font-bold">Puma AC Milan Home Shirt 2024-2025</h1>
                <p className="text-3xl font-semibold mt-4">£79.99</p>

                {/* Chọn kích cỡ */}
                <div className="mt-6">
                    <p className="font-semibold">Size</p>
                    <div className="flex space-x-4">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className={`w-12 py-2 border ${selectedSize === size ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'
                                    }`}
                                onClick={() => setSelectedSize(size)} // Cập nhật kích cỡ đã chọn
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chọn cầu thủ và patch */}
                <div className="mt-6">
                    <label className="block font-semibold mb-2">Official Key Player</label>
                    <select className="w-full p-2 border">
                        <option>-- Please Select --</option>
                        <option value="player1">Player 1</option>
                        <option value="player2">Player 2</option>
                    </select>

                    <label className="block font-semibold mt-4 mb-2">Sleeve Patch</label>
                    <select className="w-full p-2 border">
                        <option>-- Please Select --</option>
                        <option value="patch1">Patch 1</option>
                        <option value="patch2">Patch 2</option>
                    </select>
                </div>

                {/* Chọn số lượng và thêm vào giỏ */}
                <div className="flex items-center space-x-4 mt-6">
                    <input
                        type="number"
                        min={1}
                        className="w-16 p-2 border rounded"
                        defaultValue={1}
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                        BUY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shirtdetail;

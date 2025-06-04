import React from "react";
import { useNavigate } from "react-router-dom";

const accessoriesImages = [
  {
    name: "Product 1",
    image: "/accessories/product1.png",
    slug: "product-1",
  },
  {
    name: "Product 2",
    image: "/accessories/product2.png",
    slug: "product-2",
  },
  {
    name: "Product 3",
    image: "/accessories/product3.png",
    slug: "product-3",
  },
  {
    name: "Product 4",
    image: "/accessories/product4.png",
    slug: "product-4",
  },
  {
    name: "Product 5",
    image: "/accessories/product5.png",
    slug: "product-5",
  },
  {
    name: "Product 6",
    image: "/accessories/product6.png",
    slug: "product-6",
  },
];

const PetProducts = () => {
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate("/accessories");
  };

  return (
    <div className="max-w-7xl mx-auto py-16 flex flex-col md:flex-row gap-8 font-poppins">
      {/* Left: Text and Button */}
      <div className="flex-1 flex flex-col items-start">
        <h1 className="text-4xl font-extrabold mb-8">Pet Products</h1>
        <p className="font-poppins font-normal text-[18px] leading-[32px] text-black mb-12 max-w-[464px]">
          All products are designed for ease of use and durable, as well as
          looking good. You can choose your own colours to make your item
          unique.
        </p>
        <button
          onClick={handleSeeMoreClick}
          className="w-40 px-8 py-3 bg-orange-500 text-white rounded-2xl shadow-lg hover:bg-orange-600 transition-colors text-lg font-semibold"
          style={{ boxShadow: "0px 8px 24px 0px #F2994A33" }}
        >
          See more
        </button>
      </div>
      {/* Right: Images Grid */}
      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-6">
        {accessoriesImages.map((product) => (
          <div
            key={product.slug}
            className="w-full h-48 flex items-center justify-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetProducts;

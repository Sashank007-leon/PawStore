import { Icon } from "@iconify/react/dist/iconify.js";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  HiOutlineArrowLongDown,
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import corgiImg from "../../assets/corgi.png";

const HeroSection = () => {
  return (
    <section className="relative bg-[#FFF0D9] py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between min-h-[80vh]">
      {/* Bubble Background Circles */}
      <div className="hidden md:block absolute w-[36px] h-[36px] top-[90px] left-[700px] bg-gradient-to-b from-[#FFD6AO] to-[#FFD59E] rounded-full z-0" />
      <div className="hidden md:block absolute w-[36px] h-[36px] top-[160px] left-[230px] bg-gradient-to-b from-[#FFD6AO] to-[#FFD59E] rounded-full z-0" />
      <div className="hidden md:block absolute w-[36px] h-[36px] top-[390px] left-[740px] bg-gradient-to-b from-[#FFD6AO] to-[#FFD59E] rounded-full z-0" />

      {/* Paw Print Backgrounds */}
      <div className="hidden md:block absolute top-[519px] left-[-0.2px] opacity-50 z-0">
        <Icon
          icon="foundation:paw"
          className="text-[#FFD59E] rotate-[30deg]"
          style={{ width: "226.21px", height: "245.6px" }}
        />
      </div>
      <div className="hidden md:block absolute top-[486.64px] left-[1235px] opacity-50 z-0">
        <Icon
          icon="foundation:paw"
          className="text-[#FFD59E] rotate-[-30deg]"
          style={{ width: "207.27px", height: "225.04px" }}
        />
      </div>

      {/* Left Side - Dog Image */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center z-10 mb-10 md:mb-0">
        <div className="relative w-[300px] h-[300px] md:w-[390px] md:h-[380px] bg-gradient-to-b from-[#FFD6AO] to-[#FFD59E] rounded-full shadow-lg flex items-end justify-center">
          <img
            src={corgiImg}
            alt="Corgi"
            className="w-[260px] md:w-[355px] md:h-[650px] object-contain absolute md:-top-65"
          />
        </div>

        {/* Label and Arrows */}
        <div className="flex items-center gap-16 mt-10">
          <button className="text-3xl text-black hover:text-[#E58608] transition">
            <HiOutlineArrowLongLeft />
          </button>
          <span className="text-center text-base md:text-lg text-black font-medium">
            Corgi (2 months)
          </span>
          <button className="text-3xl text-black hover:text-[#E58608] transition">
            <HiOutlineArrowLongRight />
          </button>
        </div>
      </div>

      {/* Right Side - Text & Button */}
      <div className="w-full md:w-1/2 md:pl-16 text-center md:text-left font-poppins z-10 flex flex-col justify-center items-center md:items-start">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
          Everybody Needs <br className="hidden md:block" />A Friend In Life.
        </h1>
        <p className="font-normal text-[18px] leading-[32px] text-black mb-6 max-w-[386px] mx-auto md:mx-0">
          The Corgi is intelligent, quick and curious. It is a kind, adventurous
          breed which shows a large measure of independence. They are good with
          children and normally kind with strangers.
        </p>
        <button
          className="bg-[#E58608] hover:bg-orange-600 text-white font-medium rounded-[20px] px-6 py-2 transition duration-300 mb-8"
          style={{
            boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.10)",
          }}
        >
          Buy Me
        </button>
        <div className="flex gap-6 mt-auto md:mt-12">
          <a
            href="#"
            className="text-black hover:text-[#E58608] text-xl transition"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            className="text-black hover:text-[#E58608] text-xl transition"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            className="text-black hover:text-[#E58608] text-xl transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Down Arrow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
        <div className="w-[78px] h-[80px] rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-md">
          <HiOutlineArrowLongDown className="text-4xl text-black" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

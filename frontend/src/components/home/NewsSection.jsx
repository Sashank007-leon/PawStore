import React from "react";
import newsDog from "../../assets/news-section.png";

const NewsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto rounded-[56px] bg-[#FFF1DB] flex flex-col md:flex-row items-center px-8 md:px-16 py-12 gap-8 md:gap-0">
        {/* Dog Image */}
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <img
            src={newsDog}
            alt="Dog in pajamas"
            className="w-[280px] md:w-[340px] object-contain"
          />
        </div>
        {/* News Content */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins mb-4 text-center md:text-left">
            Get Pawsome News!
          </h2>
          <p className="text-lg font-poppins mb-6 text-center md:text-left max-w-lg">
            Exclusive training tips, ticks, product deals and more.
          </p>
          <div className="w-full max-w-md flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter email...."
              className="rounded-2xl px-6 py-4 bg-white text-base font-poppins outline-none border-none shadow-sm placeholder:text-gray-400 w-full"
            />
            <button
              className="bg-[#E58608] hover:bg-orange-600 text-white font-medium rounded-2xl px-10 py-3 shadow-lg transition text-lg w-fit  mx-auto md:mx-0"
              style={{
                boxShadow: "0px 6px 18px 0px rgba(229,134,8,0.13)",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
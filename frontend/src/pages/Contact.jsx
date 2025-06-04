import React from "react";
import { Icon } from "@iconify/react";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-poppins min-h-screen">
      <h1 className="text-4xl font-bold text-[#E58608] mb-10 text-center">
        Contact Us
      </h1>

      <div className="bg-white border border-[#FFD4A3] rounded-3xl shadow-xl p-8 md:p-12 space-y-8 max-w-3xl mx-auto">
        <div className="flex items-start gap-5">
          <Icon icon="mdi:email-outline" className="text-3xl text-[#E58608]" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
            <p className="text-gray-700">support@pawstore.com</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <Icon icon="mdi:phone-outline" className="text-3xl text-[#E58608]" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
            <p className="text-gray-700">+977-1234567890</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <Icon icon="mdi:map-marker-outline" className="text-3xl text-[#E58608]" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
            <p className="text-gray-700">Putalisadak, Kathmandu, Nepal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

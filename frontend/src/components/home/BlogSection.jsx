import React from "react";

const blogs = [
  {
    img: "/blogs/blog1.jpg",
    title: "Are you having trouble finding the right dog?",
  },
  {
    img: "/blogs/blog2.jpg",
    title: "Is your dog aggresive towards your kids?",
  },
  {
    img: "/blogs/blog3.jpg",
    title: "Looking for someone to train your dog?",
  },
  {
    img: "/blogs/blog4.jpg",
    title: "Choose the most stylist and durable products for your dog.",
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 font-poppins">Blog Section</h2>
        <p className="text-lg text-center mb-12 text-[#232323] font-poppins">Description of blog</p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-[0_8px_24px_0_rgba(0,0,0,0.10)] w-[300px] flex flex-col items-center pb-6"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-[240px] object-cover rounded-t-3xl"
              />
              <p className="mt-6 text-lg text-center px-4 font-poppins">
                {blog.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
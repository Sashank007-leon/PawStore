import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        setError("Failed to load blogs.");
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-poppins min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-[#E58608]">Blogs</h1>

      {/* Search Input */}
      <input
        type="search"
        aria-label="Search blogs by title"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E58608] transition"
      />

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No blogs found matching your search.</p>
      ) : (
        <ul className="space-y-6">
          {filteredBlogs.map((blog) => (
            <li
              key={blog._id}
              tabIndex={0}
              role="button"
              onClick={() => navigate(`/blog/${blog._id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/blog/${blog._id}`);
                }
              }}
              className="border border-[#FFD4A3] rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer flex gap-6 items-start focus:outline-none focus:ring-2 focus:ring-[#E58608]"
            >
              {/* Blog Image */}
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-32 h-20 object-cover rounded-lg flex-shrink-0 border border-[#FFD4A3]"
                />
              )}

              {/* Title & snippet */}
              <div>
                <h2 className="text-2xl font-semibold text-[#E58608]">{blog.title}</h2>
                <p className="mt-2 text-gray-700 line-clamp-3">{blog.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
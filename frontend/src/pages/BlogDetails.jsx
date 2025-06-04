import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Icon } from "@iconify/react";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError("Failed to load blog.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Loading blog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 font-poppins min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-[#E58608] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#E58608] rounded"
        aria-label="Go back to blogs list"
      >
        <Icon icon="ic:round-arrow-back" className="mr-2 text-lg" />
        Back to Blogs
      </button>

      {/* Blog Content */}
      <article className="bg-white shadow-lg rounded-3xl border border-[#FFD4A3] p-8">
        {/* Blog Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-96 object-cover rounded-2xl mb-8 border border-[#FFD4A3] shadow-sm"
          />
        )}

        <h1 className="text-4xl font-bold text-[#E58608] mb-6">{blog.title}</h1>
        
        {/* Blog content with preserved line breaks */}
        <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line">
          {blog.content}
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
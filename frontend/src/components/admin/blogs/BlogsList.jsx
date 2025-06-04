import React, { useEffect, useState, useContext } from "react";
import BlogForm from "./BlogForm";
import api from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import { Icon } from "@iconify/react";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const token = user?.token || JSON.parse(localStorage.getItem("user"))?.token;

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      alert("Failed to fetch blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = async (blog) => {
    try {
      if (blog._id) {
        await api.put(`/blogs/${blog._id}`, blog, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/blogs", blog, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      alert(
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Failed to save blog"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await api.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch {
      alert("Failed to delete blog");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold font-poppins text-[#E58608]">Blogs</h3>
        <button
          className="flex items-center gap-2 bg-[#E58608] text-white px-5 py-2 rounded-xl font-medium shadow hover:bg-[#cf7605]"
          onClick={() => setEditingBlog({})}
        >
          <Icon icon="ic:round-add" className="text-xl" />
          Add Blog
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-600 text-lg">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-xl font-medium">
          No blogs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-[#FFD4A3] rounded-3xl shadow-lg p-6"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-44 object-cover rounded-xl border border-[#FFD4A3] mb-4"
                />
              )}
              <h4 className="text-xl font-bold text-[#E58608] mb-2">{blog.title}</h4>
              <p className="text-gray-700 mb-4 line-clamp-3">{blog.content}</p>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-[#FFD4A3] text-[#5c3b00] font-medium py-1.5 rounded-xl hover:bg-[#ffc37e]"
                  onClick={() => setEditingBlog(blog)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-200 text-red-700 font-medium py-1.5 rounded-xl hover:bg-red-300"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingBlog !== null && (
        <BlogForm
          initial={editingBlog}
          onSave={handleSave}
          onCancel={() => setEditingBlog(null)}
        />
      )}
    </div>
  );
};

export default BlogsList;
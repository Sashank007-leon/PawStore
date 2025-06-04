import React, { useRef, useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import { Icon } from "@iconify/react";

const blogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.string().required("Image is required"),
});

const BlogForm = ({ initial = {}, onSave, onCancel }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const { user } = useContext(AuthContext);
  const token = user?.token || JSON.parse(localStorage.getItem("user"))?.token;

  const formik = useFormik({
    initialValues: {
      _id: initial._id || undefined,
      title: initial.title || "",
      content: initial.content || "",
      image: initial.image || "",
    },
    validationSchema: blogSchema,
    onSubmit: (values) => onSave(values),
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      formik.setFieldValue("image", res.data.imageUrl);
    } catch (err) {
      alert("Image upload failed");
    }
    setUploading(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(255, 240, 217, 0.85)" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#FFF0D9] rounded-3xl p-10 w-full max-w-lg shadow-2xl flex flex-col gap-6 border-2 border-[#FFD4A3] relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#E58608]"
        >
          <Icon icon="ic:round-close" className="text-2xl" />
        </button>

        <div className="flex flex-col items-center mb-2">
          <Icon icon="fxemoji:dog" className="w-12 h-12 mb-2 text-[#E58608]" />
          <h4 className="text-2xl font-bold text-[#E58608]">
            {initial._id ? "Edit Blog" : "Add New Blog"}
          </h4>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Title</label>
          <input
            name="title"
            placeholder="Blog Title"
            className="rounded-xl px-4 py-2 border border-[#FFD4A3] bg-white focus:ring-2 focus:ring-[#FFD4A3] outline-none"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-xs">{formik.errors.title}</div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            placeholder="Write your blog here..."
            rows={6}
            className="rounded-xl px-4 py-2 border border-[#FFD4A3] bg-white focus:ring-2 focus:ring-[#FFD4A3] outline-none"
            value={formik.values.content}
            onChange={formik.handleChange}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500 text-xs">{formik.errors.content}</div>
          )}
        </div>

        {/* Image upload */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Blog Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="mb-2 file:bg-[#FFD4A3] file:text-[#E58608] file:rounded-xl file:px-4 file:py-2"
          />
          {uploading && (
            <div className="text-sm text-gray-500">Uploading...</div>
          )}
          {formik.values.image && (
            <img
              src={formik.values.image}
              alt="Preview"
              className="w-28 h-28 object-cover rounded-2xl mt-2 border-2 border-[#FFD4A3] mx-auto shadow"
            />
          )}
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-xs">{formik.errors.image}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-2 justify-center">
          <button
            type="submit"
            className="bg-[#E58608] text-white px-8 py-2 rounded-xl font-semibold shadow hover:bg-[#d97706] transition"
            disabled={formik.isSubmitting || uploading}
          >
            {formik.isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-gray-200 px-8 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
            onClick={onCancel}
            disabled={formik.isSubmitting || uploading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;

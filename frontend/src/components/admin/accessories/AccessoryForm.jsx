import React, { useRef, useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import { Icon } from "@iconify/react";
import ACCESSORIES from "../../../data/accessoryOptions";

const accessorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().min(0, "Invalid price").required("Price is required"),
  stock: Yup.number().min(0, "Invalid stock").required("Stock is required"),
  description: Yup.string(),
  image: Yup.string().required("Image is required"),
});

const AccessoryForm = ({ initial = {}, onSave, onCancel }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const { user } = useContext(AuthContext);
  const token = user?.token || JSON.parse(localStorage.getItem("user"))?.token;

  const formik = useFormik({
    initialValues: {
      _id: initial._id || undefined,
      name: initial.name || "",
      category: initial.category || "",
      price: initial.price || "",
      stock: initial.stock || 0,
      description: initial.description || "",
      image: initial.image || "",
    },
    validationSchema: accessorySchema,
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
      className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-hidden"
      style={{ background: "rgba(255, 240, 217, 0.85)" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#FFF0D9] rounded-3xl p-8 w-full max-w-md shadow-2xl flex flex-col gap-6 border-2 border-[#FFD4A3] relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#E58608]"
        >
          <Icon icon="ic:round-close" className="text-2xl" />
        </button>

        <div className="flex flex-col items-center mb-1">
          <Icon icon="ph:bag-fill" className="w-12 h-12 mb-1 text-[#E58608]" />
          <h4 className="text-2xl font-bold text-[#E58608]">
            {initial._id ? "Edit Accessory" : "Add New Accessory"}
          </h4>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Name</label>
          <input
            name="name"
            placeholder="Accessory Name"
            className="rounded-xl px-3 py-2 border border-[#FFD4A3] bg-white focus:ring-2 focus:ring-[#FFD4A3] outline-none text-sm"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-xs">{formik.errors.name}</div>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Category</label>
          <select
            name="category"
            className="rounded-xl px-3 py-2 border border-[#FFD4A3] bg-white focus:ring-2 focus:ring-[#FFD4A3] outline-none text-sm"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option value="">Select a category</option>
            {ACCESSORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 text-xs">{formik.errors.category}</div>
          )}
        </div>

        {/* Price and Stock */}
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <label className="font-medium text-gray-700">Price (Rs)</label>
            <input
              name="price"
              type="number"
              min={0}
              placeholder="Price"
              className="w-full rounded-xl px-3 py-2 border border-[#FFD4A3] bg-white focus:ring-2 focus:ring-[#FFD4A3] outline-none text-sm"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500 text-xs">{formik.errors.price}</div>
            )}
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <label className="font-medium text-gray-700">Stock</label>
            <input
              name="stock"
              type="number"
              min={0}
              placeholder="Stock"
              className="w-full rounded-xl px-3 py-2 border border-[#FFD4A3] bg-white focus:ring-2 focus:ring-[#FFD4A3] outline-none text-sm"
              value={formik.values.stock}
              onChange={formik.handleChange}
            />
            {formik.touched.stock && formik.errors.stock && (
              <div className="text-red-500 text-xs">{formik.errors.stock}</div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Optional description..."
            className="rounded-xl px-3 py-2 border border-[#FFD4A3] bg-white focus:ring-2 focus:ring-[#FFD4A3] outline-none text-sm resize-none"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Accessory Image</label>
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
            <div className="flex justify-center">
              <img
                src={formik.values.image}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-2xl border-2 border-[#FFD4A3] shadow"
              />
            </div>
          )}
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-xs">{formik.errors.image}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-2">
          <button
            type="submit"
            className="bg-[#E58608] text-white px-8 py-2 rounded-xl font-semibold shadow hover:bg-[#d97706] transition text-sm"
            disabled={formik.isSubmitting || uploading}
          >
            {formik.isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-gray-200 px-8 py-2 rounded-xl font-semibold hover:bg-gray-300 transition text-sm"
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

export default AccessoryForm;

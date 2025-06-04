import React, { useRef, useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import { Icon } from "@iconify/react";
import BREEDS from "../../../data/breedOptions"

const dogSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  breed: Yup.string().required("Breed is required"),
  age: Yup.number().min(0, "Invalid age").required("Age is required"),
  price: Yup.number().min(0, "Invalid price").required("Price is required"),
  image: Yup.string().required("Image is required"),
});

const DogForm = ({ initial, onSave, onCancel }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const { user } = useContext(AuthContext);
  const token = user?.token || JSON.parse(localStorage.getItem("user"))?.token;

  const formik = useFormik({
    initialValues: {
      _id: initial._id || undefined,
      name: initial.name || "",
      breed: initial.breed || "",
      age: initial.age || "",
      price: initial.price || "",
      image: initial.image || "",
    },
    validationSchema: dogSchema,
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
        style={{ minWidth: 350 }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#E58608] transition"
        >
          <Icon icon="ic:round-close" className="text-2xl" />
        </button>

        <div className="flex flex-col items-center mb-2">
          <Icon icon="fxemoji:dog" className="w-12 h-12 mb-2 text-[#E58608]" />
          <h4 className="text-2xl font-bold text-[#E58608]">
            {initial._id ? "Edit Dog" : "Add New Dog"}
          </h4>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Name</label>
          <input
            name="name"
            placeholder="Dog's Name"
            className="rounded-xl px-4 py-2 border border-[#FFD4A3] bg-white focus:border-[#E58608] focus:ring-2 focus:ring-[#FFD4A3] outline-none"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-xs">{formik.errors.name}</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Breed</label>
          <select
            name="breed"
            className="rounded-xl px-4 py-2 border border-[#FFD4A3] bg-white focus:border-[#E58608] focus:ring-2 focus:ring-[#FFD4A3] outline-none"
            value={formik.values.breed}
            onChange={formik.handleChange}
          >
            <option value="" disabled>
              Select a breed
            </option>
            {BREEDS.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          {formik.touched.breed && formik.errors.breed && (
            <div className="text-red-500 text-xs">{formik.errors.breed}</div>
          )}
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-medium text-gray-700">Age (months)</label>
            <input
              name="age"
              type="number"
              placeholder="Age"
              className="rounded-xl px-4 py-2 border border-[#FFD4A3] bg-white focus:border-[#E58608] focus:ring-2 focus:ring-[#FFD4A3] outline-none w-full"
              value={formik.values.age}
              onChange={formik.handleChange}
              min={0}
            />
            {formik.touched.age && formik.errors.age && (
              <div className="text-red-500 text-xs">{formik.errors.age}</div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2 mt-2 md:mt-0">
            <label className="font-medium text-gray-700">Price (Rs)</label>
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="rounded-xl px-4 py-2 border border-[#FFD4A3] bg-white focus:border-[#E58608] focus:ring-2 focus:ring-[#FFD4A3] outline-none w-full"
              value={formik.values.price}
              onChange={formik.handleChange}
              min={0}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500 text-xs">{formik.errors.price}</div>
            )}
          </div>
        </div>

        {/* File upload */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Dog Image</label>
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

export default DogForm;

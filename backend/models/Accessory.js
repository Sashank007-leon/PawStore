import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 }, 
    description: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Accessory", accessorySchema);
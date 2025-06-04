import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true }, 
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true }, 
}, { timestamps: true });

export default mongoose.model("Dog", dogSchema);

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import dogRoutes from './routes/dogRoutes.js'
import accessoryRoutes from './routes/accessoryRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/accessories", accessoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
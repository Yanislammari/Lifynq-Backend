import express from "express";
import { jsonMiddleware } from "./config/middlewares";
import connectDB from "./config/database";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL as string;

const app = express();

app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

jsonMiddleware(app);
connectDB();

export default app;

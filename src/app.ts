import express from "express";
import { jsonMiddleware } from "./config/middlewares";

const app = express();

jsonMiddleware(app);

export default app;

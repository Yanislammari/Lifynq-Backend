import express from "express";
import AuthController from "../controllers/auth.controller";

const authRoutes = () => {
  const router = express.Router();
  const authController = new AuthController();
  
  router.post("/request-otp", authController.requestOtp.bind(authController));
  router.post("/verify-otp", authController.verifyOtp.bind(authController));

  return router;
}

export default authRoutes;

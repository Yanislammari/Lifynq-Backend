import express from "express";
import AuthController from "../controllers/auth.controller";

const authRoutes = () => {
  const router = express.Router();
  const authController = new AuthController();
  
  router.get("/me", authController.decodeToken.bind(authController));
  router.post("/request-otp", authController.requestOtp.bind(authController));
  router.post("/verify-otp", authController.verifyOtp.bind(authController));
  router.post("/first-register", authController.firstRegister.bind(authController));
  router.post("/google", authController.authenticateWithGoogle.bind(authController));
  router.post("/complete-after-google", authController.completeGoogleRegistration.bind(authController)); 

  return router;
}

export default authRoutes;

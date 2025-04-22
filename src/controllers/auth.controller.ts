import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async requestOtp(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber } = req.body;
      await this.authService.requestOtp(phoneNumber);
      res.status(200).json("OTP sent successfully.");
    }
    catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AuthController;

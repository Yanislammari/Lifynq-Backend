import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import UserRequestSchema from "../schemas/request/user.request.schema";
import UserRequestDto from "../models/entities/user/dto/user.request.dto";

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

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber, code } = req.body;
      const token = await this.authService.verifyOtp(phoneNumber, code);
      res.status(200).json({ token: token });
    }
    catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async firstRegister(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = UserRequestSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
      }

      const userDto: UserRequestDto = value;
      const token = await this.authService.firstRegister(userDto);
      res.status(200).json({ token: token });
    }
    catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AuthController;

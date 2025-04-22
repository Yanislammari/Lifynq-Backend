import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import UserRepository from "../repositories/user.repository";
import UserResponseDto from "../models/entities/user/dto/user.response.dto";
import UserRequestDto from "../models/entities/user/dto/user.request.dto";
import UserMapper from "../mappers/user.mapper";
import OTP from "../config/otp";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;
const OTP_EXPIRATION = 5 * 60 * 1000;

class AuthService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;
  private readonly twilioService: twilio.Twilio;
  private readonly otpStore: Map<string, OTP>;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
    this.twilioService = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    this.otpStore = new Map();
  }

  async requestOtp(phoneNumber: string): Promise<void> {
    const code = Math.floor(100000 + Math.random() * 999999).toString();
    const expiresAt = Date.now() + OTP_EXPIRATION;

    const otpEntry: OTP = {
      code,
      expiresAt
    };

    this.otpStore.set(phoneNumber, otpEntry);
    await this.twilioService.messages.create({
      body: `Your Lyfinq connection code is : ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  }

  async verifyOtp(phoneNumber: string, code: string): Promise<string> {
    const entry = this.otpStore.get(phoneNumber);

    if (!entry) {
      this.otpStore.delete(phoneNumber);
      throw new Error("Invalid code");
    }

    if (Date.now() > entry.expiresAt) {
      this.otpStore.delete(phoneNumber);
      throw new Error("Expired code");
    }

    if (entry.code !== code) {
      throw new Error("Incorrect code");
    }

    const user = await this.userRepository.getByPhoneNumber(phoneNumber);
    if (!user) {
      throw new Error("Unknown user");
    }

    this.otpStore.delete(phoneNumber);

    return jwt.sign({
      id: user.id,
      phoneNumber: user.phoneNumber,
      role: user.role
    },
    SECRET_KEY,
    { expiresIn: "1h" });
  }

  async firstRegister(userDto: UserRequestDto): Promise<string> {
    const user = this.userMapper.toEntity(userDto);
    const existingUser = await this.userRepository.getByPhoneNumber(user.phoneNumber);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = await this.userRepository.add(user);
    return jwt.sign({
      id: newUser.id,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role
    },
    SECRET_KEY,
    { expiresIn: "1h" });
  }

  async decodeToken(token: string): Promise<UserResponseDto> {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
      const user = await this.userRepository.get(decoded.id);
      return this.userMapper.toResponseDTO(user);
    }
    catch {
      throw new Error("Invalid token");
    }
  }
}

export default AuthService;

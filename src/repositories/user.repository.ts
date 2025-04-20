import mongoose from "mongoose";
import User from "../models/entities/user/user";
import UserDatabaseSchema from "../schemas/database/user.database.schema";
import BaseRepository from "./base.repository";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(mongoose.model<User>("User", UserDatabaseSchema));
  }

  async getByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.model.findOne({ phoneNumber });
    return user ? user.toObject() as User : null;
  }
}

export default UserRepository;

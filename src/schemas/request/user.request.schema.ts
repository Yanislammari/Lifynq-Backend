import joi from "joi";
import Role from "../../models/enums/role";
import UserRequestDto from "../../models/entities/user/dto/user.request.dto";

const UserRequestSchema = joi.object<UserRequestDto>({
  email: joi.string().email().required(),
  phoneNumber: joi.string().pattern(/^[\d+\-()\s]+$/).required(),
  firstName: joi.string().min(2).max(20).required(),
  lastName: joi.string().min(2).max(20).required(),
  age: joi.number().min(0).max(100).required(),
  role: joi.string().valid(...Object.values(Role)).required(),
  profilePictureUrl: joi.string().uri().optional(),
  bio: joi.string().max(100).optional(),
  profession: joi.string().max(30).optional(),
  address: joi.string().max(50).optional(),
  city: joi.string().max(30).optional(),
  country: joi.string().max(20).optional(),
  postalCode: joi.string().max(10).optional(),
});

export default UserRequestSchema;

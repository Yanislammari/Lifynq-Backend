import mongoose from "mongoose";
import Role from "../../models/enums/role";

const UserDatabaseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[\d+\-()\s]+$/
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
    default: 5
  },
  role: {
    type: String,
    enum: Object.values(Role),
    required: true
  },
  profilePictureUrl: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    maxlength: 100,
    required: false
  },
  profession: {
    type: String,
    maxlength: 30,
    required: false
  },
  address: {
    type: String,
    maxlength: 50,
    required: false
  },
  city: {
    type: String,
    maxlength: 30,
    required: false
  },
  country: {
    type: String,
    maxlength: 20,
    required: false
  },
  postalCode: {
    type: String,
    maxlength: 10,
    required: false
  }
});

UserDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserDatabaseSchema.set("toJSON", { 
  virtuals: true 
});

UserDatabaseSchema.set("toObject", { 
  virtuals: true 
});

export default UserDatabaseSchema;

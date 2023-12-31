import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  phone: { type: String },
  role: { type: String, required: true },
  orders: { type: Array }
}, { versionKey: false });

export const User = mongoose.model('users', UserSchema);
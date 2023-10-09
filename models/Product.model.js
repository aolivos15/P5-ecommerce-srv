import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ColorsSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  available_quantity: { type: Number, required: true }
}, { versionKey: false, _id: false });

const SizesSchema = new Schema({
  size: { type: String, required: true },
  available_quantity: { type: String, required: true }
}, { versionKey: false, _id: false });

const ProductSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  available_quantity: { type: Number },
  composition: { type: String },
  ply: { type: String },
  grams: { type: String },
  meters: { type: String },
  weight: { type: String },
  crochet: { type: String },
  needles: { type: String },
  colors: { type: [ ColorsSchema ], default: undefined },
  sizes: { type: [ SizesSchema ], default: undefined }
}, { versionKey: false });

export const Product = mongoose.model('products', ProductSchema);
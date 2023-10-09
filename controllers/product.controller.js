import { Product } from "../models/Product.model.js";

// Get all products from a certain category
export const getAllProductsFromCategory = async (req, res) => {

  const { category } = req.params;

  try {
    const allProductsFromCategory = await Product.find({ category: category });

    res.status(200).json(allProductsFromCategory);

  } catch (error) {
    res.status(404).json({ message: `No se pudo encontrar productos de la categoría ${category}: ${error}`});
  }
}
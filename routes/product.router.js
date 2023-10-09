import express from 'express';
import { getAllProductsFromCategory, getProductByName } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/products/:category', getAllProductsFromCategory);

router.get('/product/:name', getProductByName);

export default router;
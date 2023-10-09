import express from 'express';
import { getAllProductsFromCategory } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/products/:category', getAllProductsFromCategory);

export default router;
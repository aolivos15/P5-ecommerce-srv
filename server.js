import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './config/db.config.js';
import ProductsRouter from './routes/product.router.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// Route middlewares
app.use('/api/v1', ProductsRouter);

db(); // Connect to database

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
})
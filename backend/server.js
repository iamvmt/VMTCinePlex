import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'

const app = express();
const port = 3000;

await connectDB();

//MiddleWare

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())



//API Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
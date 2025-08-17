import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();    

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
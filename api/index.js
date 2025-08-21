import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';

dotenv.config();    

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  console.error(err);
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    errorStatus,
    errorMessage,
  });
})
import express from 'express';
import { test } from '../controllers/user.controller.js';

const userRouter = express.Router();

// Define user routes here
userRouter.get('/test',test);

export default userRouter;
import { Router } from 'express';
import { User } from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

export default usersRouter;

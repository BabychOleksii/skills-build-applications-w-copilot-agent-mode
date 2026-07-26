import { Router } from 'express';

import { Workout } from '../models/Workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ difficulty: 1, name: 1 }));
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;

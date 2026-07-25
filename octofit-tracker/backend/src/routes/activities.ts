import { Router } from 'express';

import { Activity } from '../models/Activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .sort({ activityDate: -1 });
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;

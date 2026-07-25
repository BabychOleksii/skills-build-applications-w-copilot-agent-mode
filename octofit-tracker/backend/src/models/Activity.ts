import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      required: true,
      enum: ['running', 'walking', 'cycling', 'swimming', 'strength'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKilometers: { type: Number, min: 0, default: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);

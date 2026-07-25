import { Schema, model } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, min: 1 },
    repetitions: { type: Number, min: 1 },
    durationMinutes: { type: Number, min: 1 },
  },
  { _id: false },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [exerciseSchema], required: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);

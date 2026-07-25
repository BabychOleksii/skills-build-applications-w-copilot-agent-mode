import mongoose from 'mongoose';

import { connectDatabase } from '../config/database';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();

    // Clear dependent collections first so this script can be safely rerun.
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', age: 16 },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', age: 17 },
      { name: 'Priya Shah', email: 'priya.shah@example.com', age: 15 },
      { name: 'Mateo Garcia', email: 'mateo.garcia@example.com', age: 16 },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Outdoor runners and hikers building endurance together.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Core Crew',
        description: 'Strength and mobility enthusiasts focused on consistency.',
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'running',
        durationMinutes: 42,
        distanceKilometers: 8.1,
        caloriesBurned: 560,
        activityDate: new Date('2026-07-20T10:00:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 50,
        caloriesBurned: 390,
        activityDate: new Date('2026-07-21T18:30:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[0]._id,
        type: 'cycling',
        durationMinutes: 65,
        distanceKilometers: 24.7,
        caloriesBurned: 710,
        activityDate: new Date('2026-07-22T12:15:00Z'),
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'swimming',
        durationMinutes: 38,
        distanceKilometers: 1.6,
        caloriesBurned: 430,
        activityDate: new Date('2026-07-23T09:45:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[2]._id, team: teams[0]._id, totalPoints: 1280, rank: 1 },
      { user: users[0]._id, team: teams[0]._id, totalPoints: 1140, rank: 2 },
      { user: users[3]._id, team: teams[1]._id, totalPoints: 980, rank: 3 },
      { user: users[1]._id, team: teams[1]._id, totalPoints: 875, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        name: 'Beginner Full-Body Circuit',
        description: 'A balanced introduction to strength and cardiovascular fitness.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Bodyweight squats', sets: 3, repetitions: 12 },
          { name: 'Incline push-ups', sets: 3, repetitions: 10 },
          { name: 'Brisk walking', durationMinutes: 10 },
        ],
      },
      {
        name: 'Tempo Run Builder',
        description: 'An interval session designed to improve sustainable running pace.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: [
          { name: 'Easy warm-up run', durationMinutes: 10 },
          { name: 'Tempo intervals', sets: 4, durationMinutes: 5 },
          { name: 'Recovery walk', durationMinutes: 5 },
        ],
      },
      {
        name: 'Advanced Strength Ladder',
        description: 'A demanding compound-movement workout for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 60,
        exercises: [
          { name: 'Deadlifts', sets: 5, repetitions: 5 },
          { name: 'Pull-ups', sets: 4, repetitions: 8 },
          { name: 'Walking lunges', sets: 4, repetitions: 12 },
        ],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();

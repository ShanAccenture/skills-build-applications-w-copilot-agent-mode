import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  totalCalories: {
    type: Number,
    default: 0,
  },
  totalDistance: {
    type: Number,
    default: 0,
  },
  totalDuration: {
    type: Number,
    default: 0,
  },
  activitiesCount: {
    type: Number,
    default: 0,
  },
  rank: Number,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

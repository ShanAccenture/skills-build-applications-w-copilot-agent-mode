import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['running', 'cycling', 'swimming', 'walking', 'gym', 'other'],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  distance: Number,
  calories: Number,
  notes: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Activity = mongoose.model('Activity', activitySchema);

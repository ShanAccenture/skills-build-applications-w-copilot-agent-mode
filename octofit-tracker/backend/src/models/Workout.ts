import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['cardio', 'strength', 'flexibility', 'endurance', 'other'],
    required: true,
  },
  duration: Number,
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard'],
  },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      duration: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Workout = mongoose.model('Workout', workoutSchema);

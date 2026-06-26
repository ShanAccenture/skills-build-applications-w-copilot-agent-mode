import express, { Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = express.Router();

// POST /api/workouts - Create workout plan
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, description, type, duration, difficulty, exercises } = req.body;
    
    const workout = new Workout({
      userId,
      name,
      description,
      type,
      duration,
      difficulty,
      exercises
    });
    
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// GET /api/workouts - Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { type, difficulty } = req.query;
    
    let filter: Record<string, string> = {};
    if (type) filter.type = type as string;
    if (difficulty) filter.difficulty = difficulty as string;
    
    const workouts = await Workout.find(filter).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET /api/workouts/:id - Get workout details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, type, duration, difficulty, exercises } = req.body;
    
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { name, description, type, duration, difficulty, exercises },
      { new: true }
    );
    
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// GET /api/workouts/user/:userId - Get user's workouts
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workouts' });
  }
});

export default router;

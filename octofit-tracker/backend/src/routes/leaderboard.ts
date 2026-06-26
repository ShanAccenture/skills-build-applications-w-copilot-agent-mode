import express, { Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = express.Router();

// GET /api/leaderboard - Get global leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId', 'name email profile')
      .sort({ rank: 1 })
      .limit(100);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/:userId - Get user's leaderboard rank
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findOne({ userId: req.params.userId })
      .populate('userId', 'name email profile');
    
    if (!entry) {
      return res.status(404).json({ error: 'User not found on leaderboard' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// POST /api/leaderboard - Create or update leaderboard entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, totalCalories, totalDistance, totalDuration, activitiesCount } = req.body;
    
    let entry = await Leaderboard.findOne({ userId });
    
    if (entry) {
      entry.totalCalories = totalCalories;
      entry.totalDistance = totalDistance;
      entry.totalDuration = totalDuration;
      entry.activitiesCount = activitiesCount;
      entry.updatedAt = new Date();
    } else {
      entry = new Leaderboard({
        userId,
        totalCalories,
        totalDistance,
        totalDuration,
        activitiesCount
      });
    }
    
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leaderboard' });
  }
});

// PUT /api/leaderboard/:userId - Update leaderboard entry
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const { totalCalories, totalDistance, totalDuration, activitiesCount, rank } = req.body;
    
    const entry = await Leaderboard.findOneAndUpdate(
      { userId: req.params.userId },
      { totalCalories, totalDistance, totalDuration, activitiesCount, rank, updatedAt: new Date() },
      { new: true }
    ).populate('userId', 'name email profile');
    
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leaderboard entry' });
  }
});

export default router;

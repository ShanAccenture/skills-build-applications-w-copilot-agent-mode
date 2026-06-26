import express, { Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = express.Router();

// POST /api/activities - Log new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories, notes } = req.body;
    
    const activity = new Activity({
      userId,
      type,
      duration,
      distance,
      calories,
      notes,
      date: new Date()
    });
    
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// GET /api/activities - Get user activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    let activities;
    if (userId) {
      activities = await Activity.find({ userId }).sort({ date: -1 });
    } else {
      activities = await Activity.find().sort({ date: -1 });
    }
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities/:id - Get activity details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// PUT /api/activities/:id - Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { type, duration, distance, calories, notes } = req.body;
    
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { type, duration, distance, calories, notes },
      { new: true }
    );
    
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;

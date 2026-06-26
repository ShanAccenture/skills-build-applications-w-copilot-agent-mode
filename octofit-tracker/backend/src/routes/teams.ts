import express, { Request, Response } from 'express';
import { Team } from '../models/Team.js';

const router = express.Router();

// POST /api/teams - Create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, leader } = req.body;
    
    const team = new Team({
      name,
      description,
      leader,
      members: [leader]
    });
    
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// GET /api/teams - Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'name email')
      .populate('members', 'name email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET /api/teams/:id - Get team details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'name email')
      .populate('members', 'name email');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// PUT /api/teams/:id - Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    ).populate('leader', 'name email').populate('members', 'name email');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

// POST /api/teams/:id/members - Add member to team
router.post('/:id/members', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('leader', 'name email').populate('members', 'name email');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member' });
  }
});

// DELETE /api/teams/:id/members/:userId - Remove member from team
router.delete('/:id/members/:userId', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.params.userId } },
      { new: true }
    ).populate('leader', 'name email').populate('members', 'name email');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

export default router;

import express, { Request, Response } from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// GET /api/users/:id - Get user profile
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users/register - User registration
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();
    
    res.status(201).json({ 
      id: user._id, 
      name: user.name, 
      email: user.email 
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/users/login - User login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
      id: user._id, 
      name: user.name, 
      email: user.email 
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// PUT /api/users/:id - Update user profile
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, email, profile } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, profile },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

export default router;

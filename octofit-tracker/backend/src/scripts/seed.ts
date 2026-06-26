/**
 * Seed the octofit_db database with test data
 * 
 * Usage: npm run seed
 * 
 * This script populates the octofit_db MongoDB database with realistic
 * sample data for users, activities, teams, workouts, and leaderboard entries.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { Team } from '../models/Team.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Sample data
const sampleUsers = [
  {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    profile: {
      avatar: 'https://api.example.com/avatars/alex.jpg',
      bio: 'Fitness enthusiast and marathon runner'
    }
  },
  {
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    password: 'password123',
    profile: {
      avatar: 'https://api.example.com/avatars/jordan.jpg',
      bio: 'CrossFit lover and gym regular'
    }
  },
  {
    name: 'Taylor Chen',
    email: 'taylor@example.com',
    password: 'password123',
    profile: {
      avatar: 'https://api.example.com/avatars/taylor.jpg',
      bio: 'Yoga instructor and wellness coach'
    }
  },
  {
    name: 'Morgan Lee',
    email: 'morgan@example.com',
    password: 'password123',
    profile: {
      avatar: 'https://api.example.com/avatars/morgan.jpg',
      bio: 'Cyclist and outdoor adventure seeker'
    }
  },
  {
    name: 'Casey Wilson',
    email: 'casey@example.com',
    password: 'password123',
    profile: {
      avatar: 'https://api.example.com/avatars/casey.jpg',
      bio: 'Swimming champion and fitness mentor'
    }
  }
];

const getActivityTypes = () => ['running', 'cycling', 'swimming', 'walking', 'gym', 'other'];

const generateActivities = (userIds: string[]) => {
  const activities = [];
  const activityTypes = getActivityTypes();
  
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];
    const baseDate = new Date();
    
    for (let j = 0; j < 10; j++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - (Math.random() * 30 | 0));
      
      const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const duration = 30 + Math.random() * 90;
      const distance = activityType === 'running' ? 5 + Math.random() * 10 : 10 + Math.random() * 30;
      const calories = 200 + Math.random() * 600;
      
      activities.push({
        userId,
        type: activityType,
        duration: Math.round(duration),
        distance: Math.round(distance * 10) / 10,
        calories: Math.round(calories),
        notes: `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} session`,
        date
      });
    }
  }
  
  return activities;
};

const generateWorkouts = (userIds: string[]) => {
  const workouts = [
    {
      userId: userIds[0],
      name: 'Morning Run',
      description: '5K morning jog for cardio',
      type: 'cardio',
      duration: 30,
      difficulty: 'moderate',
      exercises: [
        { name: 'Warm-up jog', duration: 5 },
        { name: '5K run', duration: 25 }
      ]
    },
    {
      userId: userIds[1],
      name: 'Upper Body Strength',
      description: 'Bench press and shoulder exercises',
      type: 'strength',
      duration: 45,
      difficulty: 'hard',
      exercises: [
        { name: 'Bench press', sets: 4, reps: 8 },
        { name: 'Shoulder press', sets: 3, reps: 10 },
        { name: 'Bicep curls', sets: 3, reps: 12 }
      ]
    },
    {
      userId: userIds[2],
      name: 'Yoga Flow',
      description: 'Relaxing yoga session',
      type: 'flexibility',
      duration: 60,
      difficulty: 'easy',
      exercises: [
        { name: 'Sun salutation', duration: 10 },
        { name: 'Standing poses', duration: 20 },
        { name: 'Stretching', duration: 30 }
      ]
    },
    {
      userId: userIds[3],
      name: 'Cycling Route',
      description: 'Mountain bike trail ride',
      type: 'endurance',
      duration: 90,
      difficulty: 'moderate',
      exercises: [
        { name: 'Trail cycling', duration: 90 }
      ]
    },
    {
      userId: userIds[4],
      name: 'Swimmer\'s Endurance',
      description: 'Pool swimming workout',
      type: 'endurance',
      duration: 50,
      difficulty: 'hard',
      exercises: [
        { name: 'Warm-up lap', duration: 5 },
        { name: 'Distance swimming', duration: 40 },
        { name: 'Cool-down lap', duration: 5 }
      ]
    }
  ];
  
  return workouts;
};

const generateLeaderboard = (userIds: string[], activities: any[]) => {
  const leaderboard: any[] = [];
  
  userIds.forEach((userId, index) => {
    const userActivities = activities.filter(a => a.userId === userId);
    const totalCalories = userActivities.reduce((sum, a) => sum + (a.calories || 0), 0);
    const totalDistance = userActivities.reduce((sum, a) => sum + (a.distance || 0), 0);
    const totalDuration = userActivities.reduce((sum, a) => sum + (a.duration || 0), 0);
    
    leaderboard.push({
      userId,
      totalCalories: Math.round(totalCalories),
      totalDistance: Math.round(totalDistance * 10) / 10,
      totalDuration: Math.round(totalDuration),
      activitiesCount: userActivities.length,
      rank: index + 1
    });
  });
  
  return leaderboard;
};

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    console.log(`📡 Connecting to MongoDB: ${MONGODB_URI}`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing collections...');
    await User.deleteMany({});
    await Activity.deleteMany({});
    await Team.deleteMany({});
    await Workout.deleteMany({});
    await Leaderboard.deleteMany({});
    console.log('✅ Cleared all collections');

    // Seed Users
    console.log('\n👥 Seeding users...');
    const users = await User.insertMany(sampleUsers);
    const userIds = users.map(u => u._id.toString());
    console.log(`✅ Created ${users.length} users`);
    users.forEach(user => {
      console.log(`   • ${user.name} (${user.email})`);
    });

    // Seed Activities
    console.log('\n🏃 Seeding activities...');
    const activities = generateActivities(userIds);
    await Activity.insertMany(activities);
    console.log(`✅ Created ${activities.length} activities`);
    console.log(`   • Average ${Math.round(activities.length / users.length)} activities per user`);

    // Seed Teams
    console.log('\n👫 Seeding teams...');
    const teams = [
      {
        name: 'Morning Runners',
        description: 'Early morning running group',
        leader: userIds[0],
        members: [userIds[0], userIds[2]]
      },
      {
        name: 'Gym Warriors',
        description: 'Strength training and bodybuilding',
        leader: userIds[1],
        members: [userIds[1], userIds[3]]
      },
      {
        name: 'Wellness Circle',
        description: 'Yoga and flexibility training',
        leader: userIds[2],
        members: [userIds[2], userIds[4]]
      }
    ];
    
    const createdTeams = await Team.insertMany(teams);
    console.log(`✅ Created ${createdTeams.length} teams`);
    createdTeams.forEach(team => {
      console.log(`   • ${team.name} (${team.members.length} members)`);
    });

    // Seed Workouts
    console.log('\n💪 Seeding workouts...');
    const workouts = generateWorkouts(userIds);
    const createdWorkouts = await Workout.insertMany(workouts);
    console.log(`✅ Created ${createdWorkouts.length} workouts`);
    createdWorkouts.forEach(workout => {
      console.log(`   • ${workout.name} (${workout.type})`);
    });

    // Seed Leaderboard
    console.log('\n🏆 Seeding leaderboard...');
    const leaderboard = generateLeaderboard(userIds, activities);
    const createdLeaderboard = await Leaderboard.insertMany(leaderboard);
    console.log(`✅ Created ${createdLeaderboard.length} leaderboard entries`);
    createdLeaderboard.sort((a, b) => a.rank - b.rank).forEach(entry => {
      const user = users.find(u => u._id.toString() === entry.userId.toString());
      console.log(`   • #${entry.rank} ${user?.name} - ${entry.totalCalories} cal, ${entry.activitiesCount} activities`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Activities: ${activities.length}`);
    console.log(`   Teams: ${createdTeams.length}`);
    console.log(`   Workouts: ${createdWorkouts.length}`);
    console.log(`   Leaderboard entries: ${createdLeaderboard.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

seedDatabase();

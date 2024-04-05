import express from 'express';
import User from '../models/User.js';
import * as dbfun from './dbfun.js';
import fs from 'fs';
import path from 'path';

const signupRouter = express.Router();

// Connect to MongoDB before API route usage
dbfun.dbconnect();

// Define path to UserData.json file
const userDataFilePath = path.join(process.cwd(), 'UserData.json');

signupRouter.post('/api/signup', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dob,
      gender,
      address,
      country,
    } = req.body;

    // Check for existing user with the same email in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dob,
      gender,
      address,
      country,
    });

    // Save the user to MongoDB
    const savedUser = await newUser.save();

    // Read existing data from UserData.json
    const existingData = fs.existsSync(userDataFilePath)
      ? JSON.parse(fs.readFileSync(userDataFilePath, 'utf-8'))
      : [];

    // Append new user data to existing data
    existingData.push(savedUser);

    // Write the updated data back to UserData.json
    fs.writeFileSync(userDataFilePath, JSON.stringify(existingData));

    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default signupRouter;

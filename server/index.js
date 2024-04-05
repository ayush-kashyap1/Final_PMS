import express from 'express';
import cors from 'cors';
import signupRouter from "./api/signup.js"; // Enable CORS for frontend requests (adjust as needed)


const app = express();

// Enable CORS (adjust origins based on your frontend deployment)
app.use(cors({ origin: 'http://localhost:3001' })); // Replace with your frontend origin

// Parse incoming request body data
app.use(express.json());

// Use the signup API router
app.use('/api', signupRouter);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 6112;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Task = require('./models/Task');
const Holiday = require('./models/Holiday');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// --- TASKS ---
app.get('/api/tasks', async (req, res) => {
  const { date } = req.query;
  const tasks = await Task.find({ date });
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- HOLIDAYS ---
app.get('/api/holidays', async (req, res) => {
  const holidays = await Holiday.find();
  res.json(holidays);
});

app.post('/api/holidays', async (req, res) => {
  const holiday = new Holiday(req.body);
  await holiday.save();
  res.json(holiday);
});

app.delete('/api/holidays/:id', async (req, res) => {
  await Holiday.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

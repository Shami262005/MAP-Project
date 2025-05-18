// backend/server.js

const express      = require('express');
const cors         = require('cors');
const path         = require('path');
const { json, urlencoded } = require('body-parser');
const http         = require('http');
const socketIo     = require('socket.io');

require('dotenv').config();

const authRoutes         = require('./routes/authRoutes');
const otpRoutes          = require('./routes/otpRoutes');
const userRoutes         = require('./routes/userRoutes');
const teamRoutes         = require('./routes/teamRoutes');
const eventRoutes        = require('./routes/eventRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

const { authenticateToken } = require('./middleware/authMiddleware');

const app    = express();
const server = http.createServer(app);
const io     = socketIo(server, { cors: { origin: '*' } });

// ─── Middleware ─────────────────────────────────────────────────────────────

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Serve general uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve announcement images specifically
app.use(
  '/uploads/announcementspic',
  express.static(path.join(__dirname, 'uploads/announcementspic'))
);

// ─── WebSocket setup ────────────────────────────────────────────────────────

io.on('connection', socket => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});
app.set('io', io);

// ─── Routes ────────────────────────────────────────────────────────────────

app.use('/auth',         authRoutes);
app.use('/otp',          otpRoutes);
app.use('/users',        authenticateToken, userRoutes);
app.use('/teams',        authenticateToken, teamRoutes);
app.use('/events',       authenticateToken, eventRoutes);
app.use('/announcements', authenticateToken, announcementRoutes);

// ─── Error handling ────────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// ─── Start server ──────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

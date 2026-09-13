const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cookieParser());
// Allowed frontend origins
const allowedOrigins = [
  "https://exxpense-trracker.netlify.app",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Blocked by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);


app.get('/', (req, res)=>{
    res.json({message: 'Server Running'})
})

module.exports = app;

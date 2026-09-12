const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}));


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.get('/', (req, res)=>{
    res.json({message: 'Server Running'})
})

module.exports = app;

const express = require('express');

const app = express();

app.use(express.json())

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res)=>{
    res.json({message: 'Server Running'})
})

module.exports = app;

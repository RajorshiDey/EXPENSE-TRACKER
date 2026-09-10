require('dotenv').config();
const app = require('./app.js');

const connectDB = require('./config/db.js');

app.listen(process.env.PORT,async()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    await connectDB();
})
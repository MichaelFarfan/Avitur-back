const express = require('express');
const cors = require('cors');
const config = require('./config')

//Create Server
const app = express();

//Connect DB
config.connectDB();

//Config
app.use(cors());
app.use(express.json())

//routes
app.use('/api/hotel', require('./routes/hotel.routes'))

//Init Server
app.listen(4000, () => {
    console.log('Server running...')
})
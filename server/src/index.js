const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose');
const morgan = require('morgan')
const middleswares = require('./middlewares');
const logs = require('./api/logs')
require('dotenv').config();


const app = express()

async function db() {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}

db()

app.use(morgan('common'));

// Hides Headers
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "yo",
    });
});

app.use('/api/logs', logs);

// Not found Middleware
app.use(middleswares.notFound);
// Error handler Middleware
app.use(middleswares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})

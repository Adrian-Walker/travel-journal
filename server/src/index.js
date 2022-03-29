const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose');
const morgan = require('morgan')
const middleswares = require('./middlewares');
require('dotenv').config();


const app = express()

mongoose.connect(`mongodb://${process.env.DATABASE_URL}`,  () => {
    console.log('connected to db')
});






app.use(morgan('common'));

// Hides Headers
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

app.get('/', (req, res) => {
    res.json({
        message: "yo",
    });
});

// Not found Middleware
app.use(middleswares.notFound);
// Error handler Middleware
app.use(middleswares.errorHandler);


const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})

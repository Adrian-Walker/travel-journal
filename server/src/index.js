const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose');
const morgan = require('morgan')
const middleswares = require('./middlewares');
require('dotenv')

const app = express()

app.use(morgan('common'));

// Hides Headers
app.use(helmet())
app.use(cors({
    origin: "http://localhost:3000",
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

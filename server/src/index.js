const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose');
const morgan = require('morgan')
const middleswares = require('./middlewares');
const logs = require('./api/logs')
require('dotenv').config();


const app = express()

// mongoose.connect(`mongodb://${process.env.DATABASE_URL}`, () => {
//     console.log('connected to db')
// });

// mongoose.connect(`mongodb:${process.env.DATABASE_URL}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
async function main() {
    await mongoose.connect(`mongodb:${process.env.DATABASE_URL}`, () => {
        console.log('Connection Verified')
    });
}
main().catch(err => console.log(err));






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

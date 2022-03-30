const { Router } = require('express')
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const logEntry = await new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry)
    } catch (error) {
        console.log(error.name)
        console.log(error, "ERROR")
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
})

module.exports = router;

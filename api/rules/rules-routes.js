const express = require('express');
const router = express.Router();

const Class = require('./models/class');
const Race = require('./models/race');

router.get('/', async (req, res) => {
    try {
        const classes = await Class.findAll();
        const races = await Race.findAll();
        res.json({classes: classes, races: races});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/classes', async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.json(classes);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/races', async (req, res) => {
    try {
        const races = await Race.findAll();
        res.json(races);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;
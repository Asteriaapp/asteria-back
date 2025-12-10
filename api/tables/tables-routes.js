const express = require('express');
const router = express.Router();

const Table = require('./models/table');

router.get('/', async (req, res) => {
    try {
        const tables = await Table.findAll();
        res.json({tables: tables});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;
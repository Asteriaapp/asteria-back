const express = require('express');
const router = express.Router();

const Campaign = require('./models/campaign');

router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.findAll();
        res.json({campaigns: campaigns});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;
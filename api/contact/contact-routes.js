const express = require('express');
const router = express.Router();

const Contact = require('./models/contact');


// POST to create a new contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const contact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({ 
            message: 'Contact message sent successfully',
            contact: contact
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET all contact messages
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({ contacts: contacts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

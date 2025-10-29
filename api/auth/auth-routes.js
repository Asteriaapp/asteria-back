const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const User = require('./models/user');

const JWT_TOKEN_EXP = process.env.JWT_TOKEN_EXP || '7d';
const JWT_TOKEN_MAX_AGE = process.env.JWT_TOKEN_MAX_AGE || 604800000;

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.post("/signup", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) return res.status(400).json({message: "Username, email and password required"});

        const existingUser = await User.findOne({where: {email}});
        if (existingUser) return res.status(409).json({message: "Email address already used"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({username: username, email: email, password: hashedPassword});

        const jwtToken = jwt.sign({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }, process.env.JWT_SECRET, {expiresIn: JWT_TOKEN_EXP});

        res.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: JWT_TOKEN_MAX_AGE
        });

        res.status(201).json({
            user: {username: newUser.username, email: newUser.email}
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
});

router.post("/signin", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) return res.status(401).json({message: "Authentication failed"});

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({message: "Authentication failed"});

        const jwtToken = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn: JWT_TOKEN_EXP});

        res.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: JWT_TOKEN_MAX_AGE
        });

        res.status(200).json({
            user: {username: user.username, email: user.email}
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/me", async (req, res) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) return res.status(401).json({message: "No token provided"});

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({where: {id: payload.id}});

        if (!user) return res.status(401).json({message: "User not found"});

        res.status(200).json({
            username: user.username,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        res.status(401).json({message: "Invalid or expired token"});
    }
});

router.post("/logout", async (req, res) => {
    res.clearCookie("jwtToken");
    res.status(200).json({message: "Logged out"});
});

module.exports = router;
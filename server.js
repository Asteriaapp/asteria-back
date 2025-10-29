require('dotenv').config();
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const initDb = require('./api/auth/config/initDb');

const authRoutes = require('./api/auth/auth-routes');
app.use('/api/auth', authRoutes);

initDb().then(() => {
    app.listen(port, () => {
        console.log(`✅ Auth service listening at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('❌ Failed to init DB:', err);
});



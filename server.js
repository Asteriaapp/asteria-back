require('dotenv').config();
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const initDb = require('./config/initdb');

const authRoutes = require('./api/auth/auth-routes');
const rulesRoutes = require('./api/rules/rules-routes');
app.use('/api/auth', authRoutes);
app.use('/api/rules', rulesRoutes);

initDb().then(() => {
    app.listen(port, () => {
        console.log(`✅ Auth service listening at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('❌ Failed to init DB:', err);
});



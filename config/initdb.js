const sequelize = require('./db.config');

async function initDb() {
    await sequelize.authenticate();
    console.log('✅ DB connected');

    if (process.env.NODE_ENV !== 'production') {
        await sequelize.sync({alter: true});

        const seed = require('../seeding/seed');
        await seed();
    } else {
        await sequelize.sync();
    }
    console.log('✅ Tables synced');
}

module.exports = initDb;
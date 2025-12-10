const sequelize = require('./db.config');

async function initDb() {
    await sequelize.authenticate();
    console.log('✅ DB connected');

    await sequelize.sync();
    console.log('✅ Tables synced');
}

module.exports = initDb;
const Class = require('../api/rules/models/class');
const Race = require('../api/rules/models/race');

const rulesData = require('./seed-rules.json');

async function seed() {
    try {
        console.log("🌱 Insertion des classes...");
        await Class.bulkCreate(rulesData.classes, { ignoreDuplicates: true });

        console.log("🌱 Insertion des races...");
        await Race.bulkCreate(rulesData.races, { ignoreDuplicates: true });

        console.log("✅ Seeding terminé !");
    } catch (err) {
        console.error("❌ Erreur de seeding :", err);
    }
}

module.exports = seed;

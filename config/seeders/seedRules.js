const Classes = require('../models/Class');
const Races = require('../models/Race');
const mockedRules = require('./rules.json');

async function seedClasses() {
    await Classes.bulkCreate(mockedRules.classes);
    console.log('✅ Classes seeded');
}

async function seedRaces() {
    await Races.bulkCreate(mockedRules.races);
    console.log('✅ Races seeded');
}

module.exports = { seedClasses, seedRaces };
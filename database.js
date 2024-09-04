const { Sequelize } = require('sequelize');
const { BeatmapModel } = require('./Models/BeatmapModel');

require('dotenv').config();

let databases = {
    inspector: new Sequelize(
        process.env.MYSQL_DB, 
        process.env.MYSQL_USER, 
        process.env.MYSQL_PASS, 
        { 
            host: process.env.MYSQL_HOST, 
            dialect: 'mariadb', 
            timezone: 'Europe/Amsterdam', 
            logging: false,
            retry: {
                max: 10
            }
        }),
    osuAlt: new Sequelize(
        process.env.ALT_DB_DATABASE, 
        process.env.ALT_DB_USER, 
        process.env.ALT_DB_PASSWORD, 
        { 
            host: process.env.ALT_DB_HOST, 
            dialect: 'postgres', 
            logging: false,
            retry: {
                max: 10
            }
        })
};
module.exports.Databases = databases;

const AltBeatmap = BeatmapModel(databases.osuAlt);
const InspectorBeatmap = BeatmapModel(databases.inspector);

module.exports.AltBeatmap = AltBeatmap;
module.exports.InspectorBeatmap = InspectorBeatmap;
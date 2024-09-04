const updateBeatmapDatabase = require("./update-beatmap-database");
const updateBeatmapFiles = require("./update-beatmap-files");
const updateBeatmapStarRatings = require("./update-beatmap-starrating");

async function Run(){
    // await updateBeatmapDatabase();
    // await updateBeatmapFiles();
    await updateBeatmapStarRatings();
    console.log("Run");
}

Run(); // Run

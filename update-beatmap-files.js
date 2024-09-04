//this script downloads all .osz osu beatmap data files and stores them in the beatmaps folder

const { InspectorBeatmap } = require("./database");
var fs = require('fs');
const https = require('https');

async function updateBeatmapFiles() {
    validateDirectories();
    const beatmaps = await InspectorBeatmap.findAll();
    console.log(`${beatmaps.length} beatmaps found.`);

    for await(const beatmap of beatmaps){
        await getFile(beatmap.beatmap_id);
    }
}

const file_dir = "./files";
const beatmap_osz_dir = `${file_dir}/beatmaps`;

function validateDirectories() {
    if (!fs.existsSync(file_dir)) {
        fs.mkdirSync(file_dir);
    }

    if (!fs.existsSync(beatmap_osz_dir)) {
        fs.mkdirSync(beatmap_osz_dir);
    }
}

async function getFile(beatmap_id) {
    //create directory if it doesn't exist
    if (!fs.existsSync(beatmap_osz_dir)) {
        fs.mkdirSync(beatmap_osz_dir);
    }

    //if `beatmap_id`.osz doesn't exist, download it
    //otherwise, skip
    const file_path = `${beatmap_osz_dir}/${beatmap_id}.osu`;
    if(fs.existsSync(file_path)){
        return;
    }

    const url = `https://osu.ppy.sh/osu/${beatmap_id}`;
    const file = fs.createWriteStream(file_path);

    await new Promise((resolve, reject) => {
        https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();
                resolve();
            });
        }).on('error', function(err) {
            fs.unlink(file_path);
            reject(err);
        });
    });

    console.log(`Downloaded ${beatmap_id}.osu`);
}

module.exports = updateBeatmapFiles;
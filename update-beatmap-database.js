//this script simply updates our local beatmap database with maps from osu!alternative

const { Databases, AltBeatmap, InspectorBeatmap } = require("./database");

async function updateBeatmapDatabase() {
    await getRemoteBeatmaps();
    console.log("Updating beatmap database...");
}

async function getRemoteBeatmaps() {
    const remote = await AltBeatmap.findAll();
    const local_res = await InspectorBeatmap.findAll();

    const local = {};
    for await (const beatmap of local_res) {
        local[beatmap.beatmap_id] = { ...beatmap.dataValues };
    }

    for (const beatmap of remote) {
        const _local = local[beatmap.beatmap_id];
        if (_local) {
            if (_local.approved !== beatmap.approved || _local.playcount !== beatmap.playcount) {
                await InspectorBeatmap.update(beatmap.dataValues, { where: { beatmap_id: beatmap.beatmap_id } });
            }
        } else {
            await InspectorBeatmap.create(beatmap.dataValues);
        }
    }
    console.log("Remote beatmaps fetched.");
}

module.exports = updateBeatmapDatabase;
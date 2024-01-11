const Cpu = require('../models/cpu');
const mongoose = require('mongoose');


exports.getCpus = async (req, res) => {
    const cpus = await Cpu.find();
    res.send(cpus);
}

exports.postCpu = async (req, res) => {
    await Cpu.remove();

    const upsertArray = req.body.map(build => {
        const { name, description, imagePath, parts } = build;
        let { _id } = build;
        _id = _id ? _id : mongoose.Types.ObjectId();
        return {
            updateOne: {
                filter: { _id },
                update: { name, description, imagePath, parts },
                upsert: true
            }
        }
    });
    const result = await Cpu.bulkWrite(upsertArray);
    res.send({
        data: result
    });
}
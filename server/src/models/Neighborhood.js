const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neighborhoodSchema = new Schema(
    {
        id_renabap: {
            type: String,
            required: true,
            unique: true,
        },
        paquetes: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { toJSON: { virtuals: true } }
);

module.exports = mongoose.model('neighborhood', neighborhoodSchema);

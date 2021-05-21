const mongoose = require("mongoose");

const ResetSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: false
        },
        hash: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: Boolean,
            required: true
        },
        uuid: {
            type: String,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);

const Reset = mongoose.model("Reset", ResetSchema);

module.exports = Reset;

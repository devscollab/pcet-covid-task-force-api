const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema(
    {
        volunteerType: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        volunteerObject: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports = Volunteer;

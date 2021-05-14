const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        passHash: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        college: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
        isStudent: {
            type: Boolean,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        div: {
            type: String,
        },
        rollNumber: {
            type: String,
        },
        age: {
            type: Number,
            required: true,
        },
        dob: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        bloodGroup: {
            type: String,
            required: true,
        },
        aadharNumber: {
            type: Number,
            required: true,
        },
        contactNumber: {
            type: Number,
            required: true,
        },
        emergencyContact: {
            type: Number,
            required: true,
        },
        currentAddress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        haCovid: {
            type: Boolean,
            required: true,
        },
        startCovidDate: {
            type: Number,
        },
        endCovidDate: {
            type: Number,
        },
        isVaccinated: {
            type: Boolean,
            required: true,
        },
        vaccineType: {
            type: String,
        },
        dateOfDose1: {
            type: Number,
        },
        dateOfDose2: {
            type: Number,
        },
        isRegisteredoncowin: {
            type: Boolean,
        },
        caDonateblood: {
            type: Boolean,
            required: true,
        },
        caDonateplasma: {
            type: Boolean,
            required: true,
        },
        isRecovered: {
            type: Boolean,
        },
        optionals: {
            type: mongoose.Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

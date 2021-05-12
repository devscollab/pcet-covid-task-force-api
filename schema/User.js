const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true
        },
        passHash: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        college: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        div: {
            type: String,
        },
        rollNumber: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        dob: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        bloodGroup: {
            type: String,
            required: true
        },
        aadharNumber: {
            type: Number,
            required: true
        },
        contactNumber: {
            type: Number,
            required: true
        },
        emergencyContact: {
            type: Number,
            required: true
        },
        currentAddress: {
            type: String,
            required: true
        },
        currentCity: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        hadCovid: {
            type: Boolean,
            required: true
        },
        startCovidDate: {
            type: Number
        },
        endCovidDate: {
            type: Number
        },
        isVaccinated: {
            type: Boolean,
            required: true
        },
        vaccineType: {
            type: String
        },
        dateOfDose1: {
            type: Number
        },
        dateOfDose2: {
            type: Number
        },
        isRegisteredOnCowin: {
            type: Boolean,
            required: true
        },
        canDonateBlood: {
            type: Boolean,
            required: true
        },
        canDonatePlasma: {
            type: Boolean,
            required: true
        },
        optionals: {
            type: mongoose.Schema.Types.Mixed
        }

    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;
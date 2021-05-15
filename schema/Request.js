const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
    {
        requestType: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        requestObject: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;

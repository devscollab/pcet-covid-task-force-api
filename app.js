const express = require("express");
const auth = require("./helpers/Auth");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose")
require("dotenv").config();
const cors = require("cors");
const app = express();
const User = require("./schema/User")
app.use(express.json());

app.use(cors());

let database = [];

mongoose.connect("mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME + "?ssl=true&replicaSet=globaldb", {
    auth: {
        user: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
})
    .then(() => {
        console.log('Connection to CosmosDB successful')
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`);
        });



    })
    .catch((err) => console.error(err));


// default route
app.get("/", (req, res) => {
    res.send("API is UP v1.0.1");
});

// health route
app.get("/health", (req, res) => {
    res.json({
        status: 200,
        message: "ok",
    });
});

// Registration Route for Students
app.post("/register-student", (req, res) => {
    let data = req.body;

    let user = new User(data)

    user.save().then(e => {
        res.json({
            status: 200,
            message: "User added successfully",
        });

    }).catch(e => {
        if (e.code === 11000)
            res.json({
                status: 400,
                message: "Duplicate Entry"
            })
        else
            res.json({
                status: 400,
                message: e.message
            })

    })

});

// Register Route for Staff
app.post("/register-staff", (req, res) => {
    // console.log(req.body)
    res.json({
        status: 200,
    });
});

// Get user data for Staff
app.post("/get-user/student", (req, res) => {
    let email = req.body?.email;
    if (email) {
        let f = false;
        database.forEach((e) => {
            if (e.email === email) {
                res.json({
                    status: 200,
                    userObject: e,
                });
                f = true;
            }
        });
        if (!f)
            res.json({
                status: 404,
                message: "User not found",
            });
    } else
        res.json({
            status: 400,
            message: "Invalid email",
        });
});

// Get user data for Staff
app.post("/get-user/staff", (req, res) => {
    // console.log(req.body)
    res.json({
        status: 200,
    });
});

// Get user data for Staff
app.post("/add-request", (req, res) => {
    // console.log(req.body)
    res.json({
        status: 200,
    });
});



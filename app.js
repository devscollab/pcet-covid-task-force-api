const express = require("express");
const Auth = require("./helpers/Auth");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose")
require("dotenv").config();
const bcrypt = require("bcrypt")
const cors = require("cors");
const app = express();
const User = require("./schema/User")
const jwt = require("jsonwebtoken")
app.use(express.json());
const JWT_KEY = process.env.JWT_KEY
const SALT = 10

app.use(cors());


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
        // User.db.drop
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error(err));


// default route
app.get("/", (req, res) => {
    res.send("API is UP v1.0.3");
});

// health route
app.get("/health", (req, res) => {
    res.json({
        status: 200,
        message: "ok",
    });
});

// Registration Route for Students
app.post("/register", (req, res) => {
    let data = req.body;
    let passHash = bcrypt.hashSync(data.password, SALT)
    data['passHash'] = passHash
    delete data['password']

    let user = new User(data)

    user.save().then(e => {
        console.log(e)

        let token = jwt.sign({ id: e._id }, JWT_KEY);

        res.json({
            status: 200,
            message: "User added successfully",
            token: token
        })

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

// Login Student
app.post("/login", async (req, res) => {
    let pass = req.body.password
    let email = req.body.email

    if (email && pass) {
        try {
            let data = await User.findOne({ email })
            if (!data) {
                res.json({
                    status: 404,
                    message: "Email not registered"
                })
                return
            }
            if (bcrypt.compareSync(pass, data?.passHash) && data) {
                var token = jwt.sign({ id: data._id }, JWT_KEY);
                res.json({
                    status: 200,
                    message: "User logged In successfully",
                    token: token
                })
                return
            }
            else {
                res.json({
                    status: 400,
                    message: "Incorrect username or password"
                })
                return
            }
        }
        catch (e) {
            res.json({
                status: 400,
                message: e.message
            })
            return
        }
    }
    res.json({
        status: 500,
        message: "Internal Server Error"
    });


})

// Get user data for Staff
app.get("/get-user", Auth, (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    let id = decodedToken.id
    if (id) {
        User.findById(id).then(e => {
            delete e['passHash']
            e['aadharNumber'] = e['aadharNumber'] % 10000

            res.json({
                status: 200,
                userData: e
            })
        })
            .catch(err => {
                res.json({
                    status: 400,
                    message: err.message,
                });
            })

    } else
        res.json({
            status: 400,
            message: "Invalid id",
        });
});


// Get user data for Staff
app.post("/add-request", (req, res) => {
    // console.log(req.body)
    res.json({
        status: 200,
    });
});



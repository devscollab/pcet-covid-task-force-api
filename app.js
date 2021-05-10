const express = require('express')
const auth = require("./helpers/auth")
const PORT = 3000
require('dotenv').config();
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(cors())

let database = []

let id = 100;

// default route
app.get('/', (req, res) => {
    res.send('API is UP')
})

// health route
app.get("/health", (req, res) => {
    res.json({
        status: 200,
        message: "ok"
    })
})


// Registration Route for Students
app.post("/register-student", (req, res) => {
    let data = req.body;
    data.id = id
    database.push(data)
    res.json({
        status: 200,
        message: "User added successfully",
        id: id++
    })
})

// Register Route for Staff
app.post("/register-staff", (req, res) => {
    console.log(req.body)
    res.json({
        status: 200
    })
})

// Get user data for Staff
app.post("/get-user/student", (req, res) => {
    let email = req.body?.email
    if (email) {
        let f = false
        database.forEach(e => {
            if (e.email === email) {
                res.json({
                    status: 200,
                    userObject: e
                })
                f = true
            }

        })
        if (!f)
            res.json({
                status: 404,
                message: "User not found"
            })
    } else
        res.json({
            status: 400,
            message: "Invalid email"
        })

})

// Get user data for Staff
app.post("/get-user/staff", (req, res) => {
    console.log(req.body)
    res.json({
        status: 200
    })
})

// Get user data for Staff
app.post("/add-request", (req, res) => {
    console.log(req.body)
    res.json({
        status: 200
    })
})


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
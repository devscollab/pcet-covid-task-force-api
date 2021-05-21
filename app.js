const express = require("express");
const Auth = require("./helpers/auth");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const User = require("./schema/User");
const Reset = require("./schema/Reset");
const Request = require("./schema/Request");
const Volunteer = require("./schema/Volunteer");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
app.use(express.json());
const JWT_KEY = process.env.JWT_KEY;
const SALT = 10;

app.use(cors());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.G_ACC,
        pass: process.env.G_PASS
    }
});



mongoose.set('useFindAndModify', false);
mongoose
    .connect(
        "mongodb://" +
        process.env.COSMOSDB_HOST +
        ":" +
        process.env.COSMOSDB_PORT +
        "/" +
        process.env.COSMOSDB_DBNAME +
        "?ssl=true&replicaSet=globaldb",
        {
            auth: {
                user: process.env.COSMOSDB_USER,
                password: process.env.COSMOSDB_PASSWORD,
            },
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false,
        }
    )
    .then(() => {
        console.log("Connection to CosmosDB successful");
        // User.db.drop
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`);
        });
    })
// .catch((err) => console.error(err));

// default route
app.get("/", (req, res) => {
    res.send(`
    
    <h3>API is Up v1.1.0</h3>
    <ul>
        <li>Supports Registration</li>
        <li>Supports Login</li>
        <li>Supports Reset Password</li>
        <li>Supports Fetching User data</li>
        <li>Supports Updating User data</li>
        <li>Supports Adding Request</li>
        <li>Supports Adding Volunteer</li>
    </ul> 
    `);
});

// health route
app.get("/health", (req, res) => {
    res.json({
        status: 200,
        message: "ok",
    });
});

// Registration Route for User
app.post("/register", (req, res) => {
    let data = req.body;
    // console.log(data)
    let passHash = bcrypt.hashSync(data.password, SALT);
    data["passHash"] = passHash;
    delete data["password"];
    let user = new User(data);

    user.save()
        .then((e) => {
            // console.log(e);
            let token = jwt.sign({ id: e._id }, JWT_KEY);

            res.json({
                status: 200,
                message: "User added successfully",
                token: token,
            });
        })
        .catch((e) => {
            if (e.code === 11000)
                res.json({
                    status: 400,
                    message: "Duplicate Entry",
                });
            else
                res.json({
                    status: 400,
                    message: e.message,
                });
        });
});

// Login User
app.post("/login", async (req, res) => {
    let pass = req.body.password;
    let email = req.body.email;
    // console.log(req.body)
    // console.log([pass, email])

    if (email && pass) {
        try {
            let data = await User.findOne({ email });
            if (!data) {
                res.json({
                    status: 404,
                    message: "Email not registered",
                });
                return;
            }
            if (bcrypt.compareSync(pass, data?.passHash) && data) {
                var token = jwt.sign({ id: data._id }, JWT_KEY);
                res.json({
                    status: 200,
                    message: "User logged In successfully",
                    token: token,
                });
                return;
            } else {
                res.json({
                    status: 400,
                    message: "Incorrect username or password",
                });
                return;
            }
        } catch (e) {
            res.json({
                status: 400,
                message: e.message,
            });
            return;
        }
    } else
        res.json({
            status: 400,
            message: "Invalid user object",
        });
});

// Reset Phase 1
app.post("/reset", async (req, res) => {
    let email = req.body.email
    let aadharNumber = req.body.aadharNumber
    User.findOne({ email, aadharNumber })
        .then(data => {
            if (data) {
                let hash = bcrypt.hashSync(`${data._id}${new Date().getTime().toString()}`, SALT)
                let uuid = new Date().getDate().toString() + data._id
                let nReset = new Reset({
                    userId: data._id,
                    hash,
                    status: false,
                    uuid
                })
                nReset.save()
                    .then(e => {
                        hash = encodeURIComponent(hash)
                        const mailOptions = {
                            from: process.env.G_ACC, // sender address
                            to: data.email, // list of receivers
                            subject: 'Password Reset Link for PCTF', // Subject line
                            html: `<p>Password reset link for PCTF portal : <a href="https://pctfhelp.me/reset-password/${hash}">https://pctfhelp.me/reset-password/${hash}</a></p>`
                        };
                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                console.log(err)
                                res.json({
                                    status: 400,
                                    message: err.message
                                })

                            }
                            else {
                                // console.log(info);
                                res.json({
                                    status: 200,
                                    message: "Email sent successfully"
                                })
                            }
                        });

                    }).catch(err => {
                        if (err.code === 11000)
                            res.json({
                                status: 400,
                                message: "Reset link already sent. Only one reset link can be generated per day."
                            })
                        else
                            res.json({
                                status: 400,
                                message: err.message
                            })
                    })

            }
            else {
                res.json({
                    status: 400,
                    message: "This combination of email and aadhar card is invalid."
                })
            }
        })

})

// Reset Phase 2
app.post("/generate-new", async (req, res) => {
    let hash = req.body.hash
    let newPassword = req.body.newPassword

    try {
        let resetDoc = await Reset.findOne({ hash, status: false })
        if (resetDoc) {
            let userDoc = await User.findById(resetDoc.userId)
            let rs = await userDoc.update({
                passHash: bcrypt.hashSync(newPassword, SALT)
            })
            rs = await resetDoc.update({ status: true })
            res.json({
                status: 200,
                message: "Password Reset Successful"
            })

        }
        else {
            res.json({
                status: 400,
                message: "Invalid Link"
            })
        }
    }
    catch (err) {
        res.json({
            status: 400,
            message: err.message
        })
    }


})
// Update User
app.post("/update-user", Auth, (req, res) => {
    // console.log(req.body)
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    let id = decodedToken.id;
    if (id) {
        User.findByIdAndUpdate(id, req.body)
            .then(e => {
                res.json({
                    status: 200,
                    message: "User updated successfully"
                })
            })
            .catch(err => {
                console.log(err)
                res.json({
                    status: 400,
                    message: err.message
                })
            })
    }
    else
        res.json({
            status: 400,
            message: "Invalid id"
        })
})

// Get user data for Staff
app.get("/get-user", Auth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    let id = decodedToken.id;
    if (id) {
        User.findById(id)
            .then((e) => {
                let userData = {
                    ...e._doc
                };
                // console.log(userData)
                delete userData.passHash
                delete userData._id
                delete userData.__v
                userData.aadharNumber = userData['aadharNumber'] % 10000


                res.json({
                    status: 200,
                    userData,
                });
            })
            .catch((err) => {
                res.json({
                    status: 400,
                    message: err.message,
                });
            });
    } else
        res.json({
            status: 400,
            message: "Invalid id",
        });
});

// Add Requests
app.post("/add-request", (req, res) => {
    let data = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    data['userId'] = decodedToken.id

    let request = new Request(data)
    request.save()
        .then((e) => {
            res.json({
                status: 200,
                message: "Request added successfully",
                requestId: e._id,
            });
            return
        })
        .catch((e) => {
            res.json({
                status: 400,
                message: e.message,
            });
            return
        });
});

// Get Users Requests
app.get("/get-requests", Auth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    Request.find({ "userId": decodedToken.id })
        .then(result => {
            let requests = [];
            result.forEach(el => {
                requests.push({
                    requestId: el._id,
                    requestType: el.requestType,
                    requestObject: el.requestObject,
                    createdAt: el.createdAt
                })
            })
            res.json({
                status: 200,
                requests
            })
        })
        .catch(e => {
            res.json({
                status: 400,
                requests: e
            })
        })
})

// Add Volunteer
app.post("/add-volunteer", Auth, (req, res) => {
    let data = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    data['userId'] = decodedToken.id

    let volunteer = new Volunteer(data)
    volunteer.save()
        .then((e) => {
            res.json({
                status: 200,
                message: "Volunteer added successfully",
                volunteerId: e._id,
            });
            return
        })
        .catch((e) => {
            res.json({
                status: 400,
                message: e.message,
            });
            return
        });
})

// Get Users Requests
app.get("/get-volunteers", Auth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    Volunteer.find({ "userId": decodedToken.id })
        .then(result => {
            let volunteers = [];
            result.forEach(el => {
                volunteers.push({
                    volunteerId: el._id,
                    volunteerType: el.volunteerType,
                    volunteerObject: el.volunteerObject,
                    createdAt: el.createdAt
                })
            })
            res.json({
                status: 200,
                volunteers
            })
        })
        .catch(e => {
            res.json({
                status: 400,
                requests: e
            })
        })
})
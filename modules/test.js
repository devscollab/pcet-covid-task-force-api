// const req = require("./Requests")

// let d = {
//     "email": "test@1553.com",
//     "firstName": "Test",
//     "password": "123456",
//     "lastName": "User",
//     "college": "PCET",
//     "course": "BE",
//     "branch": "COMP",
//     "year": 2021,
//     "div": "B",
//     "rollNumber": 256,
//     "age": 18,
//     "dob": 187459,
//     "gender": "M",
//     "bloodGroup": "B+",
//     "aadharNumber": 74984898498,
//     "contactNumber": 879879879,
//     "emergencyContact": 549848498,
//     "currentAddress": "NA",
//     "currentCity": "NASKS",
//     "state": "MH",
//     "pincode": 415875,
//     "hadCovid": false,
//     "startCovidDate": 184847548,
//     "endCovidDate": 14541587,
//     "isVaccinated": false,
//     "vaccineType": "N",
//     "dateOfDose1": null,
//     "dateOfDose2": null,
//     "isRegisteredOnCowin": false,
//     "canDonateBlood": false,
//     "canDonatePlasma": false
// }

// req.register(d).then(e => { console.log(e.data) })

// req.checkHealth().then(e => { console.log(e.data) })

// req.getData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWJiNGQ1ZTM1ZmIwNTBkNDlkZjk4ZiIsImlhdCI6MTYyMDgyMDc1OX0.p7UrgWRXLifXl_5cy0rlo6Fz1NqW93kS3_wRDU7JE54').then(e => { console.log(e.data) })

const request = require("./Requests")

let user = {
    "email": "tes7988987thsct@t79.com",
    "firstName": "Test",
    "password": "123456",
    "lastName": "User",
    "college": "PCET",
    "course": "BE",
    "branch": "COMP",
    "year": 2021,
    "div": "B",
    "rollNumber": 256,
    "isStudent": true,
    "age": 18,
    "dob": 187459,
    "gender": "M",
    "bloodGroup": "B+",
    "aadharNumber": 74984898498,
    "contactNumber": 879879879,
    "emergencyContact": 549848498,
    "currentAddress": "NA",
    "city": "NASKS",
    "state": "MH",
    "pincode": 415875,
    "haCovid": false,
    "startCovidDate": 184847548,
    "endCovidDate": 14541587,
    "isVaccinated": false,
    "vaccineType": "N",
    "dateOfDose1": null,
    "dateOfDose2": null,
    "isRegisteredoncowin": false,
    "caDonateblood": false,
    "caDonateplasma": false,
    "isRecovered": null
}

let requestObject = {
    "requestType": "testing",
    "requestObject": {
        "name": 123,
        "lalal": 456
    }
}

let volunteerObject = {
    "volunteerType": "testing",
    "volunteerObject": {
        "name": 123,
        "lalal": 456
    }
}

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWZiYzJlNjQzMzdkNTY2OGJiNmI2NSIsImlhdCI6MTYyMTA4MTEzNX0.uKgdjvpvbvwgVsEhm_3YCjdyCgMDTvsFqCTOL-vwbYc";

async function test() {

    console.log("\n\n----Testing Health------\n")
    try {
        let response = await request.checkHealth()
        console.log(response.data)
        console.log("\nHealth Working Fine 🟢")
    }
    catch (e) {
        console.log("Error Code =>" + e.code)
        console.log("\nIssue in Health 🔴")
        return
    }

    console.log("\n\n----Testing User Registration------\n")
    try {
        let response = await request.register(user)
        console.log(response.data)
        if (response.data.status === 200) {
            console.log("\nUser Registration  Working Fine 🟢")
            token = response.data.token;

        }
        else {
            console.log("\nIssue in Registration 🔴")
            return

        }
    }
    catch (e) {
        console.log("Error Code =>" + e.code)
        console.log("\nIssue in Registration 🔴")
        return
    }

    console.log("\n\n----Testing User Login------\n")
    try {
        console.log({ email: user.email, password: user.password })
        let response = await request.login(user.email, user.password)
        console.log(response.data)
        if (response.data.status === 200) {
            console.log("\nUser Login  Working Fine 🟢")
            token = response.data.token;
        }
        else {
            console.log("\nIssue in Login 🔴")
            return

        }
    }
    catch (e) {
        console.log("Error Code =>" + e.code)
        console.log("\nIssue in Login 🔴")
        return
    }

    console.log("\n\n----Testing Get User Data -----\n")
    try {
        let response = await request.getData(token)
        console.log(response.data)
        if (response.data.status === 200) {
            console.log("\nGet User Data  Working Fine 🟢")
        }
        else {
            console.log("\nIssue in Get User Data 🔴")
            return

        }
    }
    catch (e) {
        console.log("Error Code =>" + e.code)
        console.log("\nIssue in Get User Data 🔴")
        return
    }


    console.log("\n\n----Testing Add Request -----\n")
    try {
        let response = await request.addRequest(token, requestObject)
        console.log(response.data)
        if (response.data.status === 200) {
            console.log("\nAdd Request  Working Fine 🟢")
        }
        else {
            console.log("\nIssue in Add Request 🔴")
            return

        }
    }
    catch (e) {
        console.log("Error Code =>" + e.code)
        console.log("\nIssue in Add Request 🔴")
        return
    }

    console.log("\n\n----Testing Get User Request -----\n")
    try {
        let response = await request.getRequests(token)
        console.log(response.data)
        if (response.data.status === 200) {
            console.log("\nGet User Request Working Fine 🟢")
        }
        else {
            console.log("\nIssue in Get User Request 🔴")
            return

        }
    }
    catch (e) {
        console.log("Error Code =>" + e.code)
        console.log("\nIssue in Get User Request 🔴")
        return
    }

    console.log("\n\n----Testing Add Volunteer -----\n")
    try {
        let response = await request.addVolunteer(token, volunteerObject)
        console.log(response.data)
        if (response.data.status === 200) {
            console.log("\nAdd Volunteer  Working Fine 🟢")
        }
        else {
            console.log("\nIssue in Add Volunteer 🔴")
            return

        }
    }
    catch (e) {
        console.log("Error Code =>" + e.code)
        console.log("\nIssue in Add Volunteer 🔴")
        return
    }

    console.log("\n\n----Testing Get User Volunteers -----\n")
    try {
        let response = await request.getVolunteers(token)
        console.log(response.data)
        if (response.data.status === 200) {
            console.log("\nGet User Volunteers Working Fine 🟢")
        }
        else {
            console.log("\nIssue in Get User Volunteers 🔴")
            return

        }
    }
    catch (e) {
        console.log("Error Code =>" + e.code)
        console.log("\nIssue in Get User Volunteers 🔴")
        return
    }

}

// test()
request.getData(token)
    .then(console.log).catch(console.log)
// request.updateData(token, { firstName: "123" })
//     .then(console.log).catch(console.log)

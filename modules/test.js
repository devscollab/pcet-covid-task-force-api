const req = require("./Requests")

let d = {
    "email": "test@1553.com",
    "firstName": "Test",
    "password": "123456",
    "lastName": "User",
    "college": "PCET",
    "course": "BE",
    "branch": "COMP",
    "year": 2021,
    "div": "B",
    "rollNumber": 256,
    "age": 18,
    "dob": 187459,
    "gender": "M",
    "bloodGroup": "B+",
    "aadharNumber": 74984898498,
    "contactNumber": 879879879,
    "emergencyContact": 549848498,
    "currentAddress": "NA",
    "currentCity": "NASKS",
    "state": "MH",
    "pincode": 415875,
    "hadCovid": false,
    "startCovidDate": 184847548,
    "endCovidDate": 14541587,
    "isVaccinated": false,
    "vaccineType": "N",
    "dateOfDose1": null,
    "dateOfDose2": null,
    "isRegisteredOnCowin": false,
    "canDonateBlood": false,
    "canDonatePlasma": false
}

req.register(d).then(e => { console.log(e.data) })

req.checkHealth().then(e => { console.log(e.data) })

req.getData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWJiNGQ1ZTM1ZmIwNTBkNDlkZjk4ZiIsImlhdCI6MTYyMDgyMDc1OX0.p7UrgWRXLifXl_5cy0rlo6Fz1NqW93kS3_wRDU7JE54').then(e => { console.log(e.data) })
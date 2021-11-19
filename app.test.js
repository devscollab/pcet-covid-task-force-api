const assert = require('assert');
const request = require("./modules/Requests")

let user = {
  "email": "tes7988sdhsct@t79.com",
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


let TOKEN = null

describe('Testing API', () => {
  it("API is Up", (done) => {
    request.checkHealth().then(res => {
      let { status, message } = res.data
      assert.equal(status, 200, "Status error")
      assert.equal(message, "ok", "Incorrect message")
      done()
    }).catch(console.log)
  })

  it("User registration", (done) => {
    user.email = `testuser-${Math.random() * 50}@gmial.com`
    request.register(user).then(res => {
      let { status, message, token } = res.data
      assert.equal(status, 200, "Status error")
      assert.equal(message, "User added successfully", "Incorrect message")
      assert.notEqual(token, null, "Invalid Token")
      done()
    }).catch(console.log)
  })

  it("User Login", (done) => {
    request.login(user.email, user.password).then(res => {
      let { status, message, token } = res.data
      assert.equal(status, 200, "Status error")
      assert.equal(message, "User logged In successfully", "Incorrect message")
      TOKEN = token
      done()
    }).catch(console.log)
  })

  it("Fetch User data", (done) => {
    request.getData(TOKEN).then(res => {
      let { status, userData } = res.data
      assert.equal(status, 200, "Status error")
      assert.notEqual(userData, {}, "Incorrect data")
      done()
    }).catch(console.log)
  })

  it("Add request", (done) => {
    request.addRequest(TOKEN, requestObject).then(res => {
      let { status, message, requestId } = res.data
      assert.equal(status, 200, "Status error")
      assert.equal(message, "Request added successfully", "Incorrect message")
      assert.notEqual(requestId, undefined, "Incorrect data")
      done()
    }).catch(console.log)
  })

  it("Get user requests", (done) => {
    request.getRequests(TOKEN).then(res => {
      let { status, requests } = res.data
      assert.equal(status, 200, "Status error")
      assert.notEqual(requests, [], "Incorrect data")
      done()
    }).catch(console.log)
  })

  it("Add Volunteer", (done) => {
    request.addVolunteer(TOKEN, volunteerObject).then(res => {
      let { status, message, volunteerId } = res.data
      assert.equal(status, 200, "Status error")
      assert.equal(message, "Volunteer added successfully", "Incorrect message")
      assert.notEqual(volunteerId, undefined, "Incorrect data")
      done()
    }).catch(console.log)
  })

  it("Get volunteers", (done) => {
    request.getRequests(TOKEN).then(res => {
      let { status, volunteers } = res.data
      assert.equal(status, 200, "Status error")
      assert.notEqual(volunteers, [], "Incorrect data")
      done()
    }).catch(console.log)
  })
})
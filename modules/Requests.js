const axios = require('axios');

class Requests {
    constructor(route = "https://pctfapi.azurewebsites.net/") {
        this.route = route
    }

    checkHealth() {
        return axios.get(this.route + "/health")
    }

    registerStudent(data) {
        return axios.post(this.route + "/register-student", data)
    }

    registerStaff(data) {
        return axios.post(this.route + "/register-staff", data)
    }

    loginStudent(email, password) {
        let data = {
            email, password
        }
        return axios.post(this.route + '/login-student', data)
    }

    loginStaff(email, password) {
        let data = {
            email, password
        }
        return axios.post(this.route + '/login-staff', data)
    }

    getData(token) {
        let config = {
            method: 'get',
            url: this.route + '/get-user/student',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        return axios.get(this.route + '/get-user/student', config)
    }
}

module.exports = new Requests()

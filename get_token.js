const axios = require('axios');

const authData = {
    email: "vk8417@srmist.edu.in",
    name: "Viekhyat Khare",
    mobileNo: "7905420691",
    githubUsername: "Viekhyat",
    rollNo: "RA2311026010062",
    accessCode: "QkbpxH",
    clientID: "d9b1d0bb-9fb0-4e5b-8e60-f52886c59fcf",
    clientSecret: "QqWPnhtuXPNMWfwG"
};

async function getAuthToken() {
    try {
        console.log("Authenticating...");
        const authResponse = await axios.post('http://20.207.122.201/evaluation-service/auth', authData);
        console.log("\n=================================");
        console.log("YOUR NEW ACCESS TOKEN IS:");
        console.log(authResponse.data.access_token);
        console.log("=================================\n");
        console.log("Tokens expire every 15 minutes. Copy this token to localStorage if you need to refresh your session.");
    } catch (error) {
        console.error("Error occurred:", error.response ? error.response.data : error.message);
    }
}

getAuthToken();

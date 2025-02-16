require('dotenv').config()
const express = require('express');
const app = express();
const oauthController = require("./controllers/oauthtokencontroller")
const port = 3010;


async function test() {
    const tokenData = await oauthController.getToken();
    if (tokenData) {
        console.log('Token:', tokenData.access_token);
    }
}

test();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    //startScraping();
});
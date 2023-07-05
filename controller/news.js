const {respond} = require("../middlewares/respond");
const db = require("../database/database");
const {baseUrls, Keys, messages} = require("../util/constants");
const {httpRequest, method} = require("../util/httpRequestHandler");
const models = require("../models/sources.models")
const http = require("http");


const news = async (req, res) => {
    let sourceString = encodeURIComponentArray(req.user.preferences.categories);
    console.log("sourceString :: ", sourceString);
    let baseUrl = baseUrls.everything + sourceString + "&apiKey=" + Keys.newsApiKey;
    const headers = {
        'Content-Type': 'application/json',
    }
    let response = await httpRequest(req, baseUrl, method.GET, headers, null, null);
    console.log("response :: ", response.data)
    respond(res, "OK", 200);
}

const sources = async (req, res) => {
    try {
        let baseUrl = baseUrls.source + Keys.newsApiKey;
        const headers = {
            'Content-Type': 'application/json',
        }
        let response = await httpRequest(req, baseUrl, method.GET, headers, null, null);
        console.log("response status :: ", response.status)
        if (response.status === 200) {
            respond(res, models.sourcesFromDb(response.data.sources), 200);
        } else {
            respond(res, messages.unexpectedError, 500);
        }
    } catch (err) {
        respond(res, messages.unexpectedError, 500);
    }
}


const encodeURIComponentArray = (array) => {
    const encodedValues = array.map(value => encodeURIComponent(value));
    return encodedValues.join('%20OR%20');
};

module.exports = {
    news,
    sources
}
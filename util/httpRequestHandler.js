const axios = require('axios').default;

/**
 * Common HTTP request handler for all requests
 * @param req Request
 * @param url URL to forward the request to
 * @param requestMethod method of request [GET] [POST] [OPTIONS] [PUT] or [DELETE]
 * @param headers Headers, if any
 * @param body Body, if any
 * @param auth authentication, if any
 */

const httpRequest = async (req, url, requestMethod, headers, body, auth) => {
    try {
        const config = {
            headers: headers,
            auth: auth
        };
        let requestBody;
        if (requestMethod === method.GET) {
            requestBody = config;
        } else {
            requestBody = body;
        }
        return await axios[requestMethod](url, requestBody, config);
    } catch (error) {
        if (error.response) {
            // Request made and server responded
            req.log.error({"location:": "response data", "data": error.response.data});
            req.log.error({"location:": "response status", "data": error.response.status});
            req.log.error({"location:": "response headers", "data": error.response.headers});
            return {data: error.response.data ?? {}, status: error.response.status};
        } else if (error.request) {
            // The request was made but no response was received
            req.log.error({"location:": "request", "data": error.request});
            return {data: "Bad Request", status: 400};
        }
        // Something happened in setting up the request that triggered an Error
        req.log.error('Error Message', error.message);
        return {};
    }
};

const method = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    OPTIONS: "options",
}

module.exports = {httpRequest, method};
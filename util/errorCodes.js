/**
 * handle returning the error response
 * @param errCode {string}
 * @param req
 * */
module.exports.errorHandler = (errCode, req) => {
    let path = req.originalUrl; // get path of the request
    req.log.info("Error at ", req.originalUrl)
    let errRes = handleErrorByApi(errCode, path); //return the error object to return
    req.log.error("Error at ", path, " :: ", errRes) //logging of the error message
    return errRes; //return the error response
}


/**
 * handle the error codes by api
 * @param errCode {string} error code
 * @param path: original url of the api
 */
const handleErrorByApi = (errCode, path) => {
    const pathArray = path.split('/')
    const api = pathArray[1].split('?')[0]; // to retrieve the value of api if params are also passed

    //the response to be returned on complication of function
    const response = {
        code: errCode,
        reason: "An Application Error has occurred"
    }

    //handle the cases based on api
    switch (api) {
        default:
            response.reason = "Internal error";
    }
    return response; //return the error response
}
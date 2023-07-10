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
        case 'validateQuotePartnerPg':
            handleValidateQuotePartnerPg(errCode, response);
            break;
        case 'executeOrderPartnerPg':
            handleExecuteOrderPartnerPg(errCode, response);
            break;
        case 'getPortfolio':
            handleGetPortfolio(errCode, response);
            break;
        case 'transfer':
            handleDirectTransfer(errCode, response);
            break;
        case 'validateOrderAndExecute':
            handleValidateOrderAndExecute(errCode, response);
            break;
        case 'buyAndTransferPartnerPg':
            handleBuyAndTransferPartnerPg(errCode, response);
            break;
        case 'executeOrderWithPayIn':
            handleExecuteOrderWithPayIn(errCode, response);
            break;
        case 'executeOrderWithPayOut':
            handleExecuteOrderWithPayOut(errCode, response);
            break;
        case 'initiateTransfer':
            handleInitiateTransfer(errCode, response);
            break;
        case 'confirmTransfer':
            handleConfirmTransfer(errCode, response);
            break;
        case 'checkTradeStatus':
            handleCheckTradeStatus(errCode, response);
            break;
        case 'validateAndCreateRedeemOrder':
            handleValidateRedeemOrder(errCode, response);
            break;
        case 'getOrderHistory':
            handleGetOrderHistory(errCode, response);
            break;
        case 'executeRedeemOrder':
            handleExecuteRedeemOrder(errCode, response);
            break;
        case 'checkRetrieveIfscDetails':
            handleCheckRetrieveIFSCDetails(errCode, response);
            break;
        case 'addUpdateUserPayoutAccount':
            handleAddUpdateUserPayoutAccount(errCode, response);
            break;
        case 'getUserPayoutAccounts':
            handleGetUserPayoutAccounts(errCode, response);
            break;
        case 'deleteUserPayoutAccount':
            handleDeleteUserPayoutAccount(errCode, response);
            break;
        case 'validateTransfer':
            handleValidateTransfer(errCode, response);
            break;
        case 'getCouponDetails':
            handleGetCouponDetails(errCode, response);
            break;
        case 'getOrderDetails':
            handleGetOrderDetails(errCode, response);
            break;
        case'addToCart':
            handleAddToCart(errCode, response);
            break;
        case 'getCartItems':
            handleGetCartItems(errCode, response);
            break;
        case 'removeFromCart':
            handleRemoveFromCart(errCode, response);
            break;
        case 'getProductFilters':
            handleGetProductFilters(errCode, response);
            break;
        case 'addToWishList':
            handleAddToWishList(errCode, response);
            break;
        case 'getRedeemHistory':
            handleGetRedeemHistory(errCode, response);
            break;
        case 'getNumberOfCartItems':
            getNumberOfCartItems(errCode, response);
            break;
        case 'cancelOrder':
            handleCancelOrder(errCode, response);
            break;
        case 'initiateRefundAndTransferBalance':
            handleInitiateRefundAndTransferBalance(errCode, response);
            break;
        case 'checkValidateVpaId':
            handleCheckValidateVpaId(errCode, response);
            break;
        case 'createSip':
            handleCreateSip(errCode, response);
            break;
        case 'confirmSip':
            handleConfirmSip(errCode, response);
            break;
        case 'getUserAllSIPs':
            handleGetUserAllSIPs(errCode, response);
            break;
        case 'pushNotification':
            handlePushNotification(errCode, response);
        default:
            response.reason = "Internal error";
    }
    return response; //return the error response
}


/**
 * function to handle create sip error codes
 * @param errCode
 * @param response
 */
const handleGetUserAllSIPs = (errCode, response) => {
    switch (errCode) {
        case '06':
            response.reason = "CustomerRefNo is Invalid";
            break;
        case '09':
            response.reason = "Error while delete sip";
            break;
    }
}


/**
 * function to handle push Notification error codes
 * @param errCode
 * @param response
 */
const handlePushNotification = (errCode, response) => {
    switch (errCode) {
        case '33':
            response.reason = "Unable to send Push Notification";
            break;
        case '17':
            response.reason = "Token Id Invalid";
            break;
    }
}

/**
 * function to handle create sip error codes
 * @param errCode
 * @param response
 */
const handleConfirmSip = (errCode, response) => {
    switch (errCode) {
        case '40':
            response.reason = "Error while updating database record of sip";
            break;
    }
}


/**
 * function to handle confirm sip error codes
 * @param errCode
 * @param response
 */
const handleCreateSip = (errCode, response) => {
    switch (errCode) {
        case '06':
            response.reason = "CustomerRefNo is Invalid";
            break;
        case '09':
            response.reason = "Error while creating razorpay record";
            break;
        case '40':
            response.reason = "Error while creating database record of sip";
            break;
        case '69':
            response.reason = "Sip Frequency not found";
            break;
    }
}


/**
 * function to handle checkValidateVpaId error codes
 * @param errCode
 * @param response
 */
const handleCheckValidateVpaId = (errCode, response) => {
    if (errCode === '60') response.reason = "Invalid vpa id";
}


/**
 * function to handle initiateRefundAndTransferBalance api error codes
 * @param errCode
 * @param response
 */
const handleInitiateRefundAndTransferBalance = (errCode, response) => {
    switch (errCode) {
        case '69':
            response.reason = "Invalid order id"
            break;
        case '28':
            response.reason = "Order already cancelled"
    }
}

/**
 * function to handle execute redeem order apis error codes
 * @param errCode
 * @param response
 */
const handleExecuteRedeemOrder = (errCode, response) => {
    switch (errCode) {
        case '86':
            response.reason = "payment order details provided are incorrect or already processed";
            break
        case '23':
            response.reason = "QuoteID or orderID invalid";
            break
        case "53":
            response.reason = "Transaction date invalid";
            break;
        case '39':
            response.reason = "Order is already confirmed.";
            break;
        case '101':
            response.reason = "OrderType is invalid"
    }
}


/**
 * function to handle the error codes for check trade status api
 * @param errCode
 * @param response
 */
const handleCheckTradeStatus = (errCode, response) => {
    if (errCode === "56")
        response.reason = "Order Not Found";
}


/**
 * function to handle the error codes for confirm transfer api
 * @param errCode
 * @param response
 */
const handleConfirmTransfer = (errCode, response) => {
    switch (errCode) {
        case "53":
            response.reason = "Transaction date invalid";
            break;
        case '500':
            response.reason = "Duplicate request found. Request will not be processed";
            break;
        case '06':
            response.reason = "CustomerRefNo is Invalid";
            break;
        case '39':
            response.reason = "Customer is not Active";
            break;
        case '58':
            response.reason = "KYC should be validated.";
            break;
        case '54':
            response.reason = "order Id is invalid.";
            break;
        case "27":
            response.reason = "Already confirmed";
            break;
    }
}


const handleInitiateTransfer = (errCode, response) => {
    switch (errCode) {
        case "53":
            response.reason = "Transaction date invalid";
            break;
        case '500':
            response.reason = "Duplicate request found. Request will not be processed";
            break;
        case '06':
            response.reason = "CustomerRefNo is Invalid";
            break;
        case '34':
            response.reason = "Quantity invalid";
            break;
        case '48':
            response.reason = "Amount is less than Minimum Transaction Amount";
            break;
        case "40":
            response.reason = "Insufficient balance at source";
            break;
        case '57':
            response.reason = "Quantity can not be empty";
            break;
        case '64':
            response.reason = "Quantity should be more than zero.";
            break;
        case '67':
            response.reason = "Destination customer ref no doesnt exist."
    }
}


/**
 * handle execute order with pay in error codes
 * @param errCode
 * @param response
 */
const handleExecuteOrderWithPayOut = (errCode, response) => {
    switch (errCode) {
        case "53":
            response.reason = "Transaction date invalid";
            break;
        case "71":
            response.reason = "Quote is currently under execution";
            break;
        case '500':
            response.reason = "Duplicate request found. Request will not be processed";
            break;
        case '23':
            response.reason = "QuoteID Invalid";
            break;
        case '43':
            response.reason = "Error in processing request, payload is wrong";
            break;
        case '86':
            response.reason = "payment order details provided are incorrect or already processed";
            break;
        case "68":
            response.reason = "Mismatch Present for quote. Parameter {0}";
            break;
        case '69':
            response.reason = "Deal Rejected while conversion during Tax Calculation";
            break;
        case '06':
            response.reason = "CustomerRefNo is Invalid";
            break;
        case '34':
            response.reason = "Quantity invalid";
            break;
        case '40':
            response.reason = "Insufficient Balance";
            break;
        case '92':
            response.reason = "Price anomaly detected. Transaction cancelled.";
            break;
        case '73':
            response.reason = "Quote type not valid for this transaction";
            break;
    }
}


/**
 * handle execute order with pay in error codes
 * @param errCode
 * @param response
 */
const handleExecuteOrderWithPayIn = (errCode, response) => {
    switch (errCode) {
        case "53":
            response.reason = "Transaction date invalid";
            break;
        case "71":
            response.reason = "Quote is currently under execution";
            break;
        case '500':
            response.reason = "Duplicate request found. Request will not be processed";
            break;
        case '23':
            response.reason = "QuoteID Invalid";
            break;
        case '43':
            response.reason = "Error in processing request, payload is wrong";
            break;
        case '86':
            response.reason = "payment order details provided are incorrect or already processed";
            break;
        case '51':
            response.reason = "Billing addresses is Missing";
            break;
        case '89':
            response.reason = "Error processing auto-refund";
            break;
        case '109':
            response.reason = "Cannot update user balance";
            break;
        case '101':
            response.reason = "OrderType is invalid";
    }
}


/**
 * handles the buy and transfer api error codes
 * @param errCode
 * @param response
 */
const handleBuyAndTransferPartnerPg = (errCode, response) => {
    switch (errCode) {
        case "04":
            response.reason = "Source or Destination Customer not Found";
            break;
        case "40":
            response.reason = "Insufficient balance at source";
            break;
        case '53':
            response.reason = "Transaction Date Invalid";
            break;
        case '57':
            response.reason = "Quantity can not be empty";
            break;
        case '64':
            response.reason = "Quantity should be more than zero.";
            break;
        case "68":
            response.reason = "Mismatch Present for quote. Parameter {0}";
            break;
        case '69':
            response.reason = "Deal Rejected while conversion during Tax Calculation";
            break;
        case '23':
            response.reason = "QuoteID Invalid";
            break;
        case '06':
            response.reason = "CustomerRefNo is Invalid";
            break;
        case '34':
            response.reason = "Quantity invalid";
            break;
        case '39':
            response.reason = "Customer is not Active";
            break;
        case '48':
            response.reason = "Amount is less than Minimum Transaction Amount";
            break;
        case '71':
            response.reason = "Quote is Currently Under Execution";
            break;
        case '58':
            response.reason = "KYC should be validated.";
            break;
        case '500':
            response.reason = "Duplicate request found. Request will not be processed";
            break;
    }
}


/**
 * handle validate quote api for partner
 * @param errCode {string}
 * @param response
 */
const handleDirectTransfer = (errCode, response) => {
    switch (errCode) {
        case "04":
            response.reason = "Source or Destination Customer not Found";
            break;
        case "40":
            response.reason = "Insufficient balance at source";
            break;
        case '53':
            response.reason = "Transaction Date Invalid";
            break;
        case '57':
            response.reason = "Quantity can not be empty";
            break;
        case '64':
            response.reason = "Quantity should be more than zero.";
            break;
        case '58':
            response.reason = "KYC should be validated.";
            break;
        case '59':
            response.reason = "Currency pair invalid.";
            break;
    }
}


/**
 * handle validate quote api for partner
 * @param errCode
 * @param response
 */
const handleGetPortfolio = (errCode, response) => {
    if (errCode === "39")
        response.reason = "Unable to find customer account";
}


/**
 * handle execute order api for partner
 * @param errCode {string}
 * @param response
 */
const handleExecuteOrderPartnerPg = (errCode, response) => {
    switch (errCode) {
        case "68":
            response.reason = "Mismatch Present for quote. Parameter {0} ";
            break;
        case '69':
            response.reason = "Deal Rejected while conversion during Tax Calculation";
            break;
        case '23':
            response.reason = "QuoteID Invalid";
            break;
        case '06':
            response.reason = "CustomerRefNo is Invalid";
            break;
        case '34':
            response.reason = "Insufficient Balance";
            break;
        case '39':
            response.reason = "Customer is not Active";
            break;
        case '48':
            response.reason = "Amount is less than Minimum Transaction Amount";
            break;
        case '53':
            response.reason = "Transaction Date Invalid";
            break;
        case '71':
            response.reason = "Quote is Currently Under Execution";
            break;
    }
}


/**
 * handle validate quote api for partner
 * @param errCode {string}
 * @param response
 */
const handleValidateQuotePartnerPg = (errCode, response) => {
    switch (errCode) {
        case "68":
            response.reason = "Mismatch Present for quote. Parameter {0} ";
            break;
        case '69':
            response.reason = "Deal Rejected while conversion during Tax Calculation";
            break;
        case '23':
            response.reason = "QuoteID invalid";
            break;
        case '53':
            response.reason = "Transaction Date Invalid";
            break;
    }
}

/**
 *
 * @param errCode
 * @param response
 */
const handleValidateOrderAndExecute = (errCode, response) => {
    switch (errCode) {
        case "23":
            response.reason = "QuoteID invalid";
            break;
        case '43':
            response.reason = "Error in processing request, payload is wrong";
            break;
        case '53':
            response.reason = "Transaction Date Invalid";
            break;
        case '69':
            response.reason = "Deal Rejected while conversion during Tax Calculation";
            break;
        case '500':
            response.reason = "An Application Error has occurred";
            break;
        case '51':
            response.reason = "Billing addresses is Missing";
            break;
        case '71':
            response.reason = "Transaction order id is invalid";
            break;
        case '06':
            response.reason = "CustomerRefNo is invalid";
            break;
        case '92':
            response.reason = "Price anomaly detected. Transaction cancelled.";
            break;
        case '73':
            response.reason = "Quote type not valid for this transaction";
            break;
    }
}


/**
 *
 * @param errCode
 * @param response
 */
const handleValidateRedeemOrder = (errCode, response) => {
    switch (errCode) {
        case "03":
            response.reason = "Session ID Missing";
            break;
        case '33':
            response.reason = "Invalid Payload";
            break;
        case '40':
            response.reason = "Insufficient Balance";
            break;
        case '43':
            response.reason = "Error in processing request, payload is wrong";
            break;
        case '06':
            response.reason = "CustomerRef NO is invalid";
            break;
        case '65':
            response.reason = "Pincode not deliverable";
            break;
        case '49':
            response.reason = "Invalid Product";
            break;
        case '50':
            response.reason = "Invalid Quantity or Making charge for Product.";
            break;
        case '99':
            response.reason = "Error in creating order at liferay";
            break;
        case '500':
            response.reason = "An Application Error has occurred";
            break;
    }
}

const handleGetOrderHistory = (errCode, response) => {
    switch (errCode) {
        case "06":
            response.reason = "CustomerRef NO is invalid";
            break;
        case '08':
            response.reason = "Start or End Date is Invalid"
    }
}

const handleCheckRetrieveIFSCDetails = (errCode, response) => {
    if (errCode === "06")
        response.reason = "IFSC code is invalid";
}

const handleAddUpdateUserPayoutAccount = (errCode, response) => {
    switch (errCode) {
        case '98':
            response.reason = "Payout details with this account number/VPA ID for this user already exists"
            break;
        case '05':
            response.reason = "Account Number or IFSC is missing"
            break;
        case '10':
            response.reason = "VPA id is missing"
            break;
        case '06':
            response.reason = "CustomerRefNo is invalid"
            break;
    }
}

const handleGetUserPayoutAccounts = (errCode, response) => {
    if (errCode === '06')
        response.reason = "CustomerRefNo is invalid";
}

const handleDeleteUserPayoutAccount = (errCode, response) => {
    if (errCode === '100')
        response.reason = "Payout account id invalid";
}

const handleValidateTransfer = (errCode, response) => {
    switch (errCode) {
        case '58':
            response.reason = "KYC should be validated.";
            break;
        case '39':
            response.reason = "Unable to find customer.";
            break;
    }
}

const handleGetCouponDetails = (errCode, response) => {
    if (errCode === '107')
        response.reason = "Coupon not found";
}

const handleGetOrderDetails = (errCode, response) => {
    switch (errCode) {
        case '108':
            response.reason = "Transaction id invalid"
            break;
        case '190':
            response.reason = "Testing error handler"//todo remove this code when api is complete
            break;
        case '06':
            response.reason = "CustomerRefNo is invalid"
            break;
    }
}

const handleAddToCart = (errCode, response) => {
    switch (errCode) {
        case '34':
            response.reason = "Quantity Invalid"
            break;
        case '06':
            response.reason = "CustomerRefNo is invalid"
            break;
        case '49':
            response.reason = "Invalid Product"
            break;
    }
}

const handleGetCartItems = (errCode, response) => {
    if (errCode === '06')
        response.reason = "CustomerRefNo is invalid";
}

const handleRemoveFromCart = (errCode, response) => {
    if (errCode === '107')
        response.reason = "id is invalid";
}

const handleGetProductFilters = (errCode, response) => {
    if (errCode === '87')
        response.reason = "Filters not available in redis";
}

const handleAddToWishList = (errCode, response) => {
    switch (errCode) {
        case '34':
            response.reason = "Quantity Invalid"
            break;
        case '06':
            response.reason = "CustomerRefNo is invalid"
            break;
        case '49':
            response.reason = "Invalid Product"
            break;
        case '58':
            response.reason = "Product already exists";
            break;
    }
}

const handleGetRedeemHistory = (errCode, response) => {
    if (errCode === '83')
        response.reason = "Couldn't fetch liferay orders";
}

const getNumberOfCartItems = (errCode, response) => {
    if (errCode === '06')
        response.reason = "CustomerRefNo is invalid";
}

const handleCancelOrder = (errCode, response) => {
    switch (errCode) {
        case '48':
            response.reason = "Order cannot be cancelled"
            break;
        case '99':
            response.reason = "Error while updating physical order"
            break;
    }
}

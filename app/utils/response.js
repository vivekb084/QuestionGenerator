const sendErrorMessage = (res, message) => {
    res.json({
        status: "false",
        message: message
    });
};
const sendErrorCustomMessage = (res, text, errorCode) => {
    res.json({
        message: text,
        status: errorCode,
    });
};

const sendSuccessMessage = (res, message) => {
    res.json({
        status: "true",
        message: message
    });
};


const sendsuccessData = (res, message, data) => {
    res.json({
        status: "true",
        message: message,
        data: data
    });
};
const sendErrorData = (res, data) => {
    res.json({
        status: "false",
        errorData: data
    });
};

const sendSucessCustomMessage = (res, text, data,code) => {
    res.json({
        status: code,
        message: text,
        data:data
    });
};

module.exports = {
    sendErrorMessage,
    sendsuccessData,
    sendSuccessMessage,
    sendErrorCustomMessage,
    sendSucessCustomMessage,
    sendErrorData

}

exports.errorHandler = (message, statusCode, data) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.data = data || {};
    return err;
};

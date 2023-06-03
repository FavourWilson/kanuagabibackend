module.exports = class appError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
  }
};

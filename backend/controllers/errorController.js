const AppError = require("../utils/appError");

// Handle duplicate field in DB error
const handleDuplicateDB = (err) => {
  const message = `${Object.keys(err.keyValue).map(
    (key) => `${key} ${err.keyValue[key]}`
  )} is already in use, please use another one!`;

  return new AppError(message, 400);
};

// Handle DB validation error
const handleValidationError = (err) => {
  const message = Object.keys(err.errors)
    .map((key) => err.errors[key].message)
    .join(", ");
  return new AppError(message, 400);
};

// Handle JWT expires error
const handleJWTExpireError = () =>
  new AppError("Token has expired please login again!");

// Send error while in developement function
const sendErrorDev = (err, req, res, next) => {
  // Send complete detail of an error while in dev
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack,
  });
};

// Send error while in production
const sendErrorProd = (err, req, res, next) => {
  // If error is operational send the detail message
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // If error is not operatinal hide all the detail and send the generic message
    res.status(500).json({
      status: "error",
      message: "Internal server error: Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  // If status is not set Simply set it to error
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  // If in development send complete detail of an error
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res, next);
  }

  // If in production hide complete detail of an error and send the generic message
  if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message };

    if (err.code === 11000) error = handleDuplicateDB(err);
    if (err.name === "ValidationError") error = handleValidationError(err);
    if (err.name === "TokenExpiredError") error = handleJWTExpireError();

    sendErrorProd(error, req, res, next);
  }
};

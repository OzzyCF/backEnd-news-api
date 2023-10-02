exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err); // If it's not a custom error, pass it down the middleware chain
  }
};
// PostgreSQL Errors
exports.handlePsqlErrors = (err, req, res, next) => {
  console.log("PostgreSQL Error Code:", err.code);
  const psqlBadRequestCodes = ["22P02", "23502", "42703"];

  if (psqlBadRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Invalid input" });
  } else {
    next(err);
  }
};

// Generic Server Errors Handler
exports.handleServerErrors = (err, req, res, next) => {
  console.log(err); // Log the error for debugging
  res.status(500).send({ msg: "Internal Server Error" });
};

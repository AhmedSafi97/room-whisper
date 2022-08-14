const createError = (statusCode, error, message) => ({
  statusCode,
  error,
  message,
});

module.exports = createError;
